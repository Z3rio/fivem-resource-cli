import { File } from "../../../utils/types.js";

const data: File = {
  name: "fxmanifest.lua",
  content: `files({
    "html/index.html",
    "html/assets/*.js",
    "html/assets/*.css"
})

ui_page("html/index.html") -- comment out if using dev page
-- ui_page("http://localhost:5173") -- unncomment for dev page`,
  comment: "UI"
};

export default data;
