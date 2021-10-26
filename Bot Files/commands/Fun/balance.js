const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows your or a users balance.")
    .addUserOption(option =>
        option
        .setName("member")
        .setDescription("The member's balance you would like to see.")
        .setRequired(false)
        ),
    implemented: false
}