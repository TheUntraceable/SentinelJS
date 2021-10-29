module.exports = {
    name: "guildUnavailable",
    once: false,
    async execute(guild) {
        console.error(`${guild.name} has magically became unavailable! Now take off your wizard hat and get to fixing this.`)
    }
}