# events/urls.py
from django.urls import path
from .views import (
    EventListView,
    UpcomingEventsView,
)

urlpatterns = [
    path("", EventListView.as_view(), name="events-list"),
    path("upcoming/", UpcomingEventsView.as_view(), name="events-upcoming"),
]
