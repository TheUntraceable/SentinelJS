const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("toggle")
    .setDescription("Toggle a command on or off.")
    .setDefaultPermission(false)
    .addStringOption(option =>  
        option
        .setName("command")
        .setDescription("The command you would like to toggle.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const optionCommand = interaction.options.getString("command")
        const command = interaction.client.commands.get(optionCommand)
        if (!command) {
            return await interaction.reply("")
        }
    }
}