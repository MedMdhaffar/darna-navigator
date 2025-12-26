# cities/models.py
from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="cities/")

    population = models.CharField(max_length=50, blank=True)
    area = models.CharField(max_length=50, blank=True)
    climate = models.CharField(max_length=100, blank=True)
    best_period = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


# cities/models.py
class Place(models.Model):
    city = models.ForeignKey(
        City,
        related_name="places",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.city.name})"
