import { ArgumentParser } from "argparse"
import StatusUpdater from "./status-updater"
import { readFileSync } from "fs"
import { hostname } from "os"

const parser = new ArgumentParser({
  version: "0.1.0",
  addHelp: true,
  description:
    "Simple worker to send location data for a specific sensor to an instance of campsite.",
})

parser.addArgument(["-H", "--host"], {
  help: "IP address or domain name of Campsite instance",
  defaultValue: "localhost",
})

parser.addArgument(["-P", "--port"], {
  help: "Remote port of Campsite instance",
  defaultValue: 5000,
})

parser.addArgument(["-I", "--interval"], {
  help: "Interval in seconds between messages",
  defaultValue: 5,
})

parser.addArgument(["-C", "--callsign"], {
  help: "Callsign or name of sensor",
  defaultValue: hostname(),
})

parser.addArgument(["-D", "--debug"], {
  help: "Output debug information to stdout",
  action: "storeTrue",
  defaultValue: false,
})

parser.addArgument(["-c", "--config-file"], {
  help: "Path to a config file",
  dest: "config",
})

const args = parser.parseArgs()

const { callsign, interval, debug, port, host, lat, lon } = args.config
  ? JSON.parse(readFileSync("./config.json"))
  : args

new StatusUpdater({ callsign, interval, debug, port, host, lat, lon })
