
module.exports = {
    name: "messageReactionRemoveAll",
    once: false,
    async execute(message,reactions) {
        console.log(`${message.id}'s reactions have been removed.`)
    }
}