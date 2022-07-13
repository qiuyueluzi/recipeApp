#!/bin/bash

dir_path="./recipes/ajinomoto/*"
dirs=`find $dir_path -type f | gawk -F/ '{print $NF}'`

for dir in $dirs;
do

    echo $dir clear

    ./ext_test $dir
done

awk 'NR==1 || FNR!=1' ./data_file/ajinomoto/*.csv > ./data_file/ajinomoto.csv

echo complete