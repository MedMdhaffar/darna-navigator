# gastronomie/urls.py
from django.urls import path
from .views import PlateListView, plate_detail

urlpatterns = [
    path("plates/", PlateListView.as_view(), name="plates-list"),
    path("plates/<int:pk>/", plate_detail, name="plate-detail"),
]
