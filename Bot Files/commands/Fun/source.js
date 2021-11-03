const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Get the source of a command.")
    .addStringOption(option =>
        option
        .setName("command")
        .setDescription("The command's source you would like to retrieve.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const command = interaction.options.getString("command")
        if(!command) {
            return await interaction.reply("https://github.com/TheUntracaeble/SentinelJS")
        }
        
        const data = await interaction.client.commands.get(command)

        return await interaction.reply({ephemeral: true,content: `\`\`\`js\n${data.execute}\`\`\``})
    }
}