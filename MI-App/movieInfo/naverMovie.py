
import os
import sys
import urllib.request
import requests
import json

from bs4 import BeautifulSoup


def get_posterUrl(movieNm, prdtYear):

    client_id = "JjcGyzzf5rjyFKNPCTxG"
    client_secret = "MDi_1o76AT"
    encText = urllib.parse.quote(f"{movieNm} {prdtYear}")
    url = "https://openapi.naver.com/v1/search/movie?query=" + \
        encText + "&display=10"  # json 결과
    request = urllib.request.Request(url)

    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)

    response = urllib.request.urlopen(request)
    rescode = response.getcode()

    if(rescode == 200):
        html = response.read().decode("utf-8")
        parse = json.loads(html)
        posterUrl = parse["items"][0]["image"]
    else:
        print("Error Code:" + rescode)

    return posterUrl


# print(get_posterUrl("아바타", 2009))
