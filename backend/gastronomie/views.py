# gastronomie/views.py
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Plate
from .serializers import PlateSerializer


class PlateListView(ListAPIView):
    queryset = Plate.objects.all()
    serializer_class = PlateSerializer


@api_view(['GET'])
def plate_detail(request, pk):
    plate = get_object_or_404(Plate, pk=pk)
    serializer = PlateSerializer(plate)
    return Response(serializer.data)
