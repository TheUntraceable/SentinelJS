const { MessageEmbed } = require("discord.js") // I made like 12 mistakes typing this line out. How?

module.exports = {
    name: "stageInstanceDelete",
    once: false, 
    async execute(stage) {
        const data = await stage.client.db.guilds.findOne({guildId: stage.guild.id})
        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A stage has been uninitialised!")
            .setColor("#ff0000")
            .setTimestamp()
            .setDescription(`${stage.channel.name} is a no longer a Stage Channel!`)
            stage.client.channel.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}