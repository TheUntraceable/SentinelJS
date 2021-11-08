const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "emojiDelete",
    once: false,
    async execute(emoji) {
        await interaction.client.openAccount(channel.guild)

        const data = await emoji.client.db.guilds.findOne({
            guildId : emoji.guild.id
        })
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("An emoji has been deleted!")
            .setDescription(`${emoji.name} has been deleted!`) // Add who deleted it or whatever
            .setColor("#ff0000")
            .setTimestamp()
        
            emoji.client.channels.get(data.actionLogs).then(channel =>
                channel.send({embeds:  [embed]})
            )
        }
    }
}