const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("passive")
    .setDescription("Turns on or off passive mode.")
    .addBooleanOption(option =>
        option
        .setName("mode")
        .setDescription("What to set your passive mode to.")
        .setRequired(true)
        ),
    cooldown: 86400,
    cooldowns: new Set(),

    async execute(interaction) {
        const mode = interaction.options.getBoolean("mode")

        await interaction.client.db.users.updateOne({memberId: interaction.member.id},{$set : {passive: mode}})
        await interaction.reply(`I have set your passive to ${mode}.`)
    }
}