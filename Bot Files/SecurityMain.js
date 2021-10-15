const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS] }); 
const fs = require('fs');

client.commands = new Collection();

fs.readdir("./helpers/", (err, files) => {
	if (err) { throw err }
	
	for (const file of files) {

		if (!file.endsWith(".js")) continue;
		
		require(`./helpers/${file}`)(client);
	}

	client.loadEvents();
	client.loadCommands();
});

client.on("interactionCreate", interaction => {
	client.handle(interaction)
})

client.login(config["token"])