from django.urls import path
from .views import signup, verify_email, signin, update_preferences, update_favorite, userListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),  # custom signin view
    path('verify/', verify_email, name='verify_email'),
    path('preferences/', update_preferences, name='update_preferences'),
    path('favorite/', update_favorite, name='update_favorite'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', userListView.as_view(), name='user_list'),
]