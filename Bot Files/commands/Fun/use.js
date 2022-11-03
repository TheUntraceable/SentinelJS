const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("use")
    .setDescription("Use an item.")
    .addStringOption(option =>
        option
        .setName("item")
        .setDescription("The item you would like to use. Make sure that this is in your ")
        .setRequired(true)
        .addChoices({name: "kids", value: "kids"})
        .addChoices({name: "water gun", value: "water gun"})
        .addChoices({name: "durex", value: "durex"})
        ),
    async execute(interaction) {
        await interaction.reply({content: "This command is not finished yet.", ephemeral: true})
    }
}