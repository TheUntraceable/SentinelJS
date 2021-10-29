module.exports = {
    name: "shardError",
    once: true, // My shards are so good they don't even connect to Discord, Discord connects to them. Yes  I copy and pasted this comment from the last file. I'm tired.
    async execute(id,unavailableGuilds) {
        console.log(`Shard ${id} is ready and can't see ${unavailableGuilds.size} guilds. Amazing isn't it?`)
    }
}