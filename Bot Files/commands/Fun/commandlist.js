const { Embed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commandlist')
		.setDescription('Sends a list of all commands!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The command category to view.')
                .setRequired(false)),    
	cooldown : 5,
    cooldowns : new Set(),

    async execute(interaction) {
        
        const embed = new Embed()
            .setTitle("Here are a list of all the available commands!")
            .setColor("#51ff00")
            .setDescription("This is a list of all the commands that are available to be used by almost anyone! ||(Except for the ones under Moderating which you need the correct permissions for.)||");
        for(command in interaction.client.commands) {
            if (interaction.options.get("category") != null) {
                
            }

        }
        await interaction.reply({});
    }

};