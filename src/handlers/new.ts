import { CommandHandler, File, FileList } from "../utils/types.js"
import { select, input } from '@inquirer/prompts';
import uiTemplates from "../templates/ui/index.js";
import fivemTemplates from "../templates/fivem/index.js";
import pc from "picocolors"
import { commentStart, verboseExecSettings } from "../utils/data.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { execSync } from "child_process";

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

    if (existsSync(path.join(cwd, projName))) {
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

    const uiLanguage = await select({
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

    // todo: handle ui language
    void uiLanguage

    const rawFiles: File[] = [
      ...(fivemTemplates[fivemFramework].files ?? []),
      ...(uiTemplates[uiFramework].files ?? [])
    ]
    const files: FileList = {}

    for (let i = 0; i < rawFiles.length; i++) {
      const v = rawFiles[i]
      let content = v.content

      if (v.comment !== undefined) {
        const nameSplits = v.name.split(".")
        const lang = nameSplits[nameSplits.length - 1]

        if (lang in commentStart) {
          content = `${commentStart[lang]} ${v.comment} \n` + content
        } else {
          console.error(`Couldnt find language ${lang} in comment syntax list`)
        }
      }

      const pathSplits = v.name.split("/")
      const pastPathChecks: string[] = []

      for (let i2 = 0; i2 < pathSplits.length; i2++) {
        const v2 = pathSplits[i2]
        let curr = files

        for (let i3 = 0; i3 < pastPathChecks.length; i3++) {
          const v3 = curr[pastPathChecks[i3]]

          if (typeof v3 !== "string") {
            curr = v3
          }
        }

        if (i2 + 1 === pathSplits.length) {
          if (!(v2 in curr) || (typeof curr[v2] === "string" && curr[v2].trim().length === 0)) {
            curr[v2] = content
          } else {
            curr[v2] = curr[v2] + "\n\n" + content
          }
        } else if (!(v2 in curr)) {
          curr[v2] = {}
        }

        pastPathChecks.push(v2)
      }
    }

    mkdirSync(path.join(cwd, projName))

    function createFiles(data: FileList, pathList?: string[]) {
      if (pathList === undefined) {
        pathList = []
      }

      for (const key in data) {
        if (typeof data[key] === "string") {
          console.info(`Creating file: ./${projName}/${pathList.join("/")}/${key}`)
          writeFileSync(path.join(cwd, projName, ...pathList, key), data[key])
        } else {
          mkdirSync(path.join(cwd, projName, ...pathList, key))
          createFiles(data[key], [...pathList, key])
        }
      }
    }

    createFiles(files)

    if (fivemTemplates[fivemFramework].command !== undefined) {
      console.info("Executing command for fivem template")
      execSync(fivemTemplates[fivemFramework].command, {
        cwd: cwd,
        ...verboseExecSettings
      })
    }

    if (uiTemplates[uiFramework].command !== undefined) {
      console.info("Executing command for ui template")
      execSync(uiTemplates[uiFramework].command, {
        cwd: cwd,
        ...verboseExecSettings
      })
    }
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
