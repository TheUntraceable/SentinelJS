const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite the bot'),
	async execute(interaction) {

		const pingy = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle("Invite Link!")
		.setDescription(`[Thank you for adding me!](https://dsc.gg/security)`)
		.setTimestamp()
			return await interaction.reply({ embeds: [pingy] });
	},
};
