const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "voiceStateUpdate",
    once: false,
    async execute(before,after) {
        const data = await before.member.client.db.guilds.findOne({guildId: before.member.guild.id})
        if(data.actionLogs != false) {
            
            const embed = new MessageEmbed()
            .setTitle("A members VoiceState has been updated!")
            .setDescription(`${before.member.tag}'s VoiceState has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()

            after.member.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )

        }
    }
}