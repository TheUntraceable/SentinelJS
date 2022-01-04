const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to unmute.")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to unmute this user.")
        .setRequired(false)
        ),
    cooldown: 5,
    requiredPermissions: ["MODERATE_MEMBERS"],
    async execute(interaction) {

        const reason = interaction.options.getString("reason")
        const member = interaction.options.getMember("user")

        await interaction.reply(`Unmuted ${member} by ${interaction.member}. Reason: ${reason}`)
    }
}