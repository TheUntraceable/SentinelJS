const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("member-joins")
    .setDescription("Set the channel where I should send logs regarding member joins.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding members joins.")
        .setRequired(false)
        ),
    implemented : false
}