import uiTemplates from "../templates/ui/index.js";
import fivemTemplates from "../templates/fivem/index.js";
import pc from "picocolors";
import { CommandHandler } from "../utils/types.js";

const handler: CommandHandler = () => {
  console.info("");
  console.info(pc.blueBright(pc.bold("FiveM templates")));

  for (const key in fivemTemplates) {
    const v = fivemTemplates[key];

    console.info(`- ${pc.italic(v.label)}`);
  }

  console.info("");
  console.info(pc.bold("----"));
  console.info("");

  console.info(pc.blueBright(pc.bold("UI templates")));

  for (const key in uiTemplates) {
    const v = uiTemplates[key];

    console.info(`- ${pc.italic(v.label)}`);
  }
};

export default handler;
