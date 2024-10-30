import { UIFramework } from "../../utils/types";
import vueFiles from "../../files/ui/vue"

const data: UIFramework = {
  label: "Vue",
  command: "npm create vite@latest ui -- --template vue",
  files: [
    ...vueFiles
  ]
}

export default data
