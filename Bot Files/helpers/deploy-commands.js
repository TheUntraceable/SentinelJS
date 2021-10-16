const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('../config.json');

const categories = ["Configuration","DataAnalysis","Fun","Invitelogger","Moderating","Status","TheUntraceableOnly"]
const fs = require('fs');

const commands = [];
for (const folder of categories) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`${process.cwd()}/commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
}
}
module.exports = client => {
	client.deploy = async () => {
		const rest = new REST({ version: '9' }).setToken(token);
			try {
				console.log('Started refreshing application (/) commands.');
		
				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands },
				);
		
				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
	};
}