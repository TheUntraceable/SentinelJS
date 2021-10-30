const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "threadUpdate",
    once: false,
    async execute(before,after) {
        const data = await before.client.db.guilds.findOne({guildId: before.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A thread has been updated!")
            .setDescription(`${thread.name} has been updated!`)
            .setTimestamp()
            .setColor("#YELLOW")
            thread.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}