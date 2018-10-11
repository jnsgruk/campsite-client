#!/bin/bash
if [ "$EUID" -ne  0 ]
  then echo "Please run as root!"
  exit
fi

CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Install deps
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt install nodejs yarn gpsd

cd $CAMPSITE_DIR 

# Backup existing config
if [ -f "/opt/campsite-client/config.json" ]; then cp /opt/campsite-client/config.json /tmp/config.json; fi

# Cleanup old install
systemctl stop campsite-client
rm -rf /opt/campsite-client
mkdir -p /opt/campsite-client

# Install campsite-client files
cp ./campsite-client.js /opt/campsite-client/campsite-client.js
cp ./config.json /opt/campsite-client/config.json
cp ./package.json /opt/campsite-client/package.json
# Retore config if one was backed up
if [ -f "/tmp/config.json" ]; then mv /tmp/config.json /opt/campsite-client/config.json; fi

# Install node deps
cd /opt/campsite-client
NODE_ENV=production yarn

# Create systemd unit 
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

# Remove source files
cd $CAMPSITE_DIR/..
rm -rf $CAMPSITE_DIR

# Restart the campsite-client
systemctl daemon-reload
systemctl enable gpsd
systemctl restart gpsd
systemctl restart campsite-client