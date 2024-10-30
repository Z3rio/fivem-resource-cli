import { File } from "../../../utils/types.js";

const data: File = {
  name: "client/main.lua",
  content: `-- PlayerData management
local PlayerData = QBCore.Functions.GetPlayerData()

RegisterNetEvent("QBCore:Client:OnPlayerLoaded")
AddEventHandler("QBCore:Client:OnPlayerLoaded", function()
    PlayerData = QBCore.Functions.GetPlayerData()
end)

RegisterNetEvent("QBCore:Client:OnPlayerUnload")
AddEventHandler("QBCore:Client:OnPlayerUnload", function()
    PlayerData = nil
end)

RegisterNetEvent("QBCore:Client:OnJobUpdate")
AddEventHandler("QBCore:Client:OnJobUpdate", function(job)
    if PlayerData then
        PlayerData.job = job
    else
        PlayerData = QBCore.Functions.GetPlayerData()
    end
end)

RegisterNetEvent("QBCore:Client:SetDuty")
RegisterNetEvent('QBCore:Client:SetDuty', function(duty)
    if PlayerData.job then
        PlayerData.job.onduty = duty
    else
        PlayerData = QBCore.Functions.GetPlayerData()
    end
end)`
};

export default data;
