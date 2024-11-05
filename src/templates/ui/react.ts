import { UIFramework } from "../../utils/types.js";
import reactFiles from "../../files/ui/react/index.js";

const data: UIFramework = {
  label: "React",
  commands: {
    js: "npm create vite@latest ui -- --template react",
    ts: "npm create vite@latest ui -- --template react-ts",
  },
  files: [...reactFiles]
};

export default data;
