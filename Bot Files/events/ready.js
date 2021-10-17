module.exports = {

	name: 'ready',

	once: true,

	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		for(command of client.command_names) {
			client.data_analysis[command] = 0
		}
	}

}