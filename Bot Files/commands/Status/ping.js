const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the Clients latency!'),
	cooldowns : new Set(),
	cooldown : 10,
	category : "status",
	async execute(interaction) {
		await interaction.reply({content : `Client Latency - ${interaction.client.ws.ping}ms`});
	}
};