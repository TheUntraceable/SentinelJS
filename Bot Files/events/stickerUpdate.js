const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stickerCreate",
    once: false,
    async execute(before,after) { // I keep on typing `sticket` for some reason...

        const data = await before.client.db.guilds.findOne({guildId: sticker.guild.id}) 

        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A sticker has been updated!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()
            after.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}