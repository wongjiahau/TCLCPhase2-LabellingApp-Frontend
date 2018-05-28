#!/bin/bash
if [ $# -ne 1 ]; then
    echo "Please provide version, example v1"
    exit 1
fi

./build.sh
surge ./build "tclc-labelling-app-$1.surge.sh"
