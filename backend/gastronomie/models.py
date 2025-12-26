# gastronomie/models.py
from django.db import models

class Destination(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name


class Plate(models.Model):
    destination = models.ForeignKey(
        Destination,
        related_name='plates',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    definition = models.TextField()
    

    def __str__(self):
        return self.name
