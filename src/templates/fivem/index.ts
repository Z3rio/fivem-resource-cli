import { FiveMTemplate } from "../../utils/types"
import esx from "./esx"
import qbcore from "./qbcore"
import standalone from "./standalone"

const list: Record<string, FiveMTemplate> = {
  qbcore: qbcore,
  esx: esx,
  standalone: standalone,
}

export default list;
