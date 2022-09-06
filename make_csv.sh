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
    
        cat ./data_file/$dir/recipes/*.csv > ./data_file/$dir/recipes.csv
        cat ./data_file/$dir/ingredients/*.csv > ./data_file/$dir/ingredients.csv
        cat ./data_file/$dir/make_list/*.csv > ./data_file/$dir/make_list.csv


    done

cat ./data_file/ajinomoto/recipes/*.csv ./data_file/kewpie/recipes/*.csv ./data_file/kikkoman/recipes/*.csv > ./data_file/recipes.csv

echo complete

exit 0