const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "emojiUpdate",
    once: false,
    async execute(before,after) {
        await interaction.client.openAccount(channel.guild)

        const data = await after.client.db.guilds.findOne({
            guildId : before.guild.id
        })
        if(data.actionLogs != false) {

            const embed = new MessageEmbed()
            .setTitle("An emoji has been updated!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`) // Add who deleted it or whatever
            .setColor("YELLOW")
            .setTimestamp()
        
            emoji.client.channels.get(data.actionLogs).then(channel =>
                channel.send({embeds:  [embed]})
            )
        }
    }
}