import { File } from "../../../utils/types";

import clientFunctions from "./clientFunctions"
import clientMain from "./clientMain"
import fxmanifest from "./fxmanifest"
import serverFunctions from "./serverFunctions"
import serverMain from "./serverMain"

const files: File[] = [
  clientFunctions,
  clientMain,
  fxmanifest,
  serverFunctions,
  serverMain
]

export default files
