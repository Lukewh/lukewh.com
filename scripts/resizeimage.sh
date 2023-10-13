#!/bin/bash

echo $1

for f in `find "$1" -name "*.jpg"`
do
    convert $f -resize 790x $f
done