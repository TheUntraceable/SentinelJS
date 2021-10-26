const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Lets you view the leaderboard.")
    .addIntegerOption(option =>
        option
        .setName("count")
        .setDescription("The amount of people you would like to see on the leaderboard.")
        .setRequired(false)
        )
    ,
    implemented: false
}