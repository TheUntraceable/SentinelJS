module.exports = {
    name: "guildCreate",
    once: false,
    async execute(guild) {
        await guild.client.openAccount(guild)
        
    }
}