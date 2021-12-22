const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildIntegrationsUpdate",
    once: false,
    async execute(guild) {
        await client.openAccount(guild)

        const data = await guild.client.db.guilds.findOne({
            guildId : guild.id
        })
        
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("Integrations have been updated!")
            .setDescription(`This servers integrations have been updated!`) 
            .setColor("YELLOW")
            .setTimestamp()
        
            await client.eventLog(before, after, embed)


            guild.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds:  [embed]})
            )
        }
    }
}