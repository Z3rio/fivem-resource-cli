import { Addon, File } from "../../../utils/types.js";

const files: File[] = [
  {
    name: "server/versionchecker.lua",
    content: `local rawFileLink = "$\{rawLink}"
local currVersion = GetResourceMetadata(GetCurrentResourceName(), "version", 0)
if currVersion == nil then
  warn("Failed to find script version")
end

PerformHttpRequest(
  rawFileLink,
  function(code, newestVersion, headers)
    if code == 200 then
      if tostring(currVersion) == tostring(newestVersion) then
        print("The script is up to date")
      else
        print(
          "The script has updated. You are on version "
            .. tostring(currVersion)
            .. ", the newest version is "
            .. tostring(newestVersion)
        )
      end
    else
      print("Failed to fetch current version")
    end
  end,
  "GET"
)`,
    values: [
      {
        name: "rawLink",
        label: "Raw URL for Version Value"
      }
    ]
  },
  {
    name: "fxmanifest.lua",
    content: `server_scripts({
    "server/versionchecker.lua"
})`,
    comment: "Addon: Version Checker"
  }
];

export default {
  label: "Version Checking",
  name: "versionchecking",
  files: files
} as Addon;
