fx_version "cerulean"
game "gta5"

shared_scripts {
    "@es_extended/imports.lua",
    "locales/*.lua",
    "@es_extended/locale.lua",
    "config.lua"
}

server_scripts {
    "server/functions.lua",
    "server/main.lua"
}

client_scripts {
    "client/functions.lua",
    "client/main.lua"
}