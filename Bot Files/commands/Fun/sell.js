const { SlashCommandBuilder } = require("@discordjs/builders")

const mainshop = [{"id" : 1,"name":"Durex","price":100,"Description":"Durex | Good Protection."},
            {"id" : 2,"name":"Kids", "price":10, "Description": "Kids | Good ~~slaves~~ kids."},
            {"id" : 3,"name" : "Water gun", "price" : 100, "Description": "A water gun! (This update I made a use command)"}
           ]

async function sellItems(interaction) {
    const wantedItem = interaction.options.getString("item");
    const amount = interaction.options.getInteger("amount")
    const data = await interaction.client.db.users.findOne({memberId: interaction.member.id})
    
    for(item of mainshop) {
        if (item.name == wantedItem) { // wantedItem is just a string
            
            if (amount > item.amount) {
                return await interaction.reply(`You only have ${item.amount} ${item.name} to sell. Not ${amount}.`)
            }

            if(data.inventory.find(i => i.name == item.name) != undefined) { // If the item is in their inventory
                data.inventory[data.inventory.indexOf(item)].amount -= amount
                await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet + amount * item.price, inventory: data.inventory}})
                return await interaction.reply(`You sold ${wantedItem} x${amount}. You now have ${data.inventory[data.inventory.indexOf(item)].amount}`)
            } else {
                data.inventory.splice(data.inventory.indexOf(item), 1)
                await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet + amount * item.price, inventory: data.inventory}})
                return await interaction.reply(`You sold ${wantedItem} x${amount}.`)

            }
        }
    } 
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Allows you to sell an item.")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to view.")
        .setRequired(true)
        .addChoice("kids","kids")
        .addChoice("water gun","water gun")
        .addChoice("durex","durex")
        )
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of this item you'd like to sell.")
        .setRequired(true)
        ),
    async execute(interaction) {
        await sellItems(interaction)       
    }
}