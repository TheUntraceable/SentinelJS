const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("use")
    .setDescription("Use an item.")
    .addStringOption(option =>
        option
        .setName("item")
        .setDescription("The item you would like to use. Make sure that this is in your ")
        .setRequired(true)
        .addChoice("durex","durex")
        .addChoice("kids","kids")
        .addChoice("water gun","water gun")
        ),
    // in 1.0.1.
}