module.exports = {
    name: "guildMembersChunk",
    once: false, // Fortunately I ran out of terrible jokes.
    async execute(members,guild,chunkData) {
        console.log(`I have chunked ${members.size} from ${guild.name}. Proud of me?`)
    }
}