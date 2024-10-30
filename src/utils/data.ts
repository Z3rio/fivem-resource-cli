import { templatesHandler, helpHandler, newHandler } from "../handlers/index.js"

export const commands: Record<string, () => void> = {
  templates: templatesHandler,
  help: helpHandler,
  new: newHandler
}
