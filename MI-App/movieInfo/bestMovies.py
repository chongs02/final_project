from math import sqrt
import os
import pandas as pd
import random

from .models import MovieInfo

def bestMovies(request):
    movie_list = pd.DataFrame(list(MovieInfo.objects.all().values()))
    
    movie_list['userRating'] = movie_list['userRating'].astype(float)
    movie_list['prdtYear'] = movie_list['prdtYear'].astype(float)

    over_90 =  movie_list['userRating'] >=8.9
    under_95 =  movie_list['userRating'] < 9.2
    
    best_movie = movie_list[over_90]
    best_movie = best_movie[under_95]
    in_5years =  best_movie['prdtYear'] >= 2018
    best_movie = best_movie[in_5years]
    best_movie = best_movie.query("repNation=='한국' or repNation=='미국'")
    best_movie = best_movie.sample(n=20)
    best_movie =best_movie.to_dict('records')

    # print(best_movie)

    
    # li = []
    return best_movie
    