const { time } = require("@discordjs/builders")

module.exports = {
    name: "typingStart",
    once: false,
    async execute(typing) {
        const data = await typing.client.db.afk.findOne({where: typing.guild.id,owner: typing.user.id})

        if(!data) return;
        
        typing.channel.send(`${typing.user.tag} is back from being AFK! They were AFK for ${time(data.when),"R"}`)
    }
}