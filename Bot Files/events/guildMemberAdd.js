const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    once: false, // If this were a private bot, this would be true :(
    async execute(member) {
        await member.client.openAccount(member.guild)
        const data = await member.client.db.guilds.findOne({
            guildId : member.guild.id
        })

        if(data.suspiciousAccounts != false) {
            if(Math.round(member.createdTimestamp / 1000) < 604800) {
                const young = new MessageEmbed()
                .setTitle(`${member.tag}'s account is under 1 week old!'`)
                .setDescription(`${ban.user.tag} has been classed as a suspicious account!`)
                .setColor("#ff0000")
                .setTimestamp()
    

                member.client.channels.fetch(data.suspiciousAccounts).then(channel =>
                    channel.send({embeds : [young]})
                )
            }
        } else if(data.memberJoins != false) {
            const embed = new MessageEmbed()
            .setTitle("A member has joined!")
            .setDescription(`${member.tag} has joined!`)
            .setColor("#51ff00")
            .setTimestamp()
            member.client.channels.fetch(data.memberJoins).then(channel =>
                channel.send({embeds : [embed]})
                )
        } else if(!data.autoRoles) {
            await member.roles.add(data.autoRoles)
        }
    }
}