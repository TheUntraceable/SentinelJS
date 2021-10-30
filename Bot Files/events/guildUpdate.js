const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildUpdate",
    once: false, // I really have the need to make a joke here but I can't think of one.
    async execute(before,after) {

        const data = await before.client.db.guilds.findOne({guildId: before.id})

        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setName("Guild Update!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()

            after.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}