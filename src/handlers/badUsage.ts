import { commands } from "../utils/data.js"

export const badUsageHandler = () => {
  console.warn("You seem to have used a command that doesnt exist.")
  console.log("Command list:")
  console.table(Object.keys(commands))
}
