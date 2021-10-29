const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "inviteCreate",
    once: false,
    async execute(invite) {
        const data = await invite.client.db.guilds.findOne({guildId : invite.guild.id})
        if (data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A new invite has been created!")
            .setDescription(`An invite with the code ${invite.code} has been created!`)
            .setColor("#51ff00")
            .setTimestamp()

            invite.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}