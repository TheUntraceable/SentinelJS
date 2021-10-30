
module.exports = {

    name: "userUpdate",
    once: false,
    async execute(before,after) {
        console.log(`${before.name == after.name ? before.name : `${before.name}/${after.name}`} has been updated!`) // Cannot send this in guilds because I can't find what mutual servers me and the User have. Correct me if I am wrong. Thanks :D
    }
}