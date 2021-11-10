const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('See information about the bot!'),
    cooldowns: new Set(),
    cooldown: 5,
	async execute(interaction) {

        const embed = new MessageEmbed().setTitle("Bot stats").setColor("#2F3136").setDescription("This embed will contain stats regarding me.").addFields([
            {
                name : "Uptime: ",
                value: `<t:${Math.round(interaction.client.readyTimestamp / 1000)}:R>.`,
                inline: true
            }, {
                name : "Created: ",
                value: `I was created on <t:${Math.round(interaction.client.application.createdTimestamp / 1000)}:D>.`,
                inline: true
            },{
                name: "Channels: ",
                value: `I can see ${interaction.client.channels.cache.size} channel(s).`,
                inline: true
            },{
                name: "Guilds: ",
                value: `I can see ${interaction.client.guilds.cache.size} guild(s).`,
                inline: true
            },{
                name: "Users: ",
                value: `I can see ${interaction.client.users.cache.size} user(s) in my cache.`,
                inline: true
            },{
                name: "Version: ",
                value: `I am in version ${interaction.client.config.beta ? "Beta " : ""}${interaction.client.config.version}`,
                inline: true
            },{
                name: "Joined server at: ",
                value: `I joined this server ${time(Math.round(interaction.guild.joinedTimestamp / 1000), "R")}`,
                inline: true
            }
        ])
        await interaction.reply({embeds : [embed]})
    }
};