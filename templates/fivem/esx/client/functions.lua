-- Compatibility for old ESX versions
if ESX == nil then
    Citizen.CreateThread(function()    
        while ESX == nil do 
            TriggerEvent("esx:getSharedObject", function(obj) ESX = obj end)
            Citizen.Wait(500)
        end
    end)
end

Functions = {
    
}