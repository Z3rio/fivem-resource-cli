import uiTemplates from "../templates/ui/index.js";
import fivemTemplates from "../templates/fivem/index.js";

export const templatesHandler = () => {
  console.log("Available FiveM templates:");
  console.table(Object.keys(fivemTemplates));

  console.log("Available UI templates:");
  console.table(Object.keys(uiTemplates));
};
