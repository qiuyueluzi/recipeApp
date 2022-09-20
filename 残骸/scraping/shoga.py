#https://www.kikkoman.co.jp/homecook/search/recipe/00006537/index.html
#https://recipe.yamasa.com/recipes/3213
#https://park.ajinomoto.co.jp/recipe/card/709899/

import requests
from bs4 import BeautifulSoup

#豚の生姜焼きのレシピ走査
urls = ["https://www.kikkoman.co.jp/homecook/search/recipe/00006537/index.html",
        "https://recipe.yamasa.com/recipes/3213",
        "https://park.ajinomoto.co.jp/recipe/card/709899/"]
for i in range(len(urls)):
    path = "shoga/" + str(i) + ".txt"
    r = requests.get(urls[i])
    soup = BeautifulSoup(r.content, "html.parser")
    recipe = str(soup.select("main"))
    if(len(recipe) < 3):
        recipe = str(soup.select("[id='main-content']"))
    if(len(recipe) < 3):
        recipe = str(soup.select("[id='recipeCard']"))
    f = open(path, "w")
    f.write(recipe)
    f.close()
