import request from "request-promise-native"
import moment from "moment"
import GPS from "./gps"

class StatusUpdater {
  constructor({
    callsign,
    interval = 5,
    lat = null,
    lon = null,
    host = "localhost",
    port = 5000,
    debug = false,
  }) {
    if (lat) {
      this.lat = lat
      this.lon = lon
      this.fakeGPS = true
    } else {
      this.fakeGPS = false
      this.gps = new GPS()
    }
    this.callsign = callsign
    this.host = host
    this.port = port
    this.interval = interval * 1000
    this.debug = debug

    this.sendStatus()
  }

  sendStatus = () => {
    const gpsInfo = this.fakeGPS ? null : this.gps.info()

    const lat = this.fakeGPS ? this.lat : gpsInfo.lat
    const lon = this.fakeGPS ? this.lon : gpsInfo.lon
    const timestamp = Math.round(new Date().getTime() / 1000)
    const readableTimestamp = moment.unix(timestamp).format("DD/MM/YY HH:mm:ss")

    const callsign = this.callsign

    setTimeout(this.sendStatus, this.interval)

    request
      .post({
        uri: `http://${this.host}:${this.port}/device`,
        body: { callsign, lat, lon, timestamp },
        json: true,
      })
      .then(body => {
        if (this.debug) {
          console.log(
            `[${readableTimestamp}][${callsign}] Sent location (${lat},${lon}) to http://${
              this.host
            }:${this.port}/devices`
          )
        }
      })
      .catch(e => {
        console.log(
          `[${readableTimestamp}][${callsign}] Error sending location to http://${
            this.host
          }:${this.port} - ${e.message}`
        )
      })
  }
}

export default StatusUpdater
