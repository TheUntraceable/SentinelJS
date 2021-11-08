
module.exports = {
    name: "messageReactionRemoveAll",
    once: false,
    async execute(message,reactions) {
        console.log(`${message.id}'s reactions have been removed. Jeez some admins really didn't like that one aye?`)
    }
}