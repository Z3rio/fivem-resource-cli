import { UIFramework } from "../../utils/types.js";
import jquery from "./jquery.js";
import none from "./none.js";
import react from "./react.js";
import vue from "./vue.js";
import defaultJs from "./defaultJs.js";

const list: Record<string, UIFramework> = {
  defaultJs: defaultJs,
  jquery: jquery,
  none: none,
  react: react,
  vue: vue
};

export default list;
