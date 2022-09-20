#!/bin/bash

dirs="ajinomoto kewpie kikkoman mizkan"

for dir in $dirs;
    do
        mkdir -v -p ./data_file/$dir/recipes
        mkdir -v -p ./data_file/$dir/ingredients
        mkdir -v -p ./data_file/$dir/make_list
        file_path="/home/hika4423/recipes/$dir/*.txt"
        files=`find $file_path -type f | gawk -F/ '{print $NF}'`

    for file in $files;
        do
            set -e

            ./make_csv $dir $file

            echo $dir $file OK
        done

    done

cat ./data_file/ajinomoto/recipes/*.csv ./data_file/kewpie/recipes/*.csv ./data_file/kikkoman/recipes/*.csv ./data_file/mizkan/recipes/*.csv > ./data_file/all/recipes.csv
cat ./data_file/ajinomoto/ingredients/*.csv ./data_file/kewpie/ingredients/*.csv ./data_file/kikkoman/ingredients/*.csv ./data_file/mizkan/ingredients/*.csv > ./data_file/all/ingredients.csv
cat ./data_file/ajinomoto/make_list/*.csv ./data_file/kewpie/make_list/*.csv ./data_file/kikkoman/make_list/*.csv ./data_file/mizkan/make_list/*.csv > ./data_file/all/make_list.csv

for dir in $dirs;
    do
        rm -drf -v ./data_file/$dir/recipes
        rm -drf -v ./data_file/$dir/ingredients
        rm -drf -v  ./data_file/$dir/make_list

    done

echo complete

exit 0