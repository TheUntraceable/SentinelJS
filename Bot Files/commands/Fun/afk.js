const { time,SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Alerts anyone that mentions you that you are AFK.")
    .addStringOption(option=>
        option
        .setName("reason")
        .setDescription("The reason you are going to be AFK")
        .setRequired(false)
        ),
    async execute(interaction) {
        const data = await interaction.client.db.afk.findOne({owner: interaction.user.id})
        if(!data) {
            await interaction.client.db.afk.deleteOne({owner: interaction.user.id})
            return await interaction.reply(`${interaction.user.tag} is back from being AFK! They were AFK for ${time(data.when,"R")}`)
        }
        const reason = interaction.options.getString("reason") || "No reason was provided."
        await interaction.client.db.afk.insertOne({owner: interaction.member.id, where: interaction.guild.id, when: interaction.createdTimestamp * 1000, reason: reason})
        return await interaction.reply(`${interaction.user.tag} is AFK.\nReason: ${reason}`)
    }
}