from django.db import models
from django.contrib.auth.models import User


class MovieScore(models.Model):

    id = models.AutoField(primary_key=True)
    movieCd = models.CharField(max_length=8)
    movieNm = models.CharField(max_length=128)
    impression = models.PositiveSmallIntegerField()        # 감동
    fear = models.PositiveSmallIntegerField()              # 공포
    anger = models.PositiveSmallIntegerField()             # 분노
    sadness = models.PositiveSmallIntegerField()           # 슬픔
    fun = models.PositiveSmallIntegerField()               # 유쾌
    boredom = models.PositiveSmallIntegerField()           # 지루함
    positive = models.PositiveSmallIntegerField()          # 긍정
    negative = models.PositiveSmallIntegerField()          # 부정

    # owner = models.ForeignKey(User, related_name="moviescore",
    #                           on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.movieNm
