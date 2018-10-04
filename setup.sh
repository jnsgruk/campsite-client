#!/bin/bash
CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install nodejs

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

cd $CAMPSITE_DIR 

yarn
yarn run rollup

systemctl stop campsite-client
rm -rf /opt/campsite-client
mkdir -p /opt/campsite-client
cp ./build/campsite-client.js /opt/campsite-client/campsite-client.js
cp config.json /opt/campsite-client/config.json
cp package.json /opt/campsite-client/package.json
cd /opt/campsite-client
NODE_ENV=production yarn

tee /etc/systemd/system/campsite-client.service <<-EOF
[Unit]
Description=Campsite Client
ConditionPathExists=/opt/campsite-client/campsite-client.js
After=network.target auditd.service

[Service]
User=root
WorkingDirectory=/opt/campsite-client
Environment="NODE_ENV=production"
ExecStart=/opt/campsite-client/campsite-client.js -c /opt/campsite-client/config.json
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload