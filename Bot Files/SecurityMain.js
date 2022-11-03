const Statcord = require("statcord.js");
const config = require('./config.json');
const { Client, Collection, GatewayIntentBits, disableValidators } = require('discord.js');
const fs = require('fs');

const Intents = GatewayIntentBits


const client = new Client({ presence: { status: "dnd" }, intents: [Intents.Guilds, Intents.GuildMembers, Intents.GuildBans, Intents.GuildEmojisAndStickers, Intents.GuildIntegrations, Intents.GuildWebhooks, Intents.GuildInvites, Intents.GuildVoiceStates, Intents.GuildPresences, Intents.GuildMessages, Intents.GuildMessageReactions, Intents.GuildMessageTyping]});

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

	client.connectToMongo().then(async message => {

		console.log(message)

		await client.cacheAntispammers()

		client.guilds.cache.forEach(guild => client.openAccount(guild))	

		client.loadCommands();

		if(client.config.dev) client.deploy()

	}).catch(message => {
		console.error(message)

		client.destroy()

		process.exit(1);
	})
});

process.on("uncaughtException", (error, origin) => {
	console.error(error)
})

process.on("unhandledRejection", (reason, promise) => {
	console.error(reason)
})

client.login(client.config.token)