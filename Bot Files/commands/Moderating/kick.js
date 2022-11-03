const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
        .setDescription('Kicks a member.')
        .addUserOption(option =>
            option.setName("member")
            .setDescription("The member you would like to kick.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("The reason why you would like to kick this member.")
            ),

    requiredPermissions: ["KICK_MEMBERS"],
	cooldown : 10,

    async execute(interaction) {

        const user = interaction.options.getMember("member")
        const reason = interaction.options.getString("reason")
        const embed = new EmbedBuilder().setColor(0xFF0000)

        if(!user) {
            return await interaction.reply({content : "That member is invalid."})
        
        } else if(user == interaction.guild.me) {
            return await interaction.reply({embeds : [embed.setTitle("You can not kick me.").setDescription("I can't kick myself! You'll have to kick me manually.")]})
    
        } else if(!interaction.member.permissions.has("KICK_MEMBERS") && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral: true, embeds: [embed.setTitle("You do not have the `KICK_MEMBERS` permission.").setDescription("You need `KICK_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})    
       
        } else if(user.roles.highest >= interaction.member.roles.highest && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral : true, embeds : [embed.setTitle("You can not kick them due to role hierarchy.").setDescription("They have a role that is the same/higher than your highest role.")]})

        } else if(user.roles.highest >= interaction.guild.me.roles.highest && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral:true, embeds : [embed.setTitle("I can not kick them due to role hierarchy.").setDescription("They have a role that is the same/higher than my highest role.")]})

        }else if(interaction.guild.ownerId === user.id) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("You can not kick them because they own the server.").setDescription("They own the server meaning that I can not kick them.")]})
      
        } else if(!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("I do not have the `KICK_MEMBERS` permission.").setDescription("I do not have the `KICK_MEMBERS` permission.")]})
       
        } else if(!user.kickable) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("I cannot kick that member.").setDescription("For some odd reason, I cannot kick that person..")]})
        }
        
        user.kick(`Action by ${interaction.member.id}.`)
            .then(async banInfo =>
                await interaction.reply({content : c, ephemeral: true ,embeds : [new EmbedBuilder().setTitle("Kicked!").setColor("RANDOM").setDescription(`I successfully have kicked ${banInfo.user.toString()} from the server!\nReason: ${reason || "None"}`)]})
            ).catch (
                console.error()
            )
    }
}