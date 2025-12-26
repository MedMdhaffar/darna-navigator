# gastronomie/serializers.py
from rest_framework import serializers
from .models import Plate


class PlateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Plate
        fields = "__all__"
