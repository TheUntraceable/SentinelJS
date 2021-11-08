const { time } = require("@discordjs/builders") // Thanks Mullp.

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if(!message.guild) return
        await message.client.openAccount(message.guild) // Add anti spam later once you finish stuff.
        const afk_data = await message.client.db.guilds.find({where: message.guild.id}).toArray()
        for(afk_person of afk_data) {
            if(message.mentions.has(afk_person.owner)) {
                message.channel.send(`They are AFK! They have been AFK for ${time(afk_person.when),"R"}. Reason: ${afk_person.reason}`)
            }
        }
    }
}