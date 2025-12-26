# gastronomie/views.py
from rest_framework.generics import ListAPIView
from .models import Plate
from .serializers import PlateSerializer

class PlatesByDestinationView(ListAPIView):
    serializer_class = PlateSerializer

    def get_queryset(self):
        destination_id = self.kwargs['destination_id']
        return Plate.objects.filter(destination_id=destination_id)
