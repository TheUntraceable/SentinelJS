const { MessageEmbed } = require("discord.js")

module.exports = {

	name: 'channelCreate',

	once: false,

	async execute(channel) {
        await channel.client.openAccount(channel.guild)

        const data = await channel.client.db.guilds.findOne({
            guildId : channel.guild.id
        })

        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("A new channel has been created!")
            .setDescription(`A new channel: ${channel.name} has been created!`) // Add who created it or whatever
            .setColor("#51ff00")
            .setTimestamp()

            channel.guild.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )
        }

        // channel.client.log()
    }
}