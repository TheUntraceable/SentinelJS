const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-warn")
    .setDescription("Remove a warn from a user.")
    .addUserOption(option => 
        option
        .setName("user")
        .setDescription("The user's warn you would like to remove")
        .setRequired(true)
        )
    .addIntegerOption(option =>
        option
        .setName("id")
        .setDescription("The Id of the war you'd like to delete. If this is not set, al warns will be deleted.")
        .setRequired(false)
        )
}