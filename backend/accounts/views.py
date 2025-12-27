from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from .serializers import SignupSerializer, MyTokenObtainPairSerializer, UserSerializer
from cities.models import City
from gastronomie.models import Plate
from events.models import Event
from rest_framework.generics import ListAPIView
import secrets



@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False
        user.save()

        # Secure 6-digit code
        code = str(secrets.randbelow(900000) + 100000)
        cache.set(f"verify:{user.username}", code, timeout=600)

        send_mail(
            subject='Verify your email',
            message=f'Your verification code is: {code}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
        )

        return Response({"message": "Verification code sent to email."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_email(request):
    username = request.data.get("username")
    code = request.data.get("code")

    if not username or not code:
        return Response({"error": "Username and code are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_user_model().objects.get(username=username)
        real_code = cache.get(f"verify:{username}")

        if real_code is None:
            return Response({"error": "Verification code expired."}, status=status.HTTP_400_BAD_REQUEST)
        if real_code != code:
            return Response({"error": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        cache.delete(f"verify:{username}")

        return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)

    except get_user_model().DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def signin(request):
    email = request.data.get('email').lower()
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_obj = get_user_model().objects.get(email=email)
    except get_user_model().DoesNotExist:
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=user_obj.username, password=password)
    if not user:
        
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        return Response({"error": "Please verify your email before signing in."}, status=status.HTTP_403_FORBIDDEN)

    serializer = MyTokenObtainPairSerializer(data={
        "username": user.username,
        "password": password
    })
    serializer.is_valid(raise_exception=True)

    return Response({
        "message": "Login successful",
        "tokens": serializer.validated_data,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_preferences(request):
    """Replace the user's favorites/attendance lists with provided ids."""
    username = request.data.get('username')
    if not username:
        return Response({"error": "username is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_user_model().objects.get(username=username)
    except get_user_model().DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    plate_ids = request.data.get('plate_ids')
    destination_ids = request.data.get('destination_ids')
    event_ids = request.data.get('event_ids')

    if plate_ids is None and destination_ids is None and event_ids is None:
        return Response({"error": "Provide at least one of plate_ids, destination_ids, or event_ids."}, status=status.HTTP_400_BAD_REQUEST)

    if plate_ids is not None:
        plates = Plate.objects.filter(id__in=plate_ids)
        user.favorite_plates.set(plates)

    if destination_ids is not None:
        destinations = City.objects.filter(id__in=destination_ids)
        user.favorite_destinations.set(destinations)

    if event_ids is not None:
        events = Event.objects.filter(id__in=event_ids)
        user.attending_events.set(events)

    user.save()

    return Response({
        "favorite_plates": list(user.favorite_plates.values_list('id', flat=True)),
        "favorite_destinations": list(user.favorite_destinations.values_list('id', flat=True)),
        "attending_events": list(user.attending_events.values_list('id', flat=True)),
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_favorite(request):
    """Add or remove a favorite plate, city, or event for the user."""
    username = request.data.get('username')
    item_type = request.data.get('type')  # 'plate', 'city', 'event'
    item_id = request.data.get('id')
    action = request.data.get('action')  # 'add' or 'remove'

    if not all([username, item_type, item_id, action]):
        return Response({"error": "username, type, id, and action are required."}, status=status.HTTP_400_BAD_REQUEST)

    if action not in ['add', 'remove']:
        return Response({"error": "action must be 'add' or 'remove'."}, status=status.HTTP_400_BAD_REQUEST)

    if item_type not in ['plate', 'city', 'event']:
        return Response({"error": "type must be 'plate', 'city', or 'event'."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_user_model().objects.get(username=username)
    except get_user_model().DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
        if item_type == 'plate':
            item = Plate.objects.get(id=item_id)
            if action == 'add':
                user.favorite_plates.add(item)
            else:
                user.favorite_plates.remove(item)
        elif item_type == 'city':
            item = City.objects.get(id=item_id)
            if action == 'add':
                user.favorite_destinations.add(item)
            else:
                user.favorite_destinations.remove(item)
        elif item_type == 'event':
            item = Event.objects.get(id=item_id)
            if action == 'add':
                user.attending_events.add(item)
            else:
                user.attending_events.remove(item)
    except (Plate.DoesNotExist, City.DoesNotExist, Event.DoesNotExist):
        return Response({"error": f"{item_type} with id {item_id} not found."}, status=status.HTTP_404_NOT_FOUND)

    user.save()

    return Response({
        "message": f"{item_type} {action}ed successfully.",
        "favorite_plates": list(user.favorite_plates.values_list('id', flat=True)),
        "favorite_destinations": list(user.favorite_destinations.values_list('id', flat=True)),
        "attending_events": list(user.attending_events.values_list('id', flat=True)),
    }, status=status.HTTP_200_OK)


class userListView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
  
