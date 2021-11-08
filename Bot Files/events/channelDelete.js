const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelDelete",
    once: false,

    async execute(channel) {
        await channel.client.openAccount(channel.guild)

        if(channel.type != "GUILD_TEXT") {
            return // I don't care if someone deletes my Dm's, I'll delete them.
        }
        const data = await channel.client.db.guilds.findOne({
            guildId : channel.guild.id
        })
        
        
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
                .setTitle("A channel has been deleted!")
                .setDescription(`${channel.name} has been deleted!`) // Add who deleted it or whatever
                .setColor("#ff0000")
                .setTimestamp()

                channel.guild.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )
        }
    }
}