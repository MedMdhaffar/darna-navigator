# cities/admin.py
from django.contrib import admin
from .models import City, Place

class PlaceInline(admin.TabularInline):
    model = Place
    extra = 1

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    inlines = [PlaceInline]
    list_display = ("name", "climate")

admin.site.register(Place)
