-- Universal 
fx_version "cerulean
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
}

-- UI 
files({
    "html/index.html",
    "html/assets/*.js",
    "html/assets/*.css"
})

ui_page("html/index.html") -- comment out if using dev page
-- ui_page("http://localhost:5173") -- unncomment for dev page