const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('See information about the bot!'),
	async execute(interaction) {

        const embed = new MessageEmbed().setTitle("Bot stats").setColor("#2F3136").setDescription("This embed will contain stats regarding me.").addFields([
            {
                name : "Uptime: ",
                value: time(Math.round(interaction.client.readyTimestamp / 1000), "R"),
                inline: true
            }, {
                name : "Created: ",
                value: `I was created on ${time(Math.round(interaction.client.application.createdTimestamp / 1000), "D")}.`,
                inline: true
            },{
                name: "Channels: ",
                value: `I can see ${interaction.client.channels.cache.size} channel(s)`,
                inline: true
            },{
                name: "Emojis: ",
                value: `I can see ${interaction.client.emojis.size} emoji(s).`,
                inline: true
            },{
                name: "Guilds: ",
                value: `I can see ${interaction.client.guilds.cache.size} guild(s).`,
                inline: true
            },{
                name: "Users: ",
                value: `I can see ${interaction.client.users.cache.size} user(s).`,
                inline: true
            },{
                name: "Version: ",
                value: `I am in version ${interaction.client.config.beta ? "Beta" : ""}${interaction.client.config.version}`,
                inline: true
            } 
        ])
        await interaction.reply({embeds : [embed]})
    }
};