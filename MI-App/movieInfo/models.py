from django.db import models
from django.contrib.auth.models import User

class MovieInfo(models.Model):

    id = models.AutoField(primary_key=True)
    movieCd = models.CharField(max_length=8)
    movieNm = models.CharField(max_length=128)
    movieNmEn = models.CharField(max_length=128, blank=True, null=True, default='')
    prdtYear = models.CharField(max_length=8, blank=True, null=True, default='')
    openDt = models.CharField(max_length=8, blank=True, null=True, default='')
    prdtStatNm = models.CharField(max_length=128, blank=True, null=True, default='')
    repGenre = models.CharField(max_length=128, blank=True, null=True, default='')
    genre = models.CharField(max_length=128, blank=True, null=True, default='')
    repNation = models.CharField(max_length=128, blank=True, null=True, default='')
    nations = models.CharField(max_length=128, blank=True, null=True, default='')
    typeNm = models.CharField(max_length=128, blank=True, null=True, default='')
    showTm = models.CharField(max_length=8, blank=True, null=True, default='')
    directors = models.CharField(max_length=128, blank=True, null=True, default='')
    actors = models.TextField(blank=True, null=True, default='')
    actors_en = models.TextField(blank=True, null=True, default='')
    cast = models.TextField(blank=True, null=True, default='')
    cast_en = models.TextField(blank=True, null=True, default='')
    companyCd = models.TextField(blank=True, null=True, default='')
    companyNm = models.TextField(blank=True, null=True, default='')
    companyNmEn = models.TextField(blank=True, null=True, default='')
    companyPartNm = models.TextField(blank=True, null=True, default='')
    watchGradeNm = models.TextField(blank=True, null=True, default='')
    poster = models.TextField(blank = True, null=True, default='')
    userRating = models.CharField(max_length=4, blank=True, null=True, default='')    

    # name_id = models.ForeignKey(User, on_delete = models.CASCADE)
    # likes = models.ManyToManyField(User, related_name="likes", blank=True)

    # @property
    # def total_likes(self):
    #     return self.likes.count()

    # owner = models.ForeignKey(User, related_name="moviescore",
    #                           on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.movieNm