module.exports = {

	name: 'ready',

	once: true,

	async execute(client) {
		client.statcord.autopost();
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.cache.each(guild => client.openAccount(guild))	
		client.cacheAntispammers()

	}

}