const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("anti-spammer")
    .setDescription("Turns on or off AntiSpammer."),
    implemented : false
}
