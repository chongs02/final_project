from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, UserAPI, ProfileViewSet, CollaborativeWatched,CollaborativeHate,CollaborativeLike,UserMovieEmotion,CollaborativeEmotion
from django.contrib.auth import views as auth_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('profile', ProfileViewSet, 'profile')
router.register('watched', CollaborativeWatched, 'watched')
router.register('hate', CollaborativeHate, 'hate')
router.register('like', CollaborativeLike, 'like')
router.register('userMovieEmotion', UserMovieEmotion, 'userMovieEmotion')
router.register('CollaborativeEmotion', CollaborativeEmotion, 'CollaborativeEmotion')



urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]
