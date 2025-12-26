# events/admin.py
from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "location")
    list_filter = ("location", "date")
    search_fields = ("title",)
