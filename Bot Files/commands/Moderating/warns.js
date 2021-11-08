const { time,SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Lets you view a users warns.")
    .addUserOption(option =>
        option       
        .setName("user")
        .setDescription("The user's warns you would like to view.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember("user") || interaction.member
        await interaction.client.openBank(member)
        const data = await interaction.client.db.users.findOne({memberId: member.id})
        const warns = data.warns
        if(warns.length == 0) return await interaction.reply("This user has no warns.")
        let m = ""
        for (warn of warns) {
            m += `Warn ${warn.count} - Reason: ${warn.reason}. Moderator: ${interaction.client.users.resolve(warn.author).tag}. When: ${time(warn.date,"F")}\n`
        }
        m = m || "This user has no warns."
        return await interaction.reply(m)
    }
}