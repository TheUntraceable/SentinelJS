const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "threadDelete",
    once: false,
    async execute(thread) {
        const data = await thread.client.db.guilds.findOne({guildId: thread.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A thread has been deleted")
            .setDescription(`${thread.name} has been deleted!`)
            .setTimestamp()
            .setColor("#ff0000")
            thread.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}