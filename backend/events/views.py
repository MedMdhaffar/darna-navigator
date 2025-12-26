# events/views.py
from rest_framework.generics import ListAPIView
from django.utils.timezone import now
from .models import Event
from .serializers import EventSerializer


class EventListView(ListAPIView):
    """All events"""
    queryset = Event.objects.all().order_by("date")
    serializer_class = EventSerializer





class UpcomingEventsView(ListAPIView):
    """Upcoming events only"""
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(date__gte=now().date()).order_by("date")
