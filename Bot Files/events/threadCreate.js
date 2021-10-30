const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "threadCreate",
    once: false,
    async execute(thread) {
        const data = await thread.client.db.guilds.findOne({guildId: thread.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A new thread has been created")
            .setDescription(`${thread.name} has been created!`)
            .setTimestamp()
            .setColor("#51ff00")
            thread.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}