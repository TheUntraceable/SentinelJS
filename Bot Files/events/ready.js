module.exports = {

	name: 'ready',

	once: true,

	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.commands.forEach((v,k,coll) =>  {
			client.data_analysis[k] = 0 // K = name
			}
		)

		client.guilds.cache.each(guild => client.openAccount(guild))	
	}

}