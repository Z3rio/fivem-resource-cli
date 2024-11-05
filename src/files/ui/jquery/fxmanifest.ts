import { File } from "../../../utils/types";

const data: File = {
  name: "fxmanifest.lua",
  content: `files({
    "html/index.html",
    "html/script.js",
    "html/style.css"
})

ui_page("html/index.html")`,
  comment: "UI"
};

export default data;
