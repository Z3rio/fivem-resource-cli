import { UIFramework } from "../../utils/types.js";
import jqueryFiles from "../../files/ui/jquery/index.js";

const data: UIFramework = {
  label: "Jquery",
  actions: [
    {
      type: "file",
      list: jqueryFiles
    }
  ]
};

export default data;
