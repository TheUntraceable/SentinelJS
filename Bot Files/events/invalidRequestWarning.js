module.exports = {
    name: "invalidRequestWarning.js",
    once: false, // You won't guess how many times I messed up the spelling on this
    async execute(invalidRequestWarningData) {
        console.error(`Well done! You have made ${invalidRequestWarningData.count} invalid requests! Be proud, this is what you made.`)
    }
}