-- Compatibility for old ESX versions
if ESX == nil then
    TriggerEvent("esx:getSharedObject", function(obj) ESX = obj end)
end

Functions = {

}