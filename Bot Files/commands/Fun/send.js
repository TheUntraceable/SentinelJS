const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send coins to a user's wallet.")
    .addUserOption(option => 
        option
        .setName("member")
        .setDescription("The user you would like to send coins to.")
        .setRequired(true)
        )
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount you would like to send.")
        .setRequired(true)
        ),
    cooldown: 15, // Avoiding taxes..
    async execute(interaction) {
        const receiver = interaction.options.getMember("member")
        const amount = interaction.options.getInteger("amount")
        await interaction.client.openBank(receiver)

        const dataOnInvoker = await interaction.client.db.users.findOne({memberId: interaction.member.id})
        
        if(amount > dataOnInvoker.wallet) {
            return await interaction.reply(`You do not have that much money in your wallet! You only have ${dataOnInvoker.wallet}${interaction.client.config.cash_emoji}.`) // In future make it so that the money is taken out of bank if possible
        }
        await interaction.client.db.users.updateOne({memberId: receiver.id}, {$inc : {wallet: amount}})
        await interaction.client.db.users.updateOne({memberId: interaction.member.id},{$inc : {wallet: -amount}})

        return await interaction.reply(`I have given ${receiver.displayName} ${amount}${interaction.client.config.cash_emoji} for you.`)
        // Include taxes...
    }
}