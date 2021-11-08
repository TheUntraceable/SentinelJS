const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildUpdate",
    once: false, // I really have the need to make a joke here but I can't think of one. Hah if you look into the commits history, you'd see that this was only just added. And that's because I finally got a joke. If this was my guild and no one motivated me to make the bot, this'd be true. I've gone to far with these jokes dear God save me.
    async execute(before,after) {
        await before.client.openAccount(before)

        const data = await before.client.db.guilds.findOne({guildId: before.id})

        if(data.actionLogs != false) {
            const embed = new MessageEmbed()
            .setName("Guild Update!")
            .setDescription(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`)
            .setColor("YELLOW")
            .setTimestamp()

            after.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
                )
        }
    }
}