const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("suspicious-account-logs")
    .setDescription("Set the channel where I should send logs regarding suspicious accounts.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding suspicious accounts.")
        .setRequired(false)
        ),
    implemented : false
}