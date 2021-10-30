const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stickerCreate",
    once: false,
    async execute(sticker) { // I keep on typing `sticket` for some reason...
        const data = await sticker.client.db.guilds.findOne({guildId: sticker.guild.id}) 
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A new sticker has been created!")
            .setDescription(`${sticker.name} has been created!`)
            .setColor("#51ff00")
            .setTimestamp()
            sticker.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}