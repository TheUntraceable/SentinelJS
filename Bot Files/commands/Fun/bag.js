const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Lets you view your inventory.")
    .addUserOption(option => 
        option
        .setName("member")
        .setDescription("The user's inventory you'd like to view.")
        .setRequired(false)        
        ),
    cooldowns: new Set(),
    cooldown: 5,
    async execute(interaction) {
        const data = await interaction.client.db.users.findOne({memberId: interaction.member.id})
        const inventory = data.inventory
        if (inventory.length === 0) {
            return await interaction.reply("You don't have any items in your inventory.")
        } 
        for (item of inventory) {
            if(item.amount == 0) {
                inventory.remove(item)
                await interaction.client.db.users.updateOne({memberId: interaction.member.id}, {$pull: {inventory: {name: item.name}}})
            }
        }

        const items = inventory.map(item => `${item.name} x${item.amount}`).join("\n")

        await interaction.reply(`You have the following items in your inventory:\n${items}`)
    }
}