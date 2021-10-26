const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Alerts anyone that mentions you that you are AFK.")
    .addStringOption(option=>
        option
        .setName("reason")
        .setDescription("The reason you are going to be AFK")
        .setRequired(false)
        ),
    implemented : false
}