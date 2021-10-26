const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Lets your rob a user.")
    .addUserOption(option =>
        option
        .setName("victim")
        .setDescription("The person you would like to rob.")
        .setRequired(false)
        ),
    implemented: false
}