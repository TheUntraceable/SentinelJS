module.exports = {
    name: "guildUnavailable",
    once: false,
    async execute(guild) {
        await guild.client.openAccount(guild)
        console.error(`${guild.name} has magically became unavailable! Now take off your wizard hat and get to fixing this.`) // See what I did there?
    }
}