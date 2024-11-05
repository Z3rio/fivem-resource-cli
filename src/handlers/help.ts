import pc from "picocolors";
import { CommandHandler } from "../utils/types.js";
import { commandList } from "../utils/data.js";

const handler: CommandHandler = args => {
  console.info("");
  console.warn("We couldnt find the command: " + pc.italic(args._.join(" ")));
  console.info("");
  console.info(pc.blueBright(pc.bold("Command list")));

  for (const cmd in commandList) {
    console.info(`- ${pc.italic(cmd)}`);
  }
};

export default handler;
