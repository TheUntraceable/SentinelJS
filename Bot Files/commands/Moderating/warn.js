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
        await interaction.client.openBank(member)
        const data = await interaction.client.db.users.findOne({memberId: member.id})

        if(interaction.member.roles.highest >= member.roles.highest && !interaction.member.id == interaction.guild.ownerId) {
            return interaction.reply("You can't warn this user due to role hierarchy.")
        } else if(member.bot) {
            return await interaction.reply("Why are you warning a bot? Warning a bot doesn't make sense.")
        } else if(member.id == interaction.guild.ownerId) {
            return await interaction.reply("You cannot warn the guild owner...")
        }

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
