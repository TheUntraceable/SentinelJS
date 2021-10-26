const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("member-update-logs")
    .setDescription("Set the channel where I should send logs regarding member updates.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding member updates.")
        .setRequired(false)
        ),
    implemented : false
}