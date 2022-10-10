#!/bin/bash

dirs="ajinomoto kewpie" ##kikkoman mizkan"

for dir in $dirs;
    do
        mkdir -v -p ../data_file/$dir/ingredients
        mkdir -v -p ../data_file/$dir/ingredients/tmp
        file_path="../../recipes/$dir/*.txt"
        files=`find $file_path -type f | gawk -F/ '{print $NF}'`

    for file in $files;
        do
            set -e
            ##txtファイルをjsonファイルに変換
            if [ $dir = "ajinomoto" ]; then
                echo $dir `basename -s ".txt" -a $file`.json
                cat ../../recipes/$dir/$file | pup 'div:nth-last-of-type(n+2) dl json{}' --color > ../data_file/$dir/ingredients/tmp/`basename -s ".txt" -a $file`.json
            elif [ $dir = "kewpie" ]; then
                cat ../../recipes/$dir/$file | pup 'div:nth-last-of-type(n+2) tr json{}' --color > ../data_file/$dir/ingredients/tmp/`basename -s ".txt" -a $file`.json
                echo $dir `basename -s ".txt" -a $file`.json
            elif [ $dir = "kikkoman" ]; then
                cat ../../recipes/$dir/$file | pup 'div div div div div div div div div div div div div:nth-last-of-type(n+2) div json{}' --color > ../data_file/$dir/ingredients/tmp/`basename -s ".txt" -a $file`.json
                echo $dir `basename -s ".txt" -a $file`.json
            elif [ $dir = "mizkan" ]; then
                echo $dir `basename -s ".txt" -a $file`.json
            else
                echo error
            fi

            ./ingredients $dir `basename -s ".txt" -a $file`.json

            echo $dir $file OK

        done
        cat ../data_file/$dir/ingredients/*.csv > ../data_file/$dir/ingredients.csv
    done

##cat ../data_file/ajinomoto/ingredients/*.csv ../data_file/kewpie/ingredients/*.csv ../data_file/kikkoman/ingredients/*.csv > ../data_file/all/ingredients.csv

for dir in $dirs;
    do
        echo $dir
        #rm -drf -v ./data_file/$dir/recipes
        rm -drf -v ../data_file/$dir/ingredients
        #rm -drf -v  ./data_file/$dir/make_list
    done

echo complete

exit 0