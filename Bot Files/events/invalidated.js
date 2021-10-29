module.exports = {
    name: "invalidated",
    once: true, // If Discord invalidate me, I'll invalidate them. This is a joke please don't ban me.
    async execute() {
        console.log("Our session just got invalidated! YIPEE RIGHT? Well go turn me back on.")
        return process.exit(1); //  Please don't do this on startup or when I'm asleep, thanks, bye bye.
    }
}