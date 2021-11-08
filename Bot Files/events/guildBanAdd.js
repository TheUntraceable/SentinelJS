const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildBanAdd",
    once: false,
    async execute(ban) {
        await ban.client.openAccount(ban.guild)

        const data = await ban.client.db.guilds.findOne({
            guildId : ban.guild.id
        })
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A member has been ban!")
            .setDescription(`${ban.user.tag} has been ban!`) // Add who deleted it or whatever
            .setColor("#ff0000")
            .setTimestamp()
        
            ban.client.channels.get(data.actionLogs).then(channel =>
                channel.send({embeds:  [embed]})
            )
        }
    }
}