import { File } from "../../../utils/types.js";

const data: File = {
  name: "server/functions.ts",
  content: `-- Compatibility for old ESX versions
if ESX == nil then
    TriggerEvent("esx:getSharedObject", function(obj) ESX = obj end)
end`
};

export default data;
