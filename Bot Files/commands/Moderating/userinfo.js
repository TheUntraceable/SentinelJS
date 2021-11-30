const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder,time } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays information about a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to get information about.")
        .setRequired(false)
        ),
    cooldown: 5,
    
    async execute(interaction) {
        const member = interaction.options.getMember("user") || interaction.member;

        let roles = ""
        member.roles.cache.forEach(role => roles += `${role.name}\n`)

        const embed = new MessageEmbed()
        .setTitle(`${member.user.tag}'s Info`)
        .setThumbnail(member.user.displayAvatarURL())
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setColor(member.displayHexColor)
        .setDescription(`The following embed will contain information about ${member.user.tag}.`)
        .setFooter(`Requested by ${interaction.user.tag}`)
        .addFields([{
            name: "ID: ",
            value: member.id.toString(),
            inline: true
        }, {
            name: "Joined at: ",
            value: time(Math.floor(member.joinedTimestamp / 1000),"F").toString(),
            line: true
        }, {
            name: "Created at: ",
            value: time(Math.floor(member.user.createdTimestamp / 1000),"F").toString(),
            inline: true
        }, {
            name: "Roles: ",
            value: roles,
            inline: true
        }, {
            name: "Top role: ",
            value: member.roles.highest.name,
            inline: true
        }
    ])
    await interaction.reply({embeds: [embed]})
    }
}