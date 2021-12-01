const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows your or a users balance.")
    .addUserOption(option =>
        option
        .setName("member")
        .setDescription("The member's balance you would like to see.")
        .setRequired(false)
        ),
    cooldown: 5,
    cooldowns: new Set(),
    cooldown: 5,
    async execute(interaction) {
        await interaction.client.openBank(interaction.member)
        const member = interaction.options.getMember("member") == null ? interaction.member : interaction.options.getMember("member")
        let data = await interaction.client.db.users.findOne({memberId: member.id})

        // Let's format this data

        const embed = new MessageEmbed()
            .setTitle(`${member.displayName}'s balance.`)
            .addFields([
                {
                    name: "Wallet",
                    value: `**\`${data.wallet.toString()}\`**`,
                    inline: true
                }, {
                    name: "Bank",
                    value: `**\`${data.bank.toString()}\`**/**\`${data.maxBank.toString()}\`**`,
                    inline: true
                }, {
                    name: "Passive?",
                    value: `**\`${data.passive.toString()}\`**`,
                    inline: true
                } 
            ])
        await interaction.reply({embeds: [embed]})
    }
}