const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(member) {
        const data = await member.client.db.guilds.findOne({
            guildId : member.guild.id
        })

        if(data.memberJoins != false) {
            const embed = new MessageEmbed()
            .setTitle("A member has left!")
            .setDescription(`${member.tag} has left!`)
            .setColor("#ff0000")
            .setTimestamp()

            member.client.channels.fetch(data.memberJoins).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }

}