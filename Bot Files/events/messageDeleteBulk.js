const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageDeleteBulk",
    once: false, // I don't have a clever joke for this one I'm sorry.
    async execute(messages) {
        if(!messages[0].guild) return
        let m = ""
        const data = await messages[0].client.db.guilds.findOne({guildId: messages[0].guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("Bulk messages have been deleted!")
            .setDescription("Below will be all of the messages that have been Bulk Deleted.")
            .setColor("#ff0000")
            .setTimestamp()
            
            messages.forEach((value,key, kv) => {
                if(m.length + `${value.author} - ${value.content}\n`.length < 4000) {
                    m += `${value.author} - ${value.content}\n`
                } else {
                    embed.addField("Messages - ", m,false)
                }
            })
            messages.at(0).client.channels.fetch(data.messageLogs).then(channel =>
                channel.send({embeds: [embed]})
                )

        }
    }
}