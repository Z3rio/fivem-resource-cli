import { UIFramework } from "../../utils/types.js";
import vueFiles from "../../files/ui/vue/index.js";

const data: UIFramework = {
  label: "Vue",
  actions: [
    {
      type: "command",
      list: [
        "npm install -g create-vite@latest",
        {
          js: "npm create vite@latest ui -- --template vue",
          ts: "npm create vite@latest ui -- --template vue-ts"
        }
      ],
      quiet: true
    },
    {
      type: "file",
      list: vueFiles
    },
    {
      type: "action",
      name: "refactorViteCfg"
    }
  ]
};

export default data;
