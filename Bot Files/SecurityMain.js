const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,	Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING]});
// I don't need people in my DM's but I do need literally everything else.

client.commands = new Collection();
client.data_analysis = []
client.config = config

fs.readdir(`${process.cwd()}/helpers/`, (err, files) => {
	if (err) { throw err }
	
	for (const file of files) {

		if (!file.endsWith(".js")) continue;
		
		require(`./helpers/${file}`)(client);
	}

	client.deploy()
	client.loadEvents();
	client.loadCommands();
	client.connect_to_mongo()
});

client.login(client.config.token)
