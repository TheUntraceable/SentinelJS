const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGES] }); 

client.commands = new Collection();
client.data_analysis = []
client.config = config
client.command_names = new Array();

fs.readdir(`${process.cwd()}/helpers/`, (err, files) => {
	if (err) { throw err }
	
	for (const file of files) {

		if (!file.endsWith(".js")) continue;
		
		require(`./helpers/${file}`)(client);
	}

	client.deploy()
	client.loadEvents();
	client.loadCommands();
});

client.login(client.config.token)
