const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
        .setDescription('Bans a user.')
        .addUserOption(option =>
            option.setName("user")
            .setDescription("The user you would like to ban.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("The reason why you would like to ban this user.")
            ),
	cooldown : 15,
    requiredPermissions: ["BAN_MEMBERS"],
    async execute(interaction) {

        const user = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        const embed = new EmbedBuilder().setColor(0xFF0000) // This is the error embed

        if(!user) {
            await interaction.reply({content : "That is an invalid user."})

        } else if(user == interaction.guild.me) {
            return await interaction.reply({embeds : [embed.setTitle("You can not ban me.").setDescription("I can't ban myself! You'll have to ban me manually.")]})

        } else if(!interaction.member.permissions.has("BAN_MEMBERS") && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral : true,embeds : [embed.setTitle("You do not have the `BAN_MEMBERS` permission.").setDescription("You need `BAN_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})

        } else if(user.roles.highest >= interaction.member.roles.highest && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral : true, embeds : [embed.setTitle("You can not ban them due to role hierarchy.").setDescription("They have a role that is the same/higher than your highest role.")]})

        } else if(user.roles.highest >= interaction.guild.me.roles.highest && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral:true, embeds : [embed.setTitle("I can not ban them due to role hierarchy.").setDescription("They have a role that is the same/higher than my highest role.")]})

        } else if(interaction.guild.ownerId === user.id) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("You can not ban them because they own the server.").setDescription("They own the server meaning that I can not ban them.")]})

        } else if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("I do not have the `BAN_MEMBERS` permission.").setDescription("I do not have the `BAN_MEMBERS` permission.")]})
        
        } else if(!user.bannable) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("I cannot ban that member.").setDescription("For some odd reason, I cannot ban that person..")]})
        
        }
        // Checks above.
        
        interaction.guild.members.ban(user.id,`Action by ${interaction.member.id}.`)
            .then(async banInfo =>
                await interaction.reply({content : c, ephemeral: true ,embeds : [new EmbedBuilder().setTitle("Banned!").setColor("RANDOM").setDescription(`I successfully have banned ${banInfo.user.toString()} from the server!\nReason: ${reason || "None"}`)]})
            ).catch (
                console.error()
            )
    }
}