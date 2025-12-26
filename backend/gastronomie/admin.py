# gastronomie/admin.py
from django.contrib import admin
from .models import Destination, Plate

@admin.register(Plate)
class PlateAdmin(admin.ModelAdmin):
    list_display = ('name', 'destination')
    list_filter = ('destination',)
    search_fields = ('name',)

admin.site.register(Destination)
