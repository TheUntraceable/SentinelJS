const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("The help command!")
    .addStringOption(option =>
        option
        .setName("name")
        .setDescription("The name of the command you'd like help on. /commandlist has a list of all commands.")
        .setRequired(true)
        ),

    cooldown: 5,
    
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.options.getString("name"))

        if(!command) return interaction.reply("That command doesn't exist!")

        const embed = new MessageEmbed().setTitle(`**${command.data.name}**`).setDescription("This embed will contain information to help you with this command!").addFields([
            {
                name: "Description",
                value: command.data.description,
                inline: true
            }, {
                name: "Usage",
                value: command.usage ? command.usage : "No usage was supplied :(",
                inline: true
            }, {
                name: "Cooldown?",
                value: command.cooldown ? `${command.cooldown} seconds` : "No cooldown",
                inline: true
            }
        ])

        await interaction.reply({embeds: [embed]})
        
    }
}