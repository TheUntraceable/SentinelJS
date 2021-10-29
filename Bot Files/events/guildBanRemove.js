const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildBanAdd",
    once: false,
    async execute(ban) {
        const data = await ban.client.db.guilds.findOne({
            guildId : ban.guild.id
        })
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A member has been unban!")
            .setDescription(`${ban.user.tag} has been unban!`) // Add who deleted it or whatever
            .setColor("#51ff00")
            .setTimestamp()
        
            ban.client.channels.get(data.actionLogs).then(channel =>
                channel.send({embeds:  [embed]})
            )
        }
    }
}