const { SlashCommandBuilder } = require("@discordjs/builders")

const mainshop = [
    {id : 1,name:"Durex",price:100,description:"Durex | Good Protection."},
    {id : 2,name:"Kids", price:10, description: "Kids | Good kids."},
    {id : 3,name : "Water gun", price : 100, description: "A water gun! (This update I made a use command)"}
           ]


module.exports = {
    data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Lets you buy an item from the shop")
    .addStringOption(option => 
        option
        .setName("item")
        .setDescription("The item you would like to buy.")
        .setRequired(true)
        .addChoice("kids","kids")
        .addChoice("water gun","water gun")
        .addChoice("durex","durex")
        )
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of items you want to buy")
        .setRequired(true)
        ),
    async execute(interaction) {
        const wantedItem = interaction.options.getString("item");
        const amount = interaction.options.getInteger("amount")
        const data = await interaction.client.db.users.findOne({memberId: interaction.member.id})
        
        for(item of mainshop) {
            if (item.name.toLowerCase() == wantedItem) { // wantedItem is just a string
                
                if (data.money < item.price * amount) {
                    return await interaction.reply(`That item costs ${item.price}${interaction.client.config.cash_emoji} and you only have ${data.wallet}${interaction.client.config.cash_emoji}.`)
                }
                const wantedItemData = data.inventory.find(i => i.name == item.name)
                if(wantedItemData != undefined) { // If the item is in their inventory
                    data.inventory[data.inventory.indexOf(wantedItemData)].amount += amount
                    await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet - item.price, inventory: data.inventory}})
                    return await interaction.reply(`You bought ${wantedItem} x${amount}. You now have ${data.inventory[data.inventory.indexOf(wantedItemData)].amount}`)
                } else {
                    data.inventory.push({name: item.name, amount: amount})
                    await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$set: {wallet: data.wallet - item.price, inventory: data.inventory}})
                    return await interaction.reply(`You bought ${wantedItem} x${amount}.`)
                }
            }
        }
    }
}
