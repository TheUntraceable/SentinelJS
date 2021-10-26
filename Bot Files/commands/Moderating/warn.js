const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to warn.")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to warn this user.")
        .setRequired(true)
        ),
    implemented: false
}