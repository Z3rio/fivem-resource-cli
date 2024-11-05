import { CommandHandler } from "../utils/types.js"
import { select, input } from '@inquirer/prompts';
import uiTemplates from "../templates/ui/index.js";
import fivemTemplates from "../templates/fivem/index.js";
import pc from "picocolors"
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { handleActions } from "../utils/functions.js";

interface Choice {
  name: string;
  value: string;
  description: string;
}

const handler: CommandHandler = async () => {
  console.info("")
  const cwd = process.cwd()

  try {

    const projName = await input({ message: 'Enter the project name' });

    if (typeof projName !== "string" || projName.trim().length === 0) {
      console.warn("\n" + pc.redBright("The project name cant be empty, it will be the name of your resource folder"))
      return
    }

    const projPath = path.join(cwd, projName)
    if (existsSync(projPath)) {
      console.warn("\n" + pc.redBright(`A folder with the name ${pc.italic(projName)} already exists in your current working directory`))
      return
    }

    const fivemChoices: Choice[] = []
    const uiChoices: Choice[] = []

    for (const key in fivemTemplates) {
      const v = fivemTemplates[key]

      fivemChoices.push({
        name: v.label,
        value: key,
        description: `Use ${v.label} as the fivem framework for the resource`
      })
    }

    for (const key in uiTemplates) {
      const v = uiTemplates[key]

      uiChoices.push({
        name: v.label,
        value: key,
        description: `Use ${v.label} as the ui framework for the resource`
      })
    }

    const fivemFramework = await select({
      message: 'Select a fivem framework',
      choices: fivemChoices
    });


    const uiFramework = await select({
      message: 'Select a ui framework',
      choices: uiChoices
    });

    let uiLanguage: undefined | "ts" | "js";
    let hasLanguageSpecificCommand = uiTemplates[uiFramework].actions.findIndex((v) => v.type === "command" && typeof v.list !== "string") !== -1

    if (hasLanguageSpecificCommand == true) {
      uiLanguage = await select<"ts" | "js">({
        message: "Select ui language",
        choices: [
          {
            name: "Typescript",
            value: "ts"
          },
          {
            name: "Javascript",
            value: "js"
          }
        ]
      })
    }

    mkdirSync(projPath)

    handleActions(fivemTemplates[fivemFramework].actions, projPath, projName, uiLanguage)
    handleActions(uiTemplates[uiFramework].actions, projPath, projName, uiLanguage)

  } catch (err) {
    if (err !== null && err !== undefined && typeof err === "object" && !Array.isArray(err) && "name" in err && typeof err.name === "string" && err.name === "ExitPromptError") {
      console.info("")
      console.info(pc.redBright("Cancelled resource creation"))
    } else {
      console.info("")
      console.info(pc.redBright("Unexpected error occured"))
      console.error(err)
    }
  }
}

export default handler
