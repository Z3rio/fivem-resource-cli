import { FiveMTemplate } from "../../utils/types.js";
import esx from "./esx.js";
import qbcore from "./qbcore.js";
import standalone from "./standalone.js";

const list: Record<string, FiveMTemplate> = {
  qbcore: qbcore,
  esx: esx,
  standalone: standalone
};

export default list;
