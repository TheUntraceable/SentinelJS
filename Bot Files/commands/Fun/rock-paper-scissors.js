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
        .addChoices({name: "rock", value: "rock"})
        .addChoices({name: "paper", value: "paper"})
        .addChoices({name: "scissors", value: "scissors"})
    )
    .addStringOption(option =>
        option
        .setName("mode")
        .setDescription("What mode you would like to play.")
        .setRequired(true)
        .addChoices({name: "Standard", value: "standard"})
        .addChoices({name: "Impossible", value: "impossible"})
        ),
    cooldown: 5,
    async execute(interaction) {

        
        const mode = interaction.options.getString("mode")
        const move = interaction.options.getString("move")
        
        if(mode == "impossible") {
            switch (move) {
                case "rock":
                    return await interaction.reply("You lose! I chose paper and you chose rock!")
                    case "paper":
                    return await interaction.reply("You lose! I chose scissors and you chose paper!")
                case "scissors":
                    return await interaction.reply("You lose! I chose rock and you chose scissors!")
            }
        } else {
            // Play fair now.
            const possibleMoves = ["rock","paper","scissors"]
            
            const botMove = possibleMoves[Math.floor(Math.random() * 3)]
        
            switch (move) {
                case "rock":
                    switch (botMove) {
                        case "rock":
                            return await interaction.reply("We tied! You both chose rock!")
                        case "paper":
                            return await interaction.reply("You lose! I chose paper and you chose rock!")
                        case "scissors":
                            return await interaction.reply("You win! I chose scissors and you chose rock!")
                    }
                case "paper":
                    switch (botMove) {
                        case "rock":
                            return await interaction.reply("You win! I chose rock and you chose paper!")
                        case "paper":
                            return await interaction.reply("We tied! You both chose paper!")
                        case "scissors":
                            return await interaction.reply("You lose! I chose scissors and you chose paper!")
                    }
                case "scissors":
                    switch (botMove) {
                        case "rock":
                            return await interaction.reply("You lose! I chose rock and you chose scissors!")
                        case "paper":
                            return await interaction.reply("You win! I chose paper and you chose scissors!")
                        case "scissors":
                            return await interaction.reply("We tied! You both chose scissors!")
                    }
                }
        }   
    }
}