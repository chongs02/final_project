from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, UserAPI, ProfileViewSet
from django.contrib.auth import views as auth_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', ProfileViewSet, 'profile')


urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('profile/', include(router.urls))
]
