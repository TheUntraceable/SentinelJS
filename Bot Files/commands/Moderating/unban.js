const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server.")
    .addIntegerOption(option => 
        option
        .setName("id")
        .setDescription("The Id of the user you would like to unban")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Why you would like to unban this user.")
        .setRequired(false)
    ),
    async execute(interaction) {
        const id = interaction.options.getInteger("id")
        const user = interaction.client.users.fetch(id)
        const reason = interaction.options.getString("reason")
        const embed = new MessageEmbed().setColor("#ff0000") // This is the error embed

        if(!user) {
            await interaction.reply({content : "That is an invalid user."})

        } else if(user == interaction.client.user) {
            return await interaction.reply({embeds : [embed.setTitle("You can not unban me.").setDescription("I can't unban myself! Also I'm not ban so...")]})

        } else if(!interaction.member.permissions.has("UNBAN_MEMBERS") && !interaction.guild.ownerId == interaction.member.id) {
            return await interaction.reply({ephemeral : true,embeds : [embed.setTitle("You do not have the `UNBAN_MEMBERS` permission.").setDescription("You need `UNBAN_MEMBERS` to execute this command. Try again once you are sure you have this permission.")]})

        } else if(!interaction.guild.me.permissions.has("UNBAN_MEMBERS")) {
            return await interaction.reply({ephemeral:true,embeds: [embed.setTitle("I do not have the `UNBAN_MEMBERS` permission.").setDescription("I do not have the `UNBAN_MEMBERS` permission.")]})
        
        }

        interaction.guild.members.bans.fetch(id).then(async ban => {
            if(!ban) {
                return await interaction.reply({ephemeral : true,embeds : [embed.setTitle("That user is not banned.").setDescription("That user is not banned.")]})
            }

            await interaction.guild.members.unban(id, `Action by ${user.tag}.`)
            await interaction.reply({ephemeral : true,embeds : [embed.setColor("#51ff00").setTitle("User unbanned.").setDescription(`${user.tag} has been unbanned. Reason: ${reason}`)]})
        })
    }
}
