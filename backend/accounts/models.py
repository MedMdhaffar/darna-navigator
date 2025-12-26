from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    favorite_plates = models.ManyToManyField(
        'gastronomie.Plate', related_name='fans', blank=True
    )
    favorite_destinations = models.ManyToManyField(
        'cities.City', related_name='followers', blank=True
    )
    attending_events = models.ManyToManyField(
        'events.Event', related_name='attendees', blank=True
    )
