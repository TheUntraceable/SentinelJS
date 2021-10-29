const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "messageReactionRemoveEmoji",
    once: false,
    async execute(reaction) {
        const data = await reaction.client.db.guilds.findOne({guildId : reaction.message.guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A bot has removed a reaction from a message.")
            .setDescription(`A bot has removed a reaction (${reaction.emoji}) from ${reaction.message.content}. [Jump to message](${reaction.message.jumpUrl})`)
            .setColor("#ff0000")
            .setTimestamp()
            reaction.client.channels.fetch(data.messageLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}