
from django.urls import path
from .views import CityListView, CityDetailView

# cities/urls.py
urlpatterns = [
    path("cities/", CityListView.as_view()),
    path("cities/<int:pk>/", CityDetailView.as_view()),
]