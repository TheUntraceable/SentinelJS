const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelPinsUpdate",
    once: false,

    async execute(channel,time) {
        await channel.client.openAccount(channel.guild)

        if(channel.type != "GUILD_TEXT") {
            return // I don't care if someone pins anything in my Dm's, I'll pin them.
        }
        const data = await channel.client.db.guilds.findOne({
            guildId : channel.guild.id
        })
        

        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A channel's pins have been updated!")
            .setDescription(`${channel.name}'s pins have been updated!`) // Add who added a pin or whatever
            .setColor("#51ff00")
            .setTimestamp()

            channel.guild.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )
        }
    }
}