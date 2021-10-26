const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Lets you buy an item from the shop")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to buy.")
        .setRequired(false)
        .addChoice("kids","kids")
        .addChoice("water gun","water gun")
        .addChoice("durex","durex")
        ),
    implemented: false
}