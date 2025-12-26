# cities/views.py
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import City
from .serializers import CitySerializer

class CityListView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class CityDetailView(RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
