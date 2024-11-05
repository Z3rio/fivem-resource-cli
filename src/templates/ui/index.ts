import { UIFramework } from "../../utils/types.js";
import jquery from "./jquery.js";
import none from "./none.js";
import react from "./react.js";
import vue from "./vue.js";
import defaultJs from "./defaultJs.js";

const list: Record<string, UIFramework> = {
  vue: vue,
  react: react,
  defaultJs: defaultJs,
  jquery: jquery,
  none: none
};

export default list;
