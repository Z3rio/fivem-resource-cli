import { readdirSync } from "fs"
import path from "path"
import pc from "picocolors"
import { CommandHandler } from "../utils/types"

const handler: CommandHandler = (args) => {
  console.info("")
  console.warn("We couldnt find the command: " + pc.italic(args._.join(" ")))
  console.info("")
  console.info(pc.blueBright(pc.bold("Command list")))
  const commands = readdirSync(path.join(import.meta.dirname, "../handlers/"))

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i]

    if (!cmd.includes(".map")) {
      console.info(`- ${pc.italic(cmd.slice(0, -3))}`)
    }
  }
}

export default handler
