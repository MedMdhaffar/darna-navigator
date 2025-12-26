# gastronomie/urls.py
from django.urls import path
from .views import PlatesByDestinationView

urlpatterns = [
    path(
        'destinations/<int:destination_id>/plates/',
        PlatesByDestinationView.as_view()
    ),
]
