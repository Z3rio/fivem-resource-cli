import { UIFramework } from "../../utils/types.js";
import reactFiles from "../../files/ui/react/index.js";

const data: UIFramework = {
  label: "React",
  command: "npm create vite@latest ui -- --template react",
  files: [...reactFiles]
};

export default data;
