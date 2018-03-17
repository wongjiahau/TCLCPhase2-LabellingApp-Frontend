#!/bin/bash
cp ./src/App.js ./App.temp.js
sed -i '/testData/d' ./src/App.js
sed -i 's/const DEBUGGING = true/const DEBUGGING = false/g' ./src/App.js;

npm run build

rm ./src/App.js
mv ./App.temp.js ./src/App.js