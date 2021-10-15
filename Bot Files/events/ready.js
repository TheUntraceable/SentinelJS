module.exports = {

	name: 'ready',

	once: true,

	cooldown : 10,


	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}

}