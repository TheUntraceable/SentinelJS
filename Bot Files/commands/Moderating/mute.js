const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes someone.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to mute.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to mute this user.")
        .setRequired(false)
        ),
    implemented: false
}