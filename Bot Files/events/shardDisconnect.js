module.exports = {
    name: "shardDisconnect",
    once: false, // My shards are so good they don't get disconnected at all.
    async execute(event,id) {
        console.error(`Shard ${id} has disconnected!`)
    }
}