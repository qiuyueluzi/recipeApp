import requests
import time
from bs4 import BeautifulSoup

#味の素、キユーピーのレシピ走査
for i in range(1,50) :
    urlnumber = str(i)
    url = "https://park.ajinomoto.co.jp/recipe/card/701" + urlnumber.zfill(3) + "/"
    path = "recipes/ajinomoto/701" + urlnumber.zfill(3) + ".txt"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    recipe = str(soup.select("[id='recipeCard']"))
    if("ご指定のページは見つかりませんでした。" not in recipe and len(recipe) > 3):
        f = open(path, "w")
        f.write(recipe)
        f.close()

    url = "https://www.kewpie.co.jp/recipes/recipe/QP10002" + urlnumber.zfill(3) + "/"
    path = "recipes/kewpie/10002" + urlnumber.zfill(3) + ".txt"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    recipe = str(soup.select("[class='l-main--fullwidth']"))
    if("ご指定のページにアクセスできませんでした。" not in recipe):
        f = open(path, "w")
        f.write(recipe)
        f.close()
    time.sleep(1)