#!/usr/bin/env node

import { badUsageHandler } from "./handlers/index.js";
import { commands } from "./utils/data.js";

const argv = process.argv.slice(2)[0]

if (commands[argv]) {
  commands[argv]()
} else {
  badUsageHandler();
}

