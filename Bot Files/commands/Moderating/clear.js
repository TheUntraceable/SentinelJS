const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deleted an amount of messages")
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of messages you would like to have deleted in chat.")
        .setRequired(true)
        )
    .addUserOption(option =>
        option
        .setName("author")
        .setDescription("The author of the messages. This will only let messages sent by this user are deleted.")
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName("regex")
        .setDescription("The regex the messages must match in order to be deleted.")
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName("string")
        .setDescription("The string which must be included within the messages in order to be deleted.")
        .setRequired(false)
        )
    .addRoleOption(option =>
        option
        .setName("role")
        .setDescription("The role that the author of the messages must have in order to be deleted.")
        .setRequired(false)
        ),
    implemented: false
}