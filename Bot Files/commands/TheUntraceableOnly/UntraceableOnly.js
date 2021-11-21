const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("theuntraceable-only")
    .setDescription("Makes a command only available to The Untraceable.")
    .addIntegerOption(option =>
        option
        .setName("command-id")
        .setDescription("The command's Id you would like to make only available to you.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const id = interaction.options.getInteger("command-id")
        
        if(!interaction.client.application?.owner) await interaction.client.application?.fetch()

        const command = await interaction.client.application.commands.fetch(id)
        
        if(!command) {
            return await interaction.reply("That command doesn't exist, how do you not know your own bot's commands Id when you made a command to show you the Id's for each and every command..")
        }

        const permissions = [
            {
                id: interaction.client.application?.id,
                type: "USER",
                permission: true
            }
        ]

        await command.permissions.set({ permissions })

    }
}