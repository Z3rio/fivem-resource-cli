import { execSync } from "child_process"
import { commentStart, verboseExecSettings, viteCfgAdjustmentLines } from "./data.js"
import { Action, File, FileList, QuickAction } from "./types.js"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import pc from "picocolors"

export const actionList: Record<string, QuickAction> = {
  refactorViteCfg: ({ projPath, uiLanguage }) => {
    const viteCfgFileName = path.join(projPath, "ui", `vite.config.${uiLanguage ?? 'js'}`)
    const viteData = readFileSync(viteCfgFileName)
    const lines = viteData.toString().split(/\r?\n|\r|\n/g)
    const dataStart = lines.findIndex((v) => v.indexOf("defineConfig") !== -1 && v.indexOf("import") === -1) + 1

    if (dataStart === 0) {
      console.warn(pc.bold("refactorViteCfg: ") + "Couldnt find defineConfig in the vite config.")
      return false
    }

    const finalLines = [
      ...lines.slice(0, dataStart),
      ...viteCfgAdjustmentLines,
      ...lines.slice(dataStart, lines.length)
    ]

    writeFileSync(viteCfgFileName, finalLines.join("\r\n"))

    return true
  }
}

export function convertFiles(files: File[]): FileList {
  const retVal: FileList = {}

  for (let i = 0; i < files.length; i++) {
    const v = files[i]
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
      let curr = retVal

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
          curr[v2] = curr[v2] + "\r\n\r\n" + content
        }
      } else if (!(v2 in curr)) {
        curr[v2] = {}
      }

      pastPathChecks.push(v2)
    }
  }

  return retVal
}

export function handleActions(actions: Action[], projPath: string, projName: string, uiLanguage: undefined | "js" | "ts") {
  for (let i = 0; i < actions.length; i++) {
    const v = actions[i]

    switch (v.type) {
      case "command":
        for (let i2 = 0; i2 < v.list.length; i2++) {
          const v2 = v.list[i2]
          if (typeof v2 == "string") {
            execSync(v2, {
              cwd: projPath,
              ...verboseExecSettings
            })
          } else if (uiLanguage !== undefined) {
            execSync(v2[uiLanguage], {
              cwd: projPath,
              ...verboseExecSettings
            })
          }
        }
        break;
      case "file":
        createFiles(convertFiles(v.list), projPath, projName)
        break;
      case "action":
        if (v.name in actionList) {
          actionList[v.name]({
            projName,
            uiLanguage,
            projPath
          })
        } else {
          console.warn(`Couldnt find action named ${pc.italic(v.name)}`)
        }
        break;
    }
  }
}

export function createFiles(data: FileList, projPath: string, projName: string, pathList?: string[]) {
  if (pathList === undefined) {
    pathList = []
  }

  for (const key in data) {
    if (typeof data[key] === "string") {
      console.info(`Creating file: ./${projName}/${pathList.length > 0 ? `${pathList.join("/")}/` : ""}${key}`)
      const filePath = path.join(projPath, ...pathList, key)
      if (existsSync(filePath)) {
        data[key] = readFileSync(filePath) + "\r\n\r\n" + data[key]
      }
      writeFileSync(filePath, data[key])
    } else {
      const dirPath = path.join(projPath, ...pathList, key)

      if (!existsSync(dirPath)) {
        mkdirSync(dirPath)
      }
      createFiles(data[key], projPath, projName, [...pathList, key])
    }
  }
}
