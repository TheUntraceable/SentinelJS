const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "inviteDelete",
    once: false,
    async execute(invite) {
        const data = await invite.client.db.guilds.findOne({guildId : invite.guild.id})
        if (data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("An invite has been deleted!")
            .setDescription(`An invite with the code ${invite.code} has been deleted!`)
            .setColor("#ff0000")
            .setTimestamp()

            invite.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}