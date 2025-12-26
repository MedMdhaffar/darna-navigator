# cities/serializers.py
from rest_framework import serializers
from .models import City, Place

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ("id", "name", "description")
class CitySerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = "__all__"
