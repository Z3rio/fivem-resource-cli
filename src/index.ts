#!/usr/bin/env node

import helpHandler from "./handlers/help.js";
import minimist from "minimist";
import { commandList } from "./utils/data.js";

const argv = minimist(process.argv.slice(2));
const cmdName = argv._.join("_");

async function main() {
  if (cmdName in commandList) {
    commandList[cmdName](argv);
  } else {
    helpHandler(argv);
  }
}

main();

// todo: add support for creating project with both esx & qbcore support
// todo: add support for merging client_script files, and so on, luaparser?
