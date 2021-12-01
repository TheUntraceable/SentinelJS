const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw coins from your bank to your wallet account.")   
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of coins you would like to withdraw.")
        .setRequired(true)
        ),
    cooldown: 5,
    async execute(interaction) {
        const data = await interaction.client.db.users.findOne({memberId: interaction.user.id})
        const amount = interaction.options.getInteger("amount")
        
        if(data.bank < amount) {
            return await interaction.reply(`You do not have that much money in your bank! You only have ${data.bank}${interaction.client.config.cash_emoji}`)
        
        }

        await interaction.client.db.users.updateOne({memberId: interaction.user.id},{$inc : {wallet: amount, bank: -amount}})
        
        console.log(amount)

        await interaction.reply(`I have withdrawn ${amount} for you to your wallet. You now have ${data.wallet + amount}${interaction.client.config.cash_emoji} in your wallet.`)


    }
}