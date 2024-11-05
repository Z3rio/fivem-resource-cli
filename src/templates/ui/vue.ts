import { UIFramework } from "../../utils/types.js";
import vueFiles from "../../files/ui/vue/index.js";

const data: UIFramework = {
  label: "Vue",
  actions: [
    {
      type: "command",
      list: [
        {
          js: "npm create vite@latest ui -- --template vue",
          ts: "npm create vite@latest ui -- --template vue-ts",
        }
      ]
    },
    {
      type: "file",
      list: vueFiles
    }
  ],
};

export default data;
