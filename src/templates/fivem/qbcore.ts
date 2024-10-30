import { FiveMTemplate } from "../../utils/types";
import universalFiles from "../../files/fivem/universal"
import qbcoreFiles from "../../files/fivem/qbcore"

const data: FiveMTemplate = {
  label: "QBCore",
  files: [
    ...universalFiles,
    ...qbcoreFiles
  ]
}

export default data
