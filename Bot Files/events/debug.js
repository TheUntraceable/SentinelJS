module.exports = {
    name: "debug",
    once: false, // I don't have a clue if this emits once or not.
    async execute(info) {
        console.log(info)
    }
}