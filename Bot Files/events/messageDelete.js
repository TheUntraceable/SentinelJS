const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageDelete",
    once: false, // If this was in my server this would be set to true.
    async execute(message) {
        const data = await message.client.db.guilds.findOne({guildId : message.guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A message has been deleted!")
            .setDescription(`A message from ${message.author.displayName} with the content *"${message.content}"* has been deleted!`)
            .setColor("#ff0000")
            .setTimestamp()

            message.client.channels.fetch(messageLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}