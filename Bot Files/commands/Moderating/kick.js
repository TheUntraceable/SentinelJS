const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick-with-id')
        .setStringOption(option => {
            option
            .setName("id")
            .setDescription("The user you want to kick's ID")
            .setRequired(true)
        })
		.setDescription('Kicks a member using their ID.'),
        .setStringOption(option => {
            option
            .setName("reason")
            .setDescription("The reason you would like to ban the user for.")
            .setRequired(false)
        })
	cooldowns : new Set(),
	cooldown : 10,
	category : "status",
    async execute(interaction) {
        const powerful = [interaction.guild.ownerId,interaction.client.id]
        
        if(interaction.member.permissions.has("KICK_MEMBERS")) { 
            return await interaction.reply({ephemiral : true,embeds : [new MessageEmbed.setColor("#ff0000").setTitle="You do not have the `KICK_MEMBERS` permission.".setDescription("You need `KICK_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})
        } else if(.includes(interaction.member.id)) 
        user = interaction.guild.members.cache.get(interaction.options.get("id"))
        const embed = new MessageEmbed().setTitle(`You have been ban from: ${interaction.guild.name} by ${interaction.member.name}.\n${reason ?? "No reason was specified."}`).setColor("#ff0000")]
        
        }
    
    }
}
}
    }
}