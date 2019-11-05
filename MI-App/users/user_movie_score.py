from math import sqrt
import os
import pandas as pd

from .models import Profile
from django.contrib.auth.models import User
from moviescore.models import MovieScore


def get_user_movie_emotion(request):
    user_data =pd.DataFrame(list(User.objects.all().values('id','username')))
    user_profile = pd.DataFrame(list(Profile.objects.all().values("user_id","like")))
    users = pd.merge(user_data, user_profile,left_on='id', right_on="user_id")
    users = users.drop(labels=['id','user_id'], axis=1)
    user_like_movie = users.pivot_table(values='like', index=users.index, columns='username', aggfunc='first')
    user_like_movie = user_like_movie[request.user.get_username()]
    user_like_movie = user_like_movie.dropna()
    user_like_movie = user_like_movie.tolist()
    user_like_movie = set(user_like_movie)
    movie_score = pd.DataFrame(list(MovieScore.objects.all().values()))

    emotion_list = []

    for movie_code in user_like_movie:
        if movie_code in list(movie_score.movieCd):
            emotion_list.append(movie_score.loc[movie_score['movieCd'] == movie_code])

    emotion_df = pd.concat(emotion_list)
    emotion_df = emotion_df.iloc[:,3:]
    emotion_mean = emotion_df.mean(axis=0)
    emotion_mean = emotion_mean.to_dict()

    return [emotion_mean]
