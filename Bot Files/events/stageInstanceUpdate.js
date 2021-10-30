const { MessageEmbed } = require("discord.js") // I made like 12 mistakes typing this line out. How?

module.exports = {
    name: "stageInstanceUpdate",
    once: false, 
    async execute(before,after) {
        const data = await stage.client.db.guilds.findOne({guildId: before.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A stage has been updated!")
            .setColor("#ff0000")
            .setTimestamp()
            .setDescription(`${stage.channel.name} has been updated!`)
            stage.client.channel.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}