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

### Compiling/Running the Worker

Before deployment in production, it's best to transpile, combine and minimise the source into a single file. This can be done with one command that utilises `rollup` and `terser`:

```
$ yarn install
$ yarn run rollup
```

The production build will be saved in `build/campsite-client.js`. This can be run simply by making the file executable and running `./campsite-client.js` combined with the options displayed above.

#### Simulator

To get started, clone the repo and double check the `sim-config.json` file has the correct devices configured. Next, run the following:

```
$ yarn install
$ yarn run sim
```
