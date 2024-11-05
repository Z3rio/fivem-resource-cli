import { UIFramework } from "../../utils/types.js";
import reactFiles from "../../files/ui/react/index.js";

const data: UIFramework = {
  label: "React",
  actions: [
    {
      type: "command",
      list: [
        "npm install -g create-vite@latest",
        {
          js: "npm create vite@latest ui -- --template react",
          ts: "npm create vite@latest ui -- --template react-ts"
        }
      ],
      quiet: true
    },
    {
      type: "file",
      list: reactFiles
    },
    {
      type: "action",
      name: "refactorViteCfg"
    }
  ]
};

export default data;
