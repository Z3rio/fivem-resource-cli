import { readdirSync } from "fs"
import path from "path"
import pc from "picocolors"

const handler = () => {
  console.warn("You seem to have used a command that doesnt exist.")
  console.log("")
  console.log(pc.blueBright(pc.bold("Command list")))
  const commands = readdirSync(path.join(import.meta.dirname, "../handlers/"))

  commands.forEach((cmd) => {
    if (!cmd.includes(".map")) {
      console.log(`- ${pc.italic(cmd.slice(0, -3))}`)
    }
  })
}

export default handler
