const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("passive")
    .setDescription("Turns on or off passive mode.")
    .addBooleanOption(option =>
        option
        .setName("mode")
        .setDescription("What to set your passive mode to.")
        .setRequired(true)
        ),
    implemented: false
}