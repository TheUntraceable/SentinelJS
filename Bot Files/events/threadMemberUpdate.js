const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "threadMemberUpdate",
    once: false,
    async execute(before,after) {
        const data = await before.client.db.guilds.findOne({guildId: after.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A thread's member has been created")
            .setDescription(`${after.thread.name}'s member: ${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`)
            .setTimestamp()
            .setColor("#51ff00")
            after.thread.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}