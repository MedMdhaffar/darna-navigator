# events/serializers.py
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(
        source="location.name",
        read_only=True
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "date",
            "short_description",
            "location",
            "location_name",
        ]
