const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the Clients latency!'),

	cooldown : 3,
	
	async execute(interaction) {
		let emoji = ""
		if(interaction.client.ws.ping < 150) {
			emoji = "<:theconnectionisgreat:902500574774321202>"
		} else if(interaction.client.ws.ping < 250) {
			emoji = "<:decentconnection:902500575042744360>"
		} else if(interaction.client.ws.ping > 500) {
			emoji = "<:badconnection:902500575957098506>"
		}

		await interaction.reply({content : `Pong! ${emoji} Client Latency - ${interaction.client.ws.ping}ms`});
	}
};