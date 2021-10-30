const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleUpdate",
    once: false,
    async execute(before,after) {
        const data = await before.client.db.guilds.findOne({guildId: before.guild.id})
        if(data.actionLogs != false) {
            
            const embed = new MessageEmbed()
            .setTitle("A role updated!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()

            after.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )

        }
    }
}