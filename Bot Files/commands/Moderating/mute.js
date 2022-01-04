const ms = require("ms")
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
        .setName("duration")
        .setDescription("How long to mute this user for. For example 10 minutes.")
        .setRequired(true)
    )    
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to mute this user.")
        .setRequired(false)
    ),
    cooldown: 5,
    requiredPermissions: ["MODERATE_MEMBERS"],
    async execute(interaction) {

        const reason = interaction.options.getString("reason") || "No reason provided."
        const user = interaction.options.getMember("user")
        const duration = interaction.options.getString("duration")

        if(interaction.guild.ownerId === user.id) {
            await interaction.reply("You cannot mute the server owner.")
            return
        } else if(interaction.member.roles.highest.position <= user.roles.highest.position) {
            await interaction.reply("You cannot mute them because of role hierarchy.")
            return
        }

        let time = ms(duration)

        if(time > 2_419_200_000) {
            return await interaction.reply("Time must be less than 28 days.")
        }

        if(!time) return await interaction.reply("Invalid duration.")

        if(time < 0) time = 0

        await user.timeout(time, `Action by ${interaction.user.tag}.`)

        await interaction.reply(`I have muted ${user}. Reason: ${reason}`)
    }
}