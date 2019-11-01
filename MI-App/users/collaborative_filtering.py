from math import sqrt
import os
import pandas as pd

from .models import Profile
from django.contrib.auth.models import User



def main(request, instance):

    user_data =pd.DataFrame(list(User.objects.all().values('id','username')))
    user_profile = pd.DataFrame(list(Profile.objects.all().values("user_id",instance)))
    user_profile = user_profile.drop_duplicates(subset=["user_id", instance])
    user_profile = user_profile.dropna()
    users = pd.merge(user_data, user_profile,left_on='id', right_on="user_id")
    users = users.drop(labels=['id','user_id'], axis=1)


    #  users의 데이터프레임을 dictionary로
    data_dict = users.groupby('username').apply(lambda x: x.to_dict(orient='list')).to_dict()
    # username key 제거
    for i in data_dict:
        del data_dict[i]['username']

    # values 추출
    movie_code = []
    for i in data_dict:
        for key, value in data_dict[i].items():
            movie_code.append(value)

    # 최족 dictionary 생성
    user_movie_data = dict()
    for i,(key,value) in enumerate(data_dict.items()):
        user_movie_data[key] = movie_code[i]

    li = getRecommendation(user_movie_data,request.user.get_username(),sim_jaccard)
    
    
    return li

def sim_jaccard(data, name1, name2):
    overlap=0 
    for i in data[name1]:
        if i in data[name2]:
            overlap+=1
    return overlap / (len(data[name1]) + len(data[name2]) - overlap)

def top_match(data, name, index=2, sim_function=sim_jaccard):
    li=[]
    for i in data:
        if name!=i: 
            li.append((sim_function(data,name,i),i))
    li = sorted(li, key=lambda x : x[0], reverse=True)
    return li[:index]

def getRecommendation (data,person,sim_function, index=2 ):
    result = top_match(data, person ,index , sim_function)
    simSum=0
    score=0 
    li=[] 
    score_dic={}
    sim_dic={}
 
    for sim,name in result:
        if sim < 0 : 
            continue
        for movie in data[name]: 
            if movie not in data[person]:
                # score+=sim*data[name][movie] 
                score += sim * 1
                score_dic.setdefault(movie,0)
                score_dic[movie]+=score
 
                # 조건에 맞는 사람의 유사도의 누적합을 구한다
                sim_dic.setdefault(movie,0) 
                sim_dic[movie]+=sim
 
            score=0 
    
    for key in score_dic: 
        score_dic[key]=score_dic[key]/sim_dic[key]
        li.append({'score':score_dic[key],"movie_code":key})
    li = sorted(li, key=lambda x : x['score'], reverse=True)
    return li