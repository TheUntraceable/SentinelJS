const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("howsmart")
    .setDescription("See how smart someone is.")
    .addUserOption(option => 
        option
        .setName("member")
        .setDescription("The member you want to see's intelligence.")
        .setRequired(false)
        ),
    implemented: false
}