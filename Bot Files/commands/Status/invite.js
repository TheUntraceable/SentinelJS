const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite the bot'),
	async execute(interaction) {
 const botAdd = `[Thank you for adding me!](https://dsc.gg/security)`
)`
        const pingy = new MessageEmbed()
	.setColor('RANDOM')
	.setTitle("Invite Link!")
	.setDescription(botAdd)
	.setTimestamp()
		return interaction.reply({ embeds: [pingy] });
	},
};
