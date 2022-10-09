#!/bin/bash

dirs="ajinomoto" ##kewpie kikkoman mizkan"

for dir in $dirs;
    do
        mkdir -v -p ../data_file/$dir/ingredients
        mkdir -v -p ../data_file/$dir/ingredients/tmp
        file_path="../../recipes/$dir/*.txt"
        files=`find $file_path -type f | gawk -F/ '{print $NF}'`

    for file in $files;
        do
            set -e

            if [ $dir = "ajinomoto" ]; then
                echo `basename -s ".txt" -a $file`.json
                cat ../../recipes/$dir/$file | pup 'div:nth-last-of-type(n+2) dl json{}' --color > ../data_file/$dir/ingredients/tmp/`basename -s ".txt" -a $file`.json
            elif [ $dir = "kewpie" ]; then
                echo $dir
            elif [ $dir = "kikkoman" ]; then
                echo $dir
            elif [ $dir = "mizkan" ]; then
                echo $dir
            else
                echo error
            fi

            ./ingredients $dir `basename -s ".txt" -a $file`.json

            echo $dir $file OK

        done

    done

cat ../data_file/$dir/ingredients/*.csv > ../data_file/all/ingredients.csv

for dir in $dirs;
    do
        echo $dir
        #rm -drf -v ./data_file/$dir/recipes
        rm -drf -v ../data_file/$dir/ingredients
        #rm -drf -v  ./data_file/$dir/make_list
    done

echo complete

exit 0