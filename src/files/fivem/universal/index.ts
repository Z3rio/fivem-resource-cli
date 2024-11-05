import { File } from "../../../utils/types.js";

import clientFunctions from "./clientFunctions.js";
import clientMain from "./clientMain.js";
import fxmanifest from "./fxmanifest.js";
import serverFunctions from "./serverFunctions.js";
import serverMain from "./serverMain.js";

const files: File[] = [
  clientFunctions,
  clientMain,
  fxmanifest,
  serverFunctions,
  serverMain
];

export default files;
