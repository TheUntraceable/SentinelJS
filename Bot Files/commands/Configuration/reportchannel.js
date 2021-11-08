const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("report-channel")
    .setDescription("Sets the channel to send reports to.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("The channel where to send reports.")
        .setRequired(false)
        ),
    async execute(interaction) {

        const channel = interaction.options.getChannel("channel") || false;

        await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id},{$set: {reportChannel: channel}});
        await interaction.reply(`I will now send reports to ${channel}.`)
    }

}