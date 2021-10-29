module.exports = {
    name: "guildDelete",
    once: false,
    
    async execute(guild) {
        await guild.client.db.guilds.deleteOne({
            guildId : guild.id
        })
    }
}