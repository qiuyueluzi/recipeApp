import requests
import time
from bs4 import BeautifulSoup


for i in range(8,9) :
    try:
        urlnumber = str(i)
        url = "https://park.ajinomoto.co.jp/recipe/card/30" + urlnumber.zfill(4) + "/"
        path = "recipes/ajinomoto/30" + urlnumber.zfill(4) + ".txt"
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        recipe = str(soup.select("[id='recipeCard']"))
        if("ご指定のページは見つかりませんでした。" not in recipe and len(recipe) > 3):
            f = open(path, "w")
            f.write(recipe)
            f.close()

        """url = "https://www.kewpie.co.jp/recipes/recipe/QP0" + urlnumber.zfill(4) + "/"
        path = "recipes/kewpie/0" + urlnumber.zfill(4) + ".txt"
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        recipe = str(soup.select("[class='l-main--fullwidth']"))
        if("ご指定のページにアクセスできませんでした。" not in recipe):
            f = open(path, "w")
            f.write(recipe)
            f.close()

        urlnumber = str(i)
        url = "https://www.kikkoman.co.jp/homecook/search/recipe/0005" + urlnumber.zfill(4) + "/index.html"
        path = "recipes/kikkoman/0005" + urlnumber.zfill(4) + ".txt"
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        recipe = str(soup.select("main"))
        if("お探しのページが見つかりません" not in recipe):
            f = open(path, "w")
            f.write(recipe)
            f.close()

        url = "https://www.mizkan.co.jp/ouchirecipe/recipe/?menu_id=2" + urlnumber.zfill(4)
        path = "recipes/mizkan/2" + urlnumber.zfill(4) + ".txt"
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        recipe = str(soup.select("[class='recipe_top recipeTop']")) + str(soup.select("[class='recipe_nutrition recipeNutrition']"))
        if(len(recipe) > 4):
            f = open(path, "w")
            f.write(recipe)
            f.close()"""
        time.sleep(1)
        if(i % 100 == 0):
            print(i)
            time.sleep(60)
    except :
        print("error")
        print(i)
        time.sleep(300)