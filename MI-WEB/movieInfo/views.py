from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import MovieInfoSerializer
from .models import MovieInfo


class MovieInfoView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = MovieInfoSerializer
    queryset = MovieInfo.objects.all()

    # def get_queryset(self):
    #     return self.request.user.moviescore.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
