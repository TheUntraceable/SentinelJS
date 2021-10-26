const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to unmute.")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to unmute this user.")
        .setRequired(false)
        ),
    implemented: false
}