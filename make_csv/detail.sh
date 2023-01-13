#!/bin/bash

curl -s https://www.kikkoman.co.jp/homecook/search/detail_search.html | pup 'div:nth-last-of-type(n+2) label json{}' --color > ./detail.json

#./category category.json