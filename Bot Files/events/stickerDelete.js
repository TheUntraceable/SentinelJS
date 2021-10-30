const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stickerCreate",
    once: false,
    async execute(sticker) { // I keep on typing `sticket` for some reason...
        const data = await sticker.client.db.guilds.findOne({guildId: sticker.guild.id}) 
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A sticker has been deleted!")
            .setDescription(`${sticker.name} has been deleted!`)
            .setColor("#ff0000")
            .setTimestamp()
            sticker.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}