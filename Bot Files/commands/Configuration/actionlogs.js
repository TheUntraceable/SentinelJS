const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("action-logs")
    .setDescription("Set the channel where I should send logs regarding actions.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding actions.")
        .setRequired(false)
        ),
    implemented : false
}