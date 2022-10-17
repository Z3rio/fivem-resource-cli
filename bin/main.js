#! /usr/bin/env node

// IMPORTS
const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");
const exec = require("child_process").exec;

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
    label: "React",
    value: "react",
    hasNodeModules: true,
  },
  {
    label: "Vue 3.0",
    value: "vue3",
    hasNodeModules: true,
  },
  {
    label: "Vue 2.0 (CDN)",
    value: "vuecdn",
  },
  {
    label: "Default",
    value: "default",
  },
  {
    label: "jQuery",
    value: "jquery",
  },
  // TODO: Add more UI frameworks
  // {
  //   label: "Svelte",
  //   value: "svelte",
  // },
  // {
  //   label: "Angular",
  //   value: "angular",
  // },
];

const uiFiles = {
  js: {
    vue3: `
files {
  "html/index.html",
  "html/assets/*.js",
  "html/assets/*.css"
}
`,
    react: `
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
    default: `
files {
  "html/index.html",
  "html/*.js",
  "html/*.css"
}
`,
  },
  ts: {
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
  "html/*.ts",
  "html/*.css"
}
`,
    react: `
files {
  "html/index.html",
  "html/assets/*.js",
  "html/assets/*.css"
}
`,
    jquery: `
files {
  "html/index.html",
  "html/*.ts",
  "html/*.css"
}
`,
    default: `
files {
  "html/index.html",
  "html/*.ts",
  "html/*.css"
}
`,
  },
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
      return list[i];
    }
  }
  return undefined;
}

// MAIN
switch (process.argv.slice(2)[0]) {
  case "new":
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

        fse.copySync(
          `${__dirname}/../templates/fivem/${fivemTemplate.value}`,
          path,
          {
            overwrite: true,
          }
        );

        if (uiTemplate.value !== "none") {
          inquirer
            .prompt([
              {
                type: "list",
                name: "type",
                message: "What language do you want to use for the UI?",
                choices: ["Javascript", "Typescript"],
              },
            ])
            .then(async (answers2) => {
              const type = answers2.type == "Javascript" ? "js" : "ts";

              fs.readFile(
                `${path}/fxmanifest.lua`,
                "utf8",
                function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  data += `\n
${uiFiles[type][uiTemplate.value]}

ui_page "html/index.html"
                  `;

                  fs.writeFile(`${path}/fxmanifest.lua`, data, function (err) {
                    if (err) return console.log(err);
                  });
                }
              );

              fse.copySync(
                `${__dirname}/../templates/ui/${type}/${uiTemplate.value}`,
                path,
                {
                  overwrite: true,
                }
              );

              if (uiTemplate.hasNodeModules == true) {
                inquirer
                  .prompt([
                    {
                      type: "confirm",
                      name: "autoinstallmodules",
                      message: `Do you want to auto install the Node Modules for ${uiTemplate.label}?`,
                    },
                  ])
                  .then(async (answers3) => {
                    if (answers3.autoinstallmodules == true) {
                      exec(
                        "npm install",
                        {
                          cwd: `${path}/src`,
                        },
                        function (error, stdout, stderr) {
                          if (error) {
                            console.error(error);
                          }
                        }
                      );
                    }
                  });
              }
            });
        }
      });
    break;
  case "--templates":
    let formattedFiveMTemplates = frameworks.reduce((acc, { label, ...x }) => {
      acc[label] = x;
      return acc;
    }, {});

    let formattedUITemplates = uiFrameworks.reduce((acc, { label, ...x }) => {
      acc[label] = x;
      return acc;
    }, {});

    console.log("Available FiveM templates:");
    console.table(formattedFiveMTemplates);

    console.log("Available UI templates:");
    console.table(formattedUITemplates);
    break;
  case null || undefined || "--help":
    console.log(
      "Usage: fivemresource new\nTemplate list: fivemresources --templates"
    );
    break;
  default:
    console.log(
      "Invalid usage, you have to entered an invalid action.\nfivemresource new"
    );
    break;
}
