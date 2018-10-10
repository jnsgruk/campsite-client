### Campsite Client

This project is mostly for testing the Campsite project. It contains a number of source files:

1. `src/status-updater.js` is a class for creating an object that sends a status update message in the format expected by Campsite at a defined interval

2. `src/gps.js` is a simple class for reading location data from`gpsd`

3. `src/simulator.js` is a test harness that reads "device" information from `sim-config.json` to simulate devices sending their information. Only to be used in development/for demonstrations.

4. `src/worker.js` is a command line utility that accepts config files or config items as command line switches. This is the best option for working in production, and would be ideal for use in a systemd unit. Command line options are as follows:

```
usage: worker.js [-h] [-v] [-H HOST] [-P PORT] [-I INTERVAL] [-C CALLSIGN]
                 [-D] [-c CONFIG]


Simple worker to send location data for a specific sensor to an instance of
campsite.

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -H HOST, --host HOST  IP address or domain name of Campsite instance
  -P PORT, --port PORT  Remote port of Campsite instance
  -I INTERVAL, --interval INTERVAL
                        Interval in seconds between messages
  -C CALLSIGN, --callsign CALLSIGN
                        Callsign or name of sensor
  -D, --debug           Output debug information to stdout
  -c CONFIG, --config-file CONFIG
                        Path to a config file
```

### Installing in production with systemd unit

This method will install Campsite Client into `/opt/campsite-client` and create a systemd unit called `campsite-client`.

First, obtain a release zip file. This can be downloaded from the (Releases Page)[https://github.com/jnsgruk/campsite-client/releases] or built from the command line:

```
$ git clone https://github.com/jnsgruk/campsite-client
$ cd campsite-client/
$ ./build-release.sh
```

Once you have a release zip, copy it onto the client device and run:

```
$ unzip campsite-client.zip && sudo ./campsite-client/install.sh
```

To configure the client, edit the `/opt/campsite-client/config.json` file. Note that running the install script on a device already running the client will not touch your config file.

### Build Project

To transpile, combine and minimise the source into a single file:

```
$ git clone https://github.com/jnsgruk/campsite-client
$ cd campsite-client/
$ yarn
$ yarn run rollup
```

The production build will be saved in `build/campsite-client.js`. This can be run simply by making the file executable and running `./campsite-client.js` combined with the options displayed above.

#### Simulator

The simulator is used to populate a Campsite server with false devices for demonstration purposes. To get started, clone the repo and double check the `config/sim-config.json` file has the correct devices configured. The simulator script will read the host and port config from `config/config.json` Next, run the following:

```
$ yarn install
$ yarn run sim
```
