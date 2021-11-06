const { SlashCommandBuilder } = require("@discordjs/builders")

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
        const warns = await interaction.client.db.users.findOne({memberId: member.id}).warns
        if(!warns) return await interaction.reply("This user has no warns.")
        let m = ""
        for (warn of warns) {
            m += `Warn: ${warn.count} - Reason: ${warn.reason}. Moderator: ${interaction.client.users.fetch(warn.author).tag}`
        }
        return await interaction.reply(m)
    }
}