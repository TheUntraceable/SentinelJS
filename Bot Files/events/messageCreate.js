const AntiSpam = require("discord-anti-spam")
const { time } = require("@discordjs/builders") // Thanks Mullp.

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {

        if(!message.guild) return

        await message.client.openAccount(message.guild) // Add anti spam later once you finish stuff.

        const afk_data = await message.client.db.afk.find({where: message.guild.id}).toArray()

        for(afk_person of afk_data) {
            if(message.mentions.members.has(message.client.users.resolve(afk_person.owner))) {
                message.channel.send(`They are AFK! They have been AFK for ${time(afk_person.when),"R"}. Reason: ${afk_person.reason}`)
            }
        }

        const data = await message.client.db.guilds.findOne({guildId: message.guild.id})

        if(data.badWords.size > 0) {
            for(word of data.badWords) {
                if(message.content.includes(word)) {
                    await message.delete()
                }
            }    
        }

        if(data.antiSpammer) {
            if(message.author.id == message.client.user.id) return
            
            let antispam = message.client.antispammers.get(message.guild.id) 
            
            if(!antispam) {
                let antispam = new AntiSpam({
                    warnThreshold : 3,
                    kickThreshold : 7,
                    muteThreshold : 5,
                    banThreshold : 15,
                    maxDuplicatesWarn : 3,
                    maxDuplicatesKick  : 7,
                    maxDuplicatesMute : 5,
                    maxDuplicatesBan : 15,
                    muteRoleName : data.muteRole,
                    modLogsChannelName : data.actionLogs,
                    modLogsEnabled : true,
                    errorMessages : true,
                    warnEnabled : true,
                    kickEnabled : true,
                    muteEnabled : true,
                    banEnabled : true,
                    deleteMessagesAfterBanForPastDays : 14,
                    removeMessages : true,	
                    removeBotMessages : false,
                    })

                message.client.antispammers.set(message.guild.id, antispam)
            }

            antispam.message(message)
        }
    }
}