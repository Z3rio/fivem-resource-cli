import { FiveMTemplate } from "../../utils/types.js";
import universalFiles from "../../files/fivem/universal/index.js";

const data: FiveMTemplate = {
  label: "Standalone",
  actions: [
    {
      type: "file",
      list: universalFiles
    }
  ]
};

export default data;
