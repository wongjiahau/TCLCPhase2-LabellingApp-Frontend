#!/bin/bash
cp ./src/views/LabellingView.js ./temp.js
sed -i '/testData/d' ./src/views/LabellingView.js
sed -i 's/const DEBUGGING = true/const DEBUGGING = false/g' ./src/views/LabellingView.js

npm run build

rm ./src/views/LabellingView.js
mv ./temp.js ./src/views/LabellingView.js