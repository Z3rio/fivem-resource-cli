import { Addon, File } from "../../../utils/types.js";

const files: File[] = [
  {
    name: "configs/main.lua",
    content: `Config = {}`
  },
  {
    name: "fxmanifest.lua",
    content: `shared_scripts({
    "configs/main.lua"
})`,
    comment: "Addon: Configs"
  }
];

export default {
  label: "Config",
  name: "config",
  files: files,
  checkedByDefault: true
} as Addon;
