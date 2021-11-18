const axios = require("axios")
const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('See information about the bot!'),
    cooldowns: new Set(),
    cooldown: 5,
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

/*
  {
    "sha": "9faf8ec50f889ccb68b73950e7dc0a113f1c0af8",
    "node_id": "C_kwDOGOTby9oAKDlmYWY4ZWM1MGY4ODljY2I2OGI3Mzk1MGU3ZGMwYTExM2YxYzBhZjg",
    "commit": {
      "author": {
        "name": "TheUntraceable",
        "email": "ridhwanplayzzz@gmail.com",
        "date": "2021-11-17T22:29:34Z"
      },
      "committer": {
        "name": "TheUntraceable",
        "email": "ridhwanplayzzz@gmail.com",
        "date": "2021-11-17T22:29:34Z"
      },
      "message": "Start workin on tags, yes I sourced it from EpikHelper because I wroteit.",
      "tree": {
        "sha": "10729ce8179eb5286c4b9bba1ce1194893726940",
        "url": "https://api.github.com/repos/TheUntraceable/SentinelJS/git/trees/10729ce8179eb5286c4b9bba1ce1194893726940"
      },
      "url": "https://api.github.com/repos/TheUntraceable/SentinelJS/git/commits/9faf8ec50f889ccb68b73950e7dc0a113f1c0af8",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/TheUntraceable/SentinelJS/commits/9faf8ec50f889ccb68b73950e7dc0a113f1c0af8",
    "html_url": "https://github.com/TheUntraceable/SentinelJS/commit/9faf8ec50f889ccb68b73950e7dc0a113f1c0af8",
    "comments_url": "https://api.github.com/repos/TheUntraceable/SentinelJS/commits/9faf8ec50f889ccb68b73950e7dc0a113f1c0af8/comments",
    "author": {
      "login": "TheUntraceable",
      "id": 73362400,
      "node_id": "MDQ6VXNlcjczMzYyNDAw",
      "avatar_url": "https://avatars.githubusercontent.com/u/73362400?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/TheUntraceable",
      "html_url": "https://github.com/TheUntraceable",
      "followers_url": "https://api.github.com/users/TheUntraceable/followers",
      "following_url": "https://api.github.com/users/TheUntraceable/following{/other_user}",
      "gists_url": "https://api.github.com/users/TheUntraceable/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/TheUntraceable/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/TheUntraceable/subscriptions",
      "organizations_url": "https://api.github.com/users/TheUntraceable/orgs",
      "repos_url": "https://api.github.com/users/TheUntraceable/repos",
      "events_url": "https://api.github.com/users/TheUntraceable/events{/privacy}",
      "received_events_url": "https://api.github.com/users/TheUntraceable/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "TheUntraceable",
      "id": 73362400,
      "node_id": "MDQ6VXNlcjczMzYyNDAw",
      "avatar_url": "https://avatars.githubusercontent.com/u/73362400?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/TheUntraceable",
      "html_url": "https://github.com/TheUntraceable",
      "followers_url": "https://api.github.com/users/TheUntraceable/followers",
      "following_url": "https://api.github.com/users/TheUntraceable/following{/other_user}",
      "gists_url": "https://api.github.com/users/TheUntraceable/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/TheUntraceable/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/TheUntraceable/subscriptions",
      "organizations_url": "https://api.github.com/users/TheUntraceable/orgs",
      "repos_url": "https://api.github.com/users/TheUntraceable/repos",
      "events_url": "https://api.github.com/users/TheUntraceable/events{/privacy}",
      "received_events_url": "https://api.github.com/users/TheUntraceable/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "d34368dfc6496ccdfb9b3a79ef750c63b77cbb18",
        "url": "https://api.github.com/repos/TheUntraceable/SentinelJS/commits/d34368dfc6496ccdfb9b3a79ef750c63b77cbb18",
        "html_url": "https://github.com/TheUntraceable/SentinelJS/commit/d34368dfc6496ccdfb9b3a79ef750c63b77cbb18"
      }
    ]
  }
*/