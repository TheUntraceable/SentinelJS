const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit coins from your wallet to your bank account.")   
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of coins you would like to deposit.")
        .setRequired(true)
        ),
    implemented: false
}