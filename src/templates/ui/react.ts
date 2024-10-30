import { UIFramework } from "../../utils/types";
import reactFiles from "../../files/ui/react"

const data: UIFramework = {
  label: "React",
  command: "npm create vite@latest ui -- --template react",
  files: [
    ...reactFiles
  ]
}

export default data
