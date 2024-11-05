import { UIFramework } from "../../utils/types.js";
import vueFiles from "../../files/ui/vue/index.js";

const data: UIFramework = {
  label: "Vue",
  commands: {
    js: "npm create vite@latest ui -- --template vue",
    ts: "npm create vite@latest ui -- --template vue-ts",
  },
  files: [...vueFiles]
};

export default data;
