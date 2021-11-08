const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageReactionAdd",
    once: false,
    async execute(reaction,user) {
        await reaction.client.openAccount(reaction.message.guild)
        const data = await reaction.client.db.guilds.findOne({guildId: reaction.message.guild.id})
        if(data.messageLogs != false) {
            const embed = new MessageEmbed()
            .setTitle("A reaction has been added!")
            .setDescription(`${user.tag} has reacted to ${reaction.message} with ${reaction.emoji}.`)
            .setColor("#51ff00")
            .setTimestamp()
            reaction.client.channels.fetch(data.messageLogs).then(channel =>
                channel.send({embeds : [embed]})
                )
        }
    }
}