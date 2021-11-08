const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageReactionRemove",
    once: false,
    async execute(reaction,user) {
        await reaction.client.openAccount(reaction.message.guild)
        const data = await reaction.client.db.guilds.findOne({guildId: reaction.message.guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A reaction has been removed!")
            .setDescription(`${user.tag} has removed their reaction to ${reaction.message} with ${reaction.emoji}.`)
            .setColor("#ff0000")
            .setTimestamp()
            reaction.client.channels.fetch(data.messageLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}