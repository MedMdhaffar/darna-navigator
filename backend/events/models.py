# events/models.py
from django.db import models
from cities.models import City


class Event(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateField()
    short_description = models.CharField(max_length=255)
    location = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="events"
    )

    def __str__(self):
        return f"{self.title} ({self.location.name})"
