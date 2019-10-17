from rest_framework import serializers
from .models import MovieInfo


class MovieInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieInfo
        fields = '__all__'
