import requests
import time
from bs4 import BeautifulSoup

#キッコーマン、ヤマサのレシピ走査
for i in range(1,50) :
    urlnumber = str(i)
    url = "https://www.kikkoman.co.jp/homecook/search/recipe/" + urlnumber.zfill(8) + "/index.html"
    path = "recipes/kikkoman/" + urlnumber.zfill(8) + ".txt"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    recipe = str(soup.select("main"))
    if("お探しのページが見つかりません" not in recipe):
        f = open(path, "w")
        f.write(recipe)
        f.close()

    url = "https://recipe.yamasa.com/recipes/" + urlnumber
    path = "recipes/yamasa/" + urlnumber.zfill(8) + ".txt"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    recipe = str(soup.select("[id='main-content']"))
    if("ご指定のページが見つかりませんでした。" not in recipe):
        f = open(path, "w")
        f.write(recipe)
        f.close()
    time.sleep(1)