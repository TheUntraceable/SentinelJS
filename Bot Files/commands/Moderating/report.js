const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a user.")
    .addStringOption(option => 
        option
        .setName("reason")
        .setDescription("Why you would like to report them.")
        .setRequired(true)
        )
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("The user you would like to report.")
            .setRequired(false)
        ),
        implemented: false
}