const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(member) {
        const data = await member.client.guilds.findOne({ guildId: member.guild.id})
        if(!data.memberUpdates == null) {
            const embed = new MessageEmbed()
            .setTitle("A member has been updated!")
            .setDescription(`${member.tag} has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()
            
            member.client.channels.fetch(data.memberUpdates).then(channel =>
                channel.send({embeds: embed})
                )
        } 
    }
}