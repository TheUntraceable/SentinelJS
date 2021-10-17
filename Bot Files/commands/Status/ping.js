const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping, pong, am I online?'),
	async execute(interaction) {
    const ping = interaction.client.ws.ping;

        const pingy = new MessageEmbed()
	.setColor('GREEN')
	.setTitle("Wait a second.. Ping?")
	.setDescription(`WOAH My response time is \`${ping} ms\``)
	.setTimestamp()
		return interaction.reply({ embeds: [pingy] });
	},
};
