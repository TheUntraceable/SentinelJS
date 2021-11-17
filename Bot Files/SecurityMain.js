const Statcord = require("statcord.js");
const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ presence: {status: "dnd"}, intents: [Intents.FLAGS.GUILDS,	Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING]});

// I don't need people in my DM's but I do need literally everything else.

client.commands = new Collection();
client.config = config

client.statcord = new Statcord.Client({
    client,
    key: client.config["statcord-api-key"],
});



fs.readdir(`${process.cwd()}/helpers/`, (err, files) => {
	if (err) { throw err }
	
	for (const file of files) {

		if (!file.endsWith(".js")) continue;
		
		require(`./helpers/${file}`)(client);
	}
	client.loadEvents();

	client.connect_to_mongo().then(async message => {
		console.log(message)
		await client.cacheAntispammers()
		client.guilds.cache.forEach(guild => client.openAccount(guild))	
		client.loadCommands();
	}).catch(message => {
		console.error(message)
		client.destroy()
		process.exit(1);
	})
});



client.login(client.config.token)