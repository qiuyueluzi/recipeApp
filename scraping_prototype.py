import requests
from bs4 import BeautifulSoup

url = "https://www.kikkoman.co.jp/homecook/search/recipe/00004780/index.html"

r = requests.get(url)

soup = BeautifulSoup(r.content, "html.parser")

f = open("shoga.txt", "w")
recipe = str(soup.select("main"))
f.write(recipe)
f.close()