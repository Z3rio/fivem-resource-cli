import uiTemplates from "../templates/ui/index.js";
import fivemTemplates from "../templates/fivem/index.js";

const handler = () => {
  console.log("Available FiveM templates:");
  console.table(Object.keys(fivemTemplates));

  console.log("Available UI templates:");
  console.table(Object.keys(uiTemplates));
};

export default handler
