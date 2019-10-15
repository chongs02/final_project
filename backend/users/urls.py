from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, UserAPI
from django.contrib.auth import views as auth_views


# accountAPI는 사용시까지 홀딩
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('account', AccountViewSet, 'account')


urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', auth_views.LogoutView.as_view(), name='logout')
]
