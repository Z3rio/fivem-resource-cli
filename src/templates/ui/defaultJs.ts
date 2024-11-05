import { UIFramework } from "../../utils/types.js";
import defaultJsFiles from "../../files/ui/defaultjs/index.js";

const data: UIFramework = {
  label: "Default JS",
  actions: [
    {
      type: "file",
      list: defaultJsFiles
    }
  ]
};

export default data;
