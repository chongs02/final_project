from django.db import models
from django.contrib.auth.models import User


class MovieScore(models.Model):

    id = models.AutoField(primary_key=True)
    movieCd = models.CharField(max_length=8)
    movieNm = models.CharField(max_length=128)
    impression = models.PositiveSmallIntegerField(default=0)        # 감동
    fear = models.PositiveSmallIntegerField(default=0)              # 공포
    anger = models.PositiveSmallIntegerField(default=0)             # 분노
    sadness = models.PositiveSmallIntegerField(default=0)           # 슬픔
    fun = models.PositiveSmallIntegerField(default=0)               # 유쾌
    boredom = models.PositiveSmallIntegerField(default=0)           # 지루함
    positive = models.PositiveSmallIntegerField(default=0)          # 긍정
    negative = models.PositiveSmallIntegerField(default=0)          # 부정

    def __str__(self):
        return self.movieNm
