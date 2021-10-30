const  { MessageEmbed } = require("discord.js")

module.exports = {
    name: "webhookUpdate",
    once: false,
    async execute(channel) {
        const data = await channel.client.db.guilds.findOne({guildId: channel.guild})
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A new webhook has been made!")
            .setDescription(`${channel.name} has a new webhook!`)
            .setColor("#51ff00")
            .setTimestamp()

            channel.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}