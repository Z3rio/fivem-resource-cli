import { Addon, File } from "../../../utils/types.js";

const files: File[] = [
  {
    name: "fxmanifest.lua",
    content: `shared_scripts({
    "shared/locale.lua",
    "locales/*.lua"
})`,
    comment: "Addon: Locales",
  },
  {
    name: "shared/locale.lua",
    content: `Locales = {}`
  },
  {
    name: "locales/en.lua",
    content: `Locales["en"] = {

}`
  },
  {
    name: "config.lua",
    content: `Config.Locale = "en"`
  }
]

export default {
  label: "Locales",
  name: "locale",
  files: files,
  checkedByDefault: true
} as Addon
