from rest_framework import viewsets, permissions
from .serializer import MovieInfoSerializer
from .models import MovieInfo
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView


# from .naverMovie import get_posterUrl


# class NaverMoviePosterURL(ListCreateAPIView):
#     def get_queryset(self):
#         queryset = get_posterUrl()

# class MovieInfoSearchView(ListCreateAPIView):
#     search_fields = ['movieNm', 'movieNmEn', 'movieCd']
#     filter_backends = (SearchFilter,)
#     queryset = MovieInfo.objects.all()
#     serializer_class = MovieInfoSerializer


class MovieInfoView(ListCreateAPIView):
    search_fields = ['movieNm', 'movieNmEn', 'movieCd']
    filter_backends = (SearchFilter,)
    queryset = MovieInfo.objects.all()
    serializer_class = MovieInfoSerializer
