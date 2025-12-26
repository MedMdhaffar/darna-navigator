# gastronomie/models.py
from django.db import models


class Plate(models.Model):
    name = models.CharField(max_length=100)
    definition = models.TextField()
    image = models.ImageField(upload_to="gastronomie/", null=True, blank=True)
    restaurants = models.TextField(blank=True)

    def __str__(self):
        return self.name
