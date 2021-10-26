const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw coins from your bank account to your wallet.")
    .addIntegerOption(option => 
        option
        .setName("amount")
        .setDescription("The amount of coins you would like to withdraw")
        .setRequired(true)
        ),
    implemented: false
}