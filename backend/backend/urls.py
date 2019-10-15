from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from moviescore import views


router = routers.DefaultRouter()
router.register('movieScore', views.MovieScoreView, 'movieScore')


class HomeTemplateView(TemplateView):
    template_name = 'index.html'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('movie-api/', include(router.urls)),
    path('api/', include('users.urls')),
    path('', HomeTemplateView.as_view(), name='home'),
]
