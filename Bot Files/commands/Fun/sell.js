const { SlashCommandBuilder } = require("@discordjs/builders")

const mainshop = [
    {id : 1,name:"Durex",price:100,description:"Durex | Good Protection."},
    {id : 2,name:"Kids", price:10, description: "Kids | Good kids."},
    {id : 3,name : "Water gun", price : 100, description: "A water gun! (This update I made a use command)"}
           ]

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Allows you to sell an item.")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to view.")
        .setRequired(true)
        .addChoices({name: "kids", value: "kids"})
        .addChoices({name: "water gun", value: "water gun"})
        .addChoices({name: "durex", value: "durex"})
        )
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of this item you'd like to sell.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const wantedItem = interaction.options.getString("item");
        const amount = interaction.options.getInteger("amount")
        const data = await interaction.client.db.users.findOne({memberId: interaction.member.id})
        
        for(item of mainshop) {
            if (item.name.toLowerCase() == wantedItem) { // wantedItem is just a string
                
                const wantedItemData = data.inventory.find(i => i.name == item.name)
                
                if (data.inventory[data.inventory.indexOf(wantedItemData)].amount < amount || data.inventory[data.inventory.indexOf(wantedItemData)].amount == undefined) {
                    return await interaction.reply(`You cannot sell ${amount} ${wantedItem} because you only have ${data.inventory[data.inventory.indexOf(wantedItemData)].amount}.`)
                }

                if(wantedItemData != undefined) { // If the item is in their inventory
                    data.inventory[data.inventory.indexOf(wantedItemData)].amount -= amount
                    await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet + item.price * amount, inventory: data.inventory}})
                    return await interaction.reply(`You sold ${wantedItem} x${amount}. You now have ${data.inventory[data.inventory.indexOf(wantedItemData)].amount}`)
                } else {
                    data.inventory.slice(data.inventory.indexOf(wantedItemData), 1)
                    await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet + item.price * amount, inventory: data.inventory}})
                    return await interaction.reply(`You sold ${wantedItem} x${amount}.`)
                }
            }
        }    }
}