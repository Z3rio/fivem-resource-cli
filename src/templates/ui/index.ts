import { UIFramework } from "../../utils/types"
import jquery from "./jquery"
import none from "./none"
import react from "./react"
import vue from "./vue"
import defaultJs from "./defaultJs"

const list: Record<string, UIFramework> = {
  defaultJs: defaultJs,
  jquery: jquery,
  none: none,
  react: react,
  vue: vue
}

export default list;
