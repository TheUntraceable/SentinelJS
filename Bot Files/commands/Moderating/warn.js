const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to warn.")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to warn this user.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const reason = interaction.options.getString("reason")
        const member = interaction.options.getMember("user")
        const data = await interaction.client.db.users.findOne({memberId: member.id})
        data.warns.push({
            author: interaction.member.id,
            reason: reason,
            date: Math.floor(Date.now() / 1000),
            count: data.warns.length + 1
        })
        await interaction.client.db.users.updateOne({memberId: member.id}, {$set: {warns: data.warns}})
        await interaction.reply(`${member.displayName} has been warned for ${reason}.`)
        interaction.channel.send(`${member}, you have been warned by ${interaction.member}. Reason: ${reason}`)
    }
}
