const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Displays the current shop.")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to view.")
        .setRequired(false)
        .addChoice("kids","kids")
        .addChoice("water gun","water gun")
        .addChoice("durex","durex")
        ),
    async execute(interaction) {
        const item = interaction.getStringOption("item")
        if (item == "kids") {
            interaction.reply(`You can buy kids for 500${interaction.client.config.cash_emoji}.`)

        } else if (item == "water gun") {
            interaction.reply(`You can buy some durex for 150${interaction.client.config.cash_emoji}.`)
        
        } else if (item == "durex") {
            interaction.reply(`You can buy a water gun for 250${interaction.client.config.cash_emoji}.`)
        
        } else {
            interaction.reply(`You can buy a water gun for 250${interaction.client.config.cash_emoji}.\nYou can buy some durex for 150${interaction.client.config.cash_emoji}.\nYou can buy kids for 500${interaction.client.config.cash}.`)

        }
    }
}