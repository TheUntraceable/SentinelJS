module.exports = {
    name: "warn",
    once: false, // Sentinel is so cool, that it doesn't get warned, it warns Discord! Discord best not terminate my account for this, there's too many comments talking about how cool Sentinel is... The jokes don't stop.
    async execute(info) {
        console.log(`Hey! You just got warning from Mr Discord Person! Here is their message. ${info}`)
    }
}