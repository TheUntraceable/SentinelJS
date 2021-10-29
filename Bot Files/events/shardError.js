module.exports = {
    name: "shardError",
    once: false, // My shards are so good they don't error. Yes  I copy and pasted this comment from the last file. I'm tired.
    async execute(error,shardId) {
        console.error(`Shard ${shardId} has raised the error ${error}!`)
    }
}