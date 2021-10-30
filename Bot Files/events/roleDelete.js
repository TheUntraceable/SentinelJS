const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleDelete",
    once: false,
    async execute(role) {
        const data = await role.client.db.guilds.findOne({guildId: role.guild.id})
        if(data.actionLogs != false) {
            
            const embed = new MessageEmbed()
            .setTitle("A role delete!")
            .setDescription(`${role.name} has been updated!`)
            .setColor("#ff0000")
            .setTimestamp()

            role.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )

        }
    }
}