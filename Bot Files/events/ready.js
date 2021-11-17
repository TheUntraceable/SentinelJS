module.exports = {

	name: 'ready',

	once: true,

	async execute(client) {

		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`over ${client.users.cache.size} users!`, { type: 'WATCHING' });

		client.statcord.autopost();
		client.guilds.cache.forEach(guild => client.openAccount(guild))	

		setInterval(() => {
			client.user.setActivity(`over ${client.users.cache.size} users!`, { type: 'WATCHING' });
		}, 300000);
		
	}

}