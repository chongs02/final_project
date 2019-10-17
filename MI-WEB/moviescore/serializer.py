from rest_framework import serializers
from .models import MovieScore


class MovieScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieScore
        fields = '__all__'
