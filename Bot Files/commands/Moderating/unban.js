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
    cooldown: 5,
    requiredPermissions: ["BAN_MEMBERS"],
    async execute(interaction) {
        const id = interaction.options.getInteger("id")
        const user = interaction.client.users.fetch(id)
        const reason = interaction.options.getString("reason")
        const embed = new MessageEmbed().setColor("#ff0000") // This is the error embed

        if(!user) {
            await interaction.reply({content : "That is an invalid user."})

        } else if(user == interaction.client.user) {
            return await interaction.reply({embeds : [embed.setTitle("You can not unban me.").setDescription("I can't unban myself! Also I'm not ban so...")]})

        interaction.guild.members.bans.fetch(id).then(async ban => {
            if(!ban) {
                return await interaction.reply({ephemeral : true,embeds : [embed.setTitle("That user is not banned.").setDescription("That user is not banned.")]})
            }

            await interaction.guild.members.unban(id, `Action by ${user.tag}.`)
            await interaction.reply({ephemeral : true,embeds : [embed.setColor("#51ff00").setTitle("User unbanned.").setDescription(`${user.tag} has been unbanned. Reason: ${reason}`)]})
        })
    }}
}