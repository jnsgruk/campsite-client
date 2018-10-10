import StatusUpdater from "./status-updater"
import { readFileSync } from "fs"

const devices = JSON.parse(readFileSync("./config/sim-config.json"))

const { port, host } = JSON.parse(readFileSync("./config/config.json"))

for (let device of devices) {
  const interval = Math.floor(Math.random() * (20 - 1 + 1)) + 1
  setTimeout(
    () => new StatusUpdater({ ...device, port, host }),
    interval * 1000
  )
}
