#! /usr/bin/env node

// IMPORTS
const yargs = require("yargs");

// VARIABLES
const templates = [
  {
    label: "Standalone",
    value: "standalone",
  },
  {
    label: "QB-Core",
    value: "qbcore",
  },
  {
    label: "ESX",
    value: "esx",
  },
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Svelte",
    value: "svelte",
  },
];

// FUNCTIONS
function isValidType(type) {
  let foundType = false;
  for (let i = 0; i < templates.length; i++) {
    if (type == templates[i].value) {
      foundType = true;
    }
  }
  return foundType;
}

function showHelp() {
  let formattedTemplates = templates.reduce((acc, { label, ...x }) => {
    acc[label] = x;
    return acc;
  }, {});

  console.log("Available templates: \n");
  console.table(formattedTemplates);
}

// MAIN
const usage = "\nUsage: fivemresource <action>";
const options = yargs
  .usage(usage)
  .option("templates", {
    describe: "List all templates.",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

if (yargs.argv.templates == true) {
  showHelp();
}

if (yargs.argv._[0] == null) {
  showHelp();
}
