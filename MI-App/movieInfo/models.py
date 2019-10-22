from django.db import models

class MovieInfo(models.Model):

    id = models.AutoField(primary_key=True)
    movieCd = models.CharField(max_length=8)
    movieNm = models.CharField(max_length=128)
    movieNmEn = models.CharField(max_length=128)
    prdtYear = models.PositiveSmallIntegerField()      
    openDt = models.PositiveSmallIntegerField()      
    prdtStatNm = models.CharField(max_length=128)
    repGenre = models.CharField(max_length=128)
    genre = models.CharField(max_length=128)
    repNation = models.CharField(max_length=128)
    nations = models.CharField(max_length=128)
    typeNm = models.CharField(max_length=128)
    showTm = models.PositiveSmallIntegerField()
    directors = models.CharField(max_length=128)
    actors = models.TextField()
    actors_en = models.TextField()
    cast = models.TextField()
    cast_en = models.TextField()
    companyCd = models.TextField()
    companyNm = models.TextField()
    companyNmEn = models.TextField()
    companyPartNm = models.TextField()
    watchGradeNm = models.TextField()
    posterUrl = models.TextField(blank = True)

    # owner = models.ForeignKey(User, related_name="moviescore",
    #                           on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.movieNm