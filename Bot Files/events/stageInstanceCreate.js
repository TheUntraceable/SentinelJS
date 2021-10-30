const { MessageEmbed } = require("discord.js") // I made like 12 mistakes typing this line out. How?

module.exports = {
    name: "stageInstanceCreate",
    once: false, // Would be true if it was my dead server. ;(
    async execute(stage) {
        const data = await stage.client.db.guilds.findOne({guildId: stage.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A new stage has ben initialised!")
            .setColor("#51ff00")
            .setTimestamp()
            .setDescription(`${stage.channel.name} is a new Stage Channel!`)
            stage.client.channel.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}