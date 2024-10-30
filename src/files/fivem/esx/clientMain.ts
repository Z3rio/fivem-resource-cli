import { File } from "../../../utils/types.js";

const data: File = {
  name: "client/main.lua",
  content: `-- PlayerData management
local PlayerData = ESX.GetPlayerData()

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    PlayerData = xPlayer
end)`
};

export default data;
