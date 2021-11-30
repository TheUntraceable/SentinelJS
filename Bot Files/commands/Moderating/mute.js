const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes someone.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to mute.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to mute this user.")
        .setRequired(false)
        ),

    async execute(interaction) {

        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return await interaction.reply("You are missing the `MANAGE_MESSAGES` permission.")
        }

        const reason = interaction.options.getString("reason") || "No reason provided."
        const user = interaction.options.getMember("user")
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
        const role = data.muteRole;

        user.roles.add(role,`Action by ${interaction.member.id}.`)
        await interaction.reply(`I have muted ${user}. Reason: ${reason}`,`Action by ${interaction.member.id}`)
    }
}