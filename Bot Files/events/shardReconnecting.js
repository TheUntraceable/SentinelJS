module.exports = {
    name: "shardReconnecting",
    once: false, // My shards are so good they reconnect because Discord has some sort of fear of keeping connected to me for too long. Yes  I copy and pasted this comment from the last file. I'm tired. THIS COMMENT WAS FROM 5 FILES AGO WOAH
    async execute(id) {
        console.log(`Shard ${id} is reconnecting...`)
    }
}