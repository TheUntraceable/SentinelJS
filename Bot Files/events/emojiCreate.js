const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "emojiCreate",
    once: false,
    async execute(emoji) {
        const data = await emoji.client.db.guilds.findOne({
            guildId : emoji.id
        })

        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A new emoji has been created!")
            .setDescription(`A new emoji: ${emoji.name} has been created!`) // Add who created it or whatever
            .setColor("#51ff00")
            .setTimestamp()
            
            emoji.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
            )
        }
    }
}