const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server.")
    .addIntegerOption(option => 
        option
        .setName("id")
        .setDescription("The Id of the user you would like to unban")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Why you would like to unban this user.")
        .setRequired(false)
    ),
    implemneted: false
}