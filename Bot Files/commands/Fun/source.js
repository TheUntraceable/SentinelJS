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
        )
    .addStringOption(option =>
        option
        .setName("type")
        .setDescription("The type of file this is.")
        .setRequired(false)
        .addChoices({name: 'event', value: 'events'})
        .addChoices({name: 'helper', value: 'helpers'})
        .addChoices({name: 'command', value: 'commands'})
        ),
    async execute(interaction) {
        const command = interaction.options.getString("command")

        if(!command) {
            return await interaction.reply("https://github.com/TheUntracaeble/SentinelJS")
        }
        
        const type = interaction.options.getString('type') || 'commands'
        const data = await interaction.client.commands.get(command)

        if(!data) return await interaction.reply({ephemeral: true, content: "That command does not exist."})

        return await interaction.reply({ephemeral: true,content: `\`\`\`js\n${data.execute}\`\`\`\nhttps://github.com/TheUntraceable/SentinelJS/tree/master/Bot%20Files/${type}/${data.category}/${data.data.name}.js`})
    }
}