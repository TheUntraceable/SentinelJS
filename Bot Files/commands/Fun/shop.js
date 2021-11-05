const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

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
        const embed = new MessageEmbed.setTitle("Shop items").setDescription("This is the shop, you can buy many things here...").seColour("#51ff00")
        for(item of mainshop) {
            embed.addField(item.name,`${item.price}${interaction.client.config.cash_emoji} | ${item.description}`,true)
        }




        
        const item = interaction.options.getString("item")
        if (item == "kids") {
            await interaction.reply(`You can buy kids for 500${interaction.client.config.cash_emoji}.`)

        } else if (item == "water gun") {
            await interaction.reply(`You can buy a water gun for 250${interaction.client.config.cash_emoji}.`)
            
        } else if (item == "durex") {
            await interaction.reply(`You can buy some durex for 150${interaction.client.config.cash_emoji}.`)
        
        } else {
            await interaction.reply({embeds: [embed]})

        }
    }
}