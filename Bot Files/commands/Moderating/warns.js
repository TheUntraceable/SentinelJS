const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Lets you view a users warns.")
    .addUserOption(option =>
        option       
        .setName("user")
        .setDescription("The user's warns you would like to view.")
        .setRequired(false)
        ),
    implemented: false
}