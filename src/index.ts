#!/usr/bin/env node

import { existsSync } from "fs";
import helpHandler from "./handlers/help.js";
import minimist from "minimist"
import path from "path";
import { CommandHandler } from "./utils/types.js";

const argv = minimist(process.argv.slice(2))
const cmdName = argv._.join("_")
const cmdPath = path.join(import.meta.dirname, "./handlers/" + cmdName + ".js")

async function main() {
  if (existsSync(cmdPath)) {
    const handler = await import(cmdPath) as { default: CommandHandler }

    if (handler && "default" in handler) {
      handler.default(argv)
      return
    }
  }

  helpHandler(argv);
}

main()
