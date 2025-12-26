# gastronomie/urls.py
from django.urls import path
from .views import PlateListView

urlpatterns = [
    path("plates/", PlateListView.as_view(), name="plates-list"),
]
