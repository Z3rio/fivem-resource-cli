import { File } from "../../../utils/types"

const data: File = {
  name: "fxmanifest.lua",
  content:
    `fx_version "cerulean
game "gta5"

shared_scripts {
    "config.lua"
}

server_scripts {
    "server/functions.lua",
    "server/main.lua"
}

client_scripts {
    "client/functions.lua",
    "client/main.lua"
}`
}

export default data
