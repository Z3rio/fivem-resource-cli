import { FiveMTemplate } from "../../utils/types.js";
import universalFiles from "../../files/fivem/universal/index.js";
import qbcoreFiles from "../../files/fivem/qbcore/index.js";

const data: FiveMTemplate = {
  label: "QBCore",
  actions: [
    {
      type: "file",
      list: qbcoreFiles
    },
    {
      type: "file",
      list: universalFiles
    }
  ]
};

export default data;
