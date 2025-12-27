# events/views.py
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from .models import Event
from .serializers import EventSerializer


class EventListView(ListAPIView):
    """All events"""
    queryset = Event.objects.all().order_by("date")
    serializer_class = EventSerializer





class UpcomingEventsView(ListAPIView):
    """Upcoming events only"""
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(date__gte=now().date()).order_by("date")


@api_view(['GET'])
def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    serializer = EventSerializer(event)
    return Response(serializer.data)
