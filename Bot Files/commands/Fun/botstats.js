const axios = require("axios")
const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('See information about the bot!'),
    cooldown: 15, // Just so Github don't get angry with me for some mistake spamming the command, which spams the API.
	async execute(interaction) {
        
        let commit_messages = ""

        const commits = await axios({
            url: "https://api.github.com/repos/TheUntraceable/SentinelJS/commits",
            headers : {
                Accept: "application/vnd.github.v3+json"
            }
        })
    
        commits.data.splice(3) // This will only get the last 3 commits

        for(commit of commits.data) {

            const sha = commit.sha.substring(0, 5)

            commit_messages += `[\`${sha}\`](https://github.com/TheUntraceable/SentinelJS/commit/${commit.sha}) - ${commit.commit.message} (${time(Math.floor(new Date(commit.commit.author.date).getTime() / 1000), "R")})\n`
        }
    
        const embed = new MessageEmbed().setTitle("Bot stats").setColor("#2F3136").setDescription("This embed will contain stats regarding me.").addFields([
            {
                name: "Recent commits: ",
                value: commit_messages || "Error...",
                inline: false
            },
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