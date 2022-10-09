#! /usr/bin/env node

// IMPORTS
const yargs = require("yargs");
const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");

// VARIABLES
const frameworks = [
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
];

const uiFrameworks = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Default Javascript",
    value: "defaultjs",
  },
  {
    label: "Vue 3.0",
    value: "vue3",
  },
  {
    label: "Vue 2.0 (CDN)",
    value: "vuecdn",
  },
  {
    label: "Jquery",
    value: "jquery",
  },
  // {
  //   label: "Svelte",
  //   value: "svelte",
  // },
  // {
  //   label: "Angular",
  //   value: "angular",
  // },
  // {
  //   label: "React",
  //   value: "react",
  // },
];

const uiFiles = {
  vue3: `
files {
  "html/index.html",
  "html/assets/*.js",
  "html/assets/*.css"
}
`,
  vuecdn: `
files {
  "html/index.html",
  "html/*.js",
  "html/*.css"
}
`,
  jquery: `
files {
  "html/index.html",
  "html/*.js",
  "html/*.css"
}
`,
  defaultjs: `
files {
  "html/index.html",
  "html/*.js",
  "html/*.css"
}
`,
  svelte: `
files {
  "html/index.html",
  "html/chunks/*.js",
  "html/entries/**/*.js",
  "html/assets/*.css"
}
`,
  react: "",
};

let fivemFrameworkChoices = [];
for (i = 0; i < frameworks.length; i++) {
  fivemFrameworkChoices.push(frameworks[i].label);
}

let uiFrameworkChoices = [];
for (i = 0; i < uiFrameworks.length; i++) {
  uiFrameworkChoices.push(uiFrameworks[i].label);
}

// FUNCTIONS
function getTemplateFromLabel(list, label) {
  let foundType = false;
  for (let i = 0; i < list.length; i++) {
    if (label == list[i].label) {
      return list[i].value;
    }
  }
  return undefined;
}

// MAIN
const options = yargs
  .usage("Usage: fivemresource new <project_name>")
  .option("templates", {
    describe: "List all templates.",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

if (yargs.argv.templates == true) {
  let formattedTemplates = templates.reduce((acc, { label, ...x }) => {
    acc[label] = x;
    return acc;
  }, {});

  console.log("Available templates: \n");
  console.table(formattedTemplates);
}

if (yargs.argv._[0] == null || yargs.argv._[0] == undefined) {
  console.log("Usage: fivemresource new <template_name>");
} else {
  if (yargs.argv._[0].toLowerCase() == "new") {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Project folder name (leave blank for local folder)",
        },
        {
          type: "list",
          name: "fivemFramework",
          message: "What FiveM framework do you want to use?",
          choices: fivemFrameworkChoices,
        },
        {
          type: "list",
          name: "uiTemplate",
          message: "What UI framework do you want to use?",
          choices: uiFrameworkChoices,
        },
      ])
      .then(async (answers) => {
        const path = answers.name !== undefined ? "./" + answers.name : "./";
        const fivemTemplate = getTemplateFromLabel(
          frameworks,
          answers.fivemFramework
        );
        const uiTemplate = getTemplateFromLabel(
          uiFrameworks,
          answers.uiTemplate
        );

        fse.copySync(`${__dirname}/../templates/fivem/${fivemTemplate}`, path, {
          overwrite: true,
        });

        if (uiTemplate !== "none") {
          fs.readFile(`${path}/fxmanifest.lua`, "utf8", function (err, data) {
            if (err) {
              return console.log(err);
            }
            data += `\n
${uiFiles[uiTemplate]}

ui_page "html/index.html"
            `;

            fs.writeFile(`${path}/fxmanifest.lua`, data, function (err) {
              if (err) return console.log(err);
            });
          });

          fse.copySync(`${__dirname}/../templates/ui/${uiTemplate}`, path, {
            overwrite: true,
          });
        }
      });
  } else {
    console.log(
      "Invalid usage, you have to enter a valid folder / project name.\nfivemresource new <project_name>"
    );
  }
}
