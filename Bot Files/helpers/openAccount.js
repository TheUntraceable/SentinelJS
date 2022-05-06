module.exports = client => {

    client.openAccount = async guild => {

            const data = await guild.client.db.guilds.findOne({"guildId" : guild.id})
            if(!data) {
                await guild.client.db.guilds.insertOne({
                    guildId: guild.id,
                    messageLogs : false,
                    actionLogs :  false,
                    suspiciousAccounts : false,
                    memberJoins :  false,
                    badWords: new Set(),
                    memberUpdates : false,
                    autoRoles: new Array(),
                    disabledCommands: new Array(),
                    voiceLogs: false,
                    antiSpammer : false, // I have set it to be disabled by default because that's going to take away a load of weight from the Antispammer cache.
                })

            }
    }
    
    client.openBank = async member => {
        const data = await member.client.db.users.findOne({memberId: member.id})
        if(data == null) {
            await member.client.db.users.insertOne({
                memberId  : member.id,
                wallet : 100,
                bank : 1000,
                maxBank : 1000,    
                passive : false,
                warns : [],
                inventory : []
            })
        }

    }
}