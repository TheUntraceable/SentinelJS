const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(before,after) {
        const data = await before.client.db.guilds.findOne({guildId : before.guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A message has been updated!")
            .setDescription(`The message from ${before.author.tag} (ID ${message.id})'s contents have been updated from ${before.content} -> ${after.content}`)
            .setColor("#YELLOW")
            .setTimestamp()
            message.client.channels.fetch(data.messageLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}