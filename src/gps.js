import { Listener } from "node-gpsd"

class GPS {
  constructor() {
    this.tpv = {
      mode: "n/a",
      lat: "n/a",
      lon: "n/a",
      device: "n/a",
    }
    this.device = {
      activated: 0,
      path: "",
    }

    this.listener = new Listener()

    this.listener.on("TPV", t => (this.tpv = { ...this.tpv, ...t }))
    this.listener.on("DEVICE", d => (this.device = { ...this.device, ...d }))
    this.listener.connect(() => this.listener.watch())
  }

  info = () => ({ ...this.tpv, ...this.device })
}

export default GPS
