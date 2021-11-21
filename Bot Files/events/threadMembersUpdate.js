const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "threadMembersUpdate",
    once: false,
    async execute(before,after) {
        const data = await after.at().client.db.guilds.findOne({guildId: after.thread.guild.id})
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A thread's member(s) has been updates")
            .setDescription(`${thread.name}'s member count has change! There has been a change of ${before.size - after.size} members!`)
            .setTimestamp();

            if(before.size - after.size < 0) {
                embed.setColor("#ff0000")
            } else {
                embed.setColor("#51ff00")
            }
            
            after.at().client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}