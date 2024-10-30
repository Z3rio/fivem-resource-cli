import { FiveMTemplate } from "../../utils/types.js";
import universalFiles from "../../files/fivem/universal/index.js";
import esxFiles from "../../files/fivem/esx/index.js";

const data: FiveMTemplate = {
  label: "ESX",
  files: [...universalFiles, ...esxFiles]
};

export default data;
