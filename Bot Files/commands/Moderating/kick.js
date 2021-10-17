const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick-with-id')
        .setDescription('Kicks a member using their ID.'),
    usage : "/kick <user-id> [reason]",
	cooldowns : new Set(),
	cooldown : 10,
	category : "moderating",
    async execute(interaction) {


        
        if(!interaction.member.permissions.has("KICK_MEMBERS")) { 
            return await interaction.reply({ephemeral : true,embeds : [new MessageEmbed.setColor("#ff0000").setTitle="You do not have the `KICK_MEMBERS` permission.".setDescription("You need `KICK_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})
        }

        user = interaction.guild.members.cache.get(interaction.options.get("id"))

        const embed = new MessageEmbed().setTitle(`You have been kicked from: ${interaction.guild.name} by ${interaction.member.name}.\n${reason ?? "No reason was specified."}`).setColor("#ff0000")
        try (
            user.send({embeds : [embed]})
        ) catch error {

        }
        }
    }