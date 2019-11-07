from math import sqrt
import os
import pandas as pd

from .models import Profile
from django.contrib.auth.models import User
from moviescore.models import MovieScore
from movieInfo.models import MovieInfo

def item_based_filtering(request, movie_code):
    movie_score = pd.DataFrame(list(MovieScore.objects.all().values('movieCd','impression','fear','anger','sadness','fun','boredom')))
    movie_data = pd.DataFrame(list(MovieInfo.objects.all().values('movieCd','movieNm','poster','repGenre','repNation','openDt')))
    pre_dict = {}
    for i in movie_score.to_dict('records'):
        pre_dict[i['movieCd']] = {
            'impression': i['impression'], 
            'fear': i['fear'], 
            'anger': i['anger'], 
            'sadness':i['sadness'], 
            'fun': i['fun'],
            'boredom': i['fun']
            }
    try:
        data = get_code_by_emotion(pre_dict,movie_code,sim_pearson, index=5)
    except:
        data = []
        return data

    movie_dict = {}
    for i in movie_data.to_dict('records'):
        movie_dict[i['movieCd']]={
            'movieNm':i['movieNm'],
            'poster':i['poster'],
            'repGenre':i['repGenre'],
            'repNation':i['repNation'],
            'openDt':i['openDt']
        }
    # print(movie_dict)
    # print(pre_dict)


    for k in pre_dict:
        pre_dict[k].update(movie_dict.get(k, {}))


    result_list = []
    for idx, i in enumerate(data):
        pre_dict[i[1]]['movieCd'] = i[1]
        pre_dict[i[1]]['index'] = idx
        result_list.append(pre_dict[i[1]])
    # print(result_list)
    return result_list


def user_based_filtering(request, instance):

    user_data =pd.DataFrame(list(User.objects.all().values('id','username')))
    user_profile = pd.DataFrame(list(Profile.objects.all().values("user_id",instance)))
    user_profile = user_profile.drop_duplicates(subset=["user_id", instance])
    user_profile = user_profile.dropna()
    users = pd.merge(user_data, user_profile,left_on='id', right_on="user_id")
    users = users.drop(labels=['id','user_id'], axis=1)

    profile_watched_movie = pd.DataFrame(list(Profile.objects.all().values('user_id','watchedMovie')))
    profile_watched_movie = profile_watched_movie.drop_duplicates(subset=["user_id", 'watchedMovie'])
    profile_watched_movie = profile_watched_movie.dropna()
    matched_data = pd.merge(user_data, profile_watched_movie,left_on='id', right_on="user_id")
    matched_data = matched_data.drop(labels=['id','user_id'], axis=1)


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
    
    new_li = []
    matched_data = matched_data.pivot_table(values='watchedMovie', index=matched_data.index, columns='username', aggfunc='first')
    user_matched_table = matched_data[request.user.get_username()]
    user_matched_table = user_matched_table.dropna()
    user_matched_table = user_matched_table.tolist()
    
    for i in li:
        if i['movie_code'] not in user_matched_table:
            new_li.append(i)
        else:
            pass
    return new_li

def sim_jaccard(data, name1, name2):
    overlap=0 
    for i in data[name1]:
        if i in data[name2]:
            overlap+=1
    return overlap / (len(data[name1]) + len(data[name2]) - overlap)

# 피어슨 상관계수 구하기
def sim_pearson(data, name1, name2):
    sumX=0 
    sumY=0 
    sumPowX=0 
    sumPowY=0 
    sumXY=0 
    count=0 
    
    for i in data[name1]: 
        if i in data[name2]: 
            sumX+=data[name1][i]
            
            sumY+=data[name2][i]
            sumPowX+=pow(data[name1][i],2)
            sumPowY+=pow(data[name2][i],2)
            sumXY+=data[name1][i]*data[name2][i]
            count+=1
    pearson = ( sumXY- ((sumX*sumY)/count) )/ sqrt( (sumPowX - (pow(sumX,2) / count)) * (sumPowY - (pow(sumY,2)/count)))
    return pearson


def top_match(data, name, index=2, sim_function=sim_jaccard):
    li=[]
    for i in data:
        if name!=i: 
            li.append((sim_function(data,name,i),i))
    li = sorted(li, key=lambda x : x[0], reverse=True)
    return li[:index]

def get_code_by_emotion(data, movie_code, sim_function, index=2):
    result = top_match(data, movie_code, index, sim_function)



    return result

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