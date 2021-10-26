const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("Gamble your money on a slot machine.")
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount you would like to gamble.")
        .setRequired(true)
    ),
    implemented: false

}