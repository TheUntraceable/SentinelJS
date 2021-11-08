const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute-role")
    .setDescription("The role to use for muting members.")
    .addRoleOption(option =>
        option
        .setName("role")
        .setDescription("The mute role.")
        .setRequired(true)
        ),
    async execute(interaction) {
        if(!interaction.member.permissions.has("MANAGE_ROLES") || !interaction.member.permissions.has("MANAGE_GUILD")) {
            return await interaction.reply("You are missing the required permissions `MANAGE_ROLES` or `MANAGE_GUILD`.")
        }

        await interaction.client.openAccount(interaction.client) // Open the account if it's not already open.
        await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {muteRole: interaction.options.getRole("role").id}})
        await interaction.reply(`I have updated your mute role. Please make sure ${interaction.options.getRole("role").name} is configured correctly.`)
    }
}