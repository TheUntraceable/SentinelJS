const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")

const mainshop = [
    {id : 1,name:"Durex",price:100,description:"Durex | Good Protection."},
    {id : 2,name:"Kids", price:10, description: "Kids | Good kids."},
    {id : 3,name : "Water gun", price : 100, description: "A water gun! (This update I made a use command)"}
           ]

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Displays the current shop.")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to view.")
        .setRequired(false)
        .addChoices({name: "kids", value: "kids"})
        .addChoices({name: "water gun", value: "water gun"})
        .addChoices({name: "durex", value: "durex"})
        ),
    cooldown: 15,
    async execute(interaction) {
        const embed = new EmbedBuilder().setTitle("Shop items").setDescription("This is the shop, you can buy many things here...").setColor(0x2F3136)
        const wantedItem = interaction.options.getString("item")
        
        if(!wantedItem) {
            for(item of mainshop) {
                embed.addField(item.name,`${item.price}${interaction.client.config.cash_emoji} | ${item.description}`,true)
            }
            return await interaction.reply({embeds: [embed]})
        }

        if (wantedItem == "kids") {
            await interaction.reply(`You can buy kids for 500${interaction.client.config.cash_emoji}.`)

        } else if (wantedItem == "water gun") {
            await interaction.reply(`You can buy a water gun for 250${interaction.client.config.cash_emoji}.`)
            
        } else if (wantedItem == "durex") {
            await interaction.reply(`You can buy some durex for 150${interaction.client.config.cash_emoji}.`)
        
        }
    }
}