Citizen.CreateThread(function()
    -- PlayerData management
    local PlayerData = ESX.GetPlayerData()

    RegisterNetEvent('esx:playerLoaded')
    AddEventHandler('esx:playerLoaded', function(xPlayer)
        PlayerData = xPlayer
    end)
end)