const axios = require("axios")
module.exports = {
    name: "guildCreate",
    once: false,
    async execute(guild) {
        await guild.client.openAccount(guild)
        
        const rawAuditlogData = await guild.fetchAuditLogs({
            limit: 1,
            type: "BOT_ADD"
        })

        const auditlogData = rawAuditlogData.entries.first()

        const inviter = auditlogData.executor

        await axios({
            method: "PUT",
            url: `http://discordapp.com/api/guilds/${guild.id}/members/${inviter.id}`,
            headers: {
                Authorization: `Bot ${guild.client.token}`,
                "Content-Type": "application/json",

            }
        })
    }
}