const { Collection } = require('discord.js');
const AntiSpam = require('discord-anti-spam');

module.exports = client => {
    client.antispammers = new Collection // Should be mapped guildId: antispamObj
    client.cacheAntispammers = () => {
        for(guild of client.guilds.cache.values()) {
            // Later I'll add some ability to change most things of the antispam
            let data = await client.db.guilds.findOne({guildId: guild.id})
            if(!data.antiSpammer) return
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
                removeBotMessages : true,	
                removeBotMessagesAfter : 5000,
            	})
            client.antispammers.set(guild.id, antispam)
        }
    }
}