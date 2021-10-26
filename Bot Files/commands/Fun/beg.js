const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for coins."),

    implemented: false
}