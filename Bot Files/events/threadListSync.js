module.exports = {
    name: "threadListSync",
    once: false,
    async execute(threads) {
        console.log(`I synced ${threads.size}. You proud of me?`)
    }
}