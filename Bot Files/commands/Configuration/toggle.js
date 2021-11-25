const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("toggle")
    .setDescription("Toggle a command on or off.")
    .addStringOption(option => 
        option
        .setName("command")
        .setDescription("The command you would like to toggle.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.options.getString("command"))

        if(!command) return interaction.reply("That command doesn't exist!")

        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})

        if(data.disabledCommands.includes(command.name)) { 

            await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$pull: {disabledCommands: command.name}})
            await interaction.reply(`${command.name} is now disabled.`)
       
        } else {

            await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$push: {disabledCommands: command.name}})
            await interaction.reply(`${command.name} is now enabled.`)

        }

    }
}