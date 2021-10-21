const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

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
    usage : "/ban <user-id> [reason]",
	cooldowns : new Set(),
	cooldown : 10,
	category : "moderating",

    async execute(interaction) {

        const user = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        if(!user) await interaction.reply({content : "That user is invalid."})
        if(user == interaction.guild.me) return await interaction.reply({embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You can not ban me.").setDescription("I can't ban myself! You'll have to ban me manually.")]})
        if(!interaction.member.permissions.has("BAN_MEMBERS") && !interaction.guild.ownerId == interaction.member.id) return await interaction.reply({ephemeral : true,embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You do not have the `BAN_MEMBERS` permission.").setDescription("You need `BAN_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})    
        if(user.roles.highest >= interaction.member.roles.highest && !interaction.guild.ownerId == interaction.member.id) return await interaction.reply({ephemeral : true, embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You can not ban them due to role hierarchy.").setDescription("They have a role that is the same/higher than your highest role.")]})
        if(user.roles.highest >= interaction.guild.me.roles.highest && !interaction.guild.ownerId == interaction.member.id) return await interaction.reply({ephemeral:true, embeds : [new MessageEmbed().setColor("#ff0000").setTitle("I can not ban them due to role hierarchy.").setDescription("They have a role that is the same/higher than my highest role.")]})
        if(interaction.guild.ownerId === user.id) return await interaction.reply({ephemeral:true,embeds: [new MessageEmbed().setColor("#ff0000").setTitle("You can not ban them because they own the server.").setDescription("They own the server meaning that I can not ban them.")]})
        if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) return await interaction.reply({ephemeral:true,embeds: [new MessageEmbed().setColor("#ff0000").setTitle("I do not have the `BAN_MEMBERS` permission.").setDescription("I do not have the `BAN_MEMBERS` permission.")]})
        if(!user.bannable) return await interaction.reply({ephemeral:true,embeds: [new MessageEmbed().setColor("#ff0000").setTitle("I cannot ban that member.").setDescription("For some odd reason, I cannot ban that person..")]})
        interaction.guild.members.ban(`Action by ${interaction.member.id}.`)
            .then(async banInfo =>
                await interaction.reply({content : c, ephemeral: true ,embeds : [new MessageEmbed().setTitle("Banned!").setColor("RANDOM").setDescription(`I successfully have banned ${banInfo.user.toString()} from the server!\nReason: ${reason || "None"}`)]})
            ).catch (
                console.error()
            )
    }
}