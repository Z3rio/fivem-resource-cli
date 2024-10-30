import { templatesHandler, helpHandler, newHandler } from "./handlers"

const commands: Record<string, () => void> = {
  templates: templatesHandler,
  help: helpHandler,
  new: newHandler
}

const argv = process.argv.slice(2)[0]

if (commands[argv]) {
  commands[argv]()
} else {
  commands.help();
}
