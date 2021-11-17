module.exports = {

	name: 'ready',

	once: true,

	async execute(client) {

		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`over ${client.users.cache.size} users!`, { type: 'WATCHING' });

		client.statcord.autopost();

		setInterval(async () => {
			client.user.setActivity(`over ${client.users.cache.size} users!`, { type: 'WATCHING' });
			await client.cacheAntispammers()
		}, 300000);
		
	}

}