import { FiveMTemplate } from "../../utils/types";
import universalFiles from "../../files/fivem/universal"
import esxFiles from "../../files/fivem/esx"

const data: FiveMTemplate = {
  label: "ESX",
  files: [
    ...universalFiles,
    ...esxFiles
  ]
}

export default data
