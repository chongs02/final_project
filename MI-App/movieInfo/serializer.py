from rest_framework import serializers
from .models import MovieInfo

# from .naverMovie import get_posterUrl


class MovieInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieInfo
        fields = '__all__'
