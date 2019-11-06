from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from moviescore.views import MovieScoreView
from movieInfo.views import MovieInfoView, MovieListByScore

class HomeTemplateView(TemplateView):
    template_name = 'index.html'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('best-movies/', MovieListByScore.as_view()),
    path('movie-api/', MovieScoreView.as_view()),
    path('movieInfo/', MovieInfoView.as_view()),
    path('api/', include('users.urls')),
    path('', HomeTemplateView.as_view(), name='home'),
]
