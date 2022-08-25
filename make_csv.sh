#!/bin/bash

dirs="ajinomoto kewpie kikkoman"

for dir in $dirs;
    do
    file_path="./recipes/$dir/*.txt"
    files=`find $file_path -type f | gawk -F/ '{print $NF}'`

    for file in $files;
        do
            set -e

            ./make_csv $dir $file

            echo $dir $file OK
        done
    
        cat ./csv_h/recipes_h.csv ./data_file/$dir/recipes/*.csv > ./data_file/$dir/recipes.csv
        cat ./csv_h/ingredients_h.csv ./data_file/$dir/ingredients/*.csv > ./data_file/$dir/ingredients.csv
        cat ./csv_h/make_list_h.csv ./data_file/$dir/make_list/*.csv > ./data_file/$dir/make_list.csv


    done
#awk 'NR==1 || FNR!=1' ./data_file/ajinomoto/*.csv > ./data_file/ajinomoto.csv

echo complete

exit 0