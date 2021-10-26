const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send coins to a user's wallet.")
    .addUserOption(option => 
        option
        .setName("member")
        .setDescription("The user you would like to send coins to.")
        .setRequired(true)
        )   
}