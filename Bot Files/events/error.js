module.exports = {
    name: "error",
    once: false, // If I was good at coding this would be  true :sunglasses:
    async execute(error) {
        console.error(error)
    }
}