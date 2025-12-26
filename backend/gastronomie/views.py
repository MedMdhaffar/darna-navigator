# gastronomie/views.py
from rest_framework.generics import ListAPIView
from .models import Plate
from .serializers import PlateSerializer


class PlateListView(ListAPIView):
    queryset = Plate.objects.all()
    serializer_class = PlateSerializer
