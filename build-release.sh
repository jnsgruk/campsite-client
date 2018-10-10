#!/bin/bash
CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $CAMPSITE_DIR

# Install deps and build frontend
yarn
yarn run rollup

# Make the compiled file executable
chmod +x $CAMPSITE_DIR/build/campsite-client.js

# Cleanup old build artifacts and create build folder
rm -rf campsite-client.zip
rm -rf $CAMPSITE_DIR/campsite-client
mkdir $CAMPSITE_DIR/campsite-client

# Copy files into place
cp -R $CAMPSITE_DIR/config/config.json $CAMPSITE_DIR/campsite-client/config.json
cp -R $CAMPSITE_DIR/config/install.sh $CAMPSITE_DIR/campsite-client/install.sh
cp $CAMPSITE_DIR/package.json $CAMPSITE_DIR/campsite-client/package.json
mv $CAMPSITE_DIR/build/campsite-client.js $CAMPSITE_DIR/campsite-client/campsite-client.js
chmod +x $CAMPSITE_DIR/campsite-client/campsite-client.json
zip -r campsite-client.zip campsite-client/

rm -rf $CAMPSITE_DIR/build
rm -rf $CAMPSITE_DIR/campsite-client