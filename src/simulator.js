import StatusUpdater from "./status-updater"
import { readFileSync } from "fs"

const config = JSON.parse(readFileSync("./config/sim-config.json"))

for (const device of config) {
  const interval = Math.floor(Math.random() * (20 - 1 + 1)) + 1
  setTimeout(() => new StatusUpdater(device), interval * 1000)
}
