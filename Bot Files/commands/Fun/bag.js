const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Lets you view your inventory."),

    implemented: false
}