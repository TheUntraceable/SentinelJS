const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelUpdate",
    once: false,
    async execute(before,after) {
        await channel.client.openAccount(channel.guild)

        if(before.type != "GUILD_TEXT" || after.type != "GUILD_TEXT")  {
            return // I don't care if someone updates anything in my Dm's, I'll update them.
        }
        const data = await before.client.db.guilds.findOne({
            guildId : before.guild.id
        })
        
        const embed = new MessageEmbed()
            .setTitle("A channel has been updated!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`) // Add who created it or whatever
            .setColor("YELLOW")
            .setTimestamp()

        if(data.actionLogs != false) {
            after.guild.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )
        }
    }
}