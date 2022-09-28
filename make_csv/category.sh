#!/bin/bash

curl -s https://recipe.rakuten.co.jp/category/ | pup 'ul li:nth-last-of-type(n+2) a json{}' --color > ./category.json

./category category.json