### Campsite Client

This project is mostly for testing the Campsite project. It contains a number of source files:

1. `status-updater.js` is a class for creating an object that sends a status update message in the format expected by Campsite at a defined interval

2. `gps.js` is a simple class for reading location data from`gpsd`

3. `index.js` is a test harness that reads "device" information from `config.json` to simulate devices sending their information. Only to be used in development/for demonstrations.

To get started, clone the repo and run:

```
$ cd campsite-client
$ npm install
$ npm run dev
```
