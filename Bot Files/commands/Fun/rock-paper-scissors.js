const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rock-paper-scissors")
    .setDescription("Play Rock Paper Scissors against me!")
    .addStringOption(option =>
        option
        .setName("move")
        .setDescription("What move you would like to make.")
        .setRequired(true)
        .addChoice("rock","rock")
        .addChoice("paper","paper")
        .addChoice("scissors","scissors")
    )
    .addStringOption(option =>
        option
        .setName("mode")
        .setDescription("What mode you would like to play.")
        .setRequired(true)
        .addChoice("standard","standard")
        .addChoice("impossible","impossible")
        ),
    implemented : false
    }
