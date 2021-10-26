const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("message-logs")
    .setDescription("Set the channel where I should send logs regarding messages.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding messages.")
        .setRequired(false)
        ),
    implemented : false
}