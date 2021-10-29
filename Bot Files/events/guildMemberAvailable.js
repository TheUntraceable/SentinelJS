module.exports = {
    name: "guildMemberAvailable",
    once: false,
    async execute(member) {
        console.log(`${member.tag} has become available!`)
    }
}