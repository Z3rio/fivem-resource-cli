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

// todo: add progress bars / nicer looking prints
// todo: version checking structure, perhaps?
// todo: setup strict linting
// todo: setup gitignore in new projects
// todo: setup auto publishing of npm pkg, if applicable.
//       alternatively, manual bash/pwsh script for it, atleast
// todo: add support for creating project with both esx & qbcore support
// todo: add support for merging client_script files, and so on
