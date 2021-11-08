const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'presenceUpdate',
    once: false,
    async execute(before,after) {
        await before.client.openAccount(before.guild)
        const data = await before.client.db.guilds.findOne({guildId: before.guild.id})
        if(!data.memberUpdates == false) {
            const embed = new MessageEmbed()
            .setTitle("A member's presence has been updated!") // Why do I sound excited?
            .setDescription(`${before.member.user.tag} has updated their presence!`)
            .setColor("YELLOW")
            .setTimestamp()
            before.client.channels.fetch(memberUpdates).then(channel => channel.send({embeds: [embed]}))
            
        }
    }
}