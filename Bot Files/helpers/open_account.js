module.exports = client => {
    client.open_account = async (guild) => {
        const data = await guild.client.db.guilds.findOne({"guildId" : guild.id})
        if(!data) {
            await guild.client.db.guilds.insertOne({
                guildId: guild.id,
                messageLogs : false,
                actionLogs :  false,
                suspiciousAccounts : false,
                memberJoins :  false,
                memberUpdates : false,
                antiSpammer : false, // I have set it to be disabled by default because that's going to take away a load of weight from the Antispammer cache.
                userUpdatesChannel : false,
            })
        }
    }
}