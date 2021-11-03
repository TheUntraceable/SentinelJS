const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('../config.json');

const categories = ["Configuration","Fun","Invitelogger","Moderating","Status","TheUntraceableOnly"]
const fs = require('fs');

const commands = [];
for (const folder of categories) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`${process.cwd()}/commands/${folder}/${file}`);
		if(command.data != undefined) {
			commands.push(command.data.toJSON());
		} else if(command.raw_data != undefined) {
			commands.push(command.raw_data) // I am not gonna be using SlashCommandBuilder all the time.
		}
	}
}
module.exports = client => {
	client.deploy = async () => {
		const rest = new REST({ version: '9' }).setToken(token);
			try {

				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: commands },
				);
		
				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
	};
}