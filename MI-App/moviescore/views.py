from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import MovieScoreSerializer
from .models import MovieScore
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView

class MovieScoreView(ListCreateAPIView):
    search_fields = ['movieCd']
    filter_backends = (SearchFilter,)
    queryset = MovieScore.objects.all()
    serializer_class = MovieScoreSerializer

    # def get_queryset(self):
    #     return self.request.user.moviescore.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

