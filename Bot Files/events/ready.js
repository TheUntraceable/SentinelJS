module.exports = {

	name: 'ready',

	once: true,

	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.statcord.autopost();
		client.guilds.cache.forEach(guild => client.openAccount(guild))	

		setInterval(() => {

			client.user.setPresence({
				name: `over ${client.users.cache.size}`,
				type: "WATCHING"
			});
		}, 5000);
		
	}

}