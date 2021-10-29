module.exports = {
    name: "rateLimit",
    once: false, // I would set this to true because I don't get rate limited UNLIKE SOME PEOPLE
    async execute(rateLimitData) { // Typing this so much is making me tired ;(
        console.log(`I have been ${rateLimitData.global? "globally (No I don't know what this means)" : ""} rate limited for ${rateLimitData.timeout * 1000}s from PATH: ${rateLimitData.path}, route: ${rateLimitData.route}.`)
    }
}