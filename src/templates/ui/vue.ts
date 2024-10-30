import { UIFramework } from "../../utils/types.js";
import vueFiles from "../../files/ui/vue/index.js";

const data: UIFramework = {
  label: "Vue",
  command: "npm create vite@latest ui -- --template vue",
  files: [...vueFiles]
};

export default data;
