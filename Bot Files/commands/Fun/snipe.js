const { SlashCommandBuilder } = require("@discordjs/builders")
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Get's the latest deleted/edited message.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Which channel you would like to get the latest deleted/edited message.")
        .setRequired(false)
    ),
    implemented : false
}