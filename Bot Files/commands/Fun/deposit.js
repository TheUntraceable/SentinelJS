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
    cooldown: 5,
    async execute(interaction) {
        const data = await interaction.client.db.users.findOne({memberId: interaction.user.id})
        const amount = interaction.options.getInteger("amount")
        
        if(data.wallet < amount) {
            return await interaction.reply(`You do not have that much money in your wallet! You only have ${data.wallet}${interaction.client.config.cash_emoji}`)
        
        } else if(data.maxBank < amount + data.bank) {
            return await interaction.reply(`You can't fit that much money in your bank! You only have space for ${data.maxBank}${interaction.client.config.cash_emoji}, not ${amount + data.bank}${interaction.client.config.cash_emoji}`)
        }

        await interaction.client.db.users.updateOne({memberId: interaction.user.id},{$inc : {wallet: -amount, bank: amount}})
        await interaction.reply(`I have deposited ${amount} for you to your bank account. You now have ${data.bank + amount}/${data.maxBank}${interaction.client.config.cash_emoji} to your bank.`)


    }
}