const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("theuntraceable-only")
    .setDefaultPermission(false)
    .setDescription("Makes a command only available to The Untraceable.")
    .addStringOption(option =>
        option
        .setName("name")
        .setDescription("The command you would like to make only available to you.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString("name")
        
        if(!interaction.client.application?.owner) await interaction.client.application?.fetch()

        if(interaction.client.application?.owner?.id !== interaction.author.id) {
            interaction.reply("You are not the owner of this bot.")
            return
        }

        const command = interaction.client.commands.get(name)

        if(!command) return await interaction.reply("Invalid command.")

        command.enabled = command.enabled ? false : true

        await interaction.reply(`Command ${command.enabled ? "enabled" : "disabled"}.`)
    }
}