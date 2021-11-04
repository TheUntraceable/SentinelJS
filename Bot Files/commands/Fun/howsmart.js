const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("howsmart")
    .setDescription("See how smart someone is.")
    .addUserOption(option => 
        option
        .setName("member")
        .setDescription("The member you want to see's intelligence.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getMember("member") || interaction.member

        const smartness = Math.floor(Math.random() * Math.floor(100))

        await interaction.reply(`${user.displayName} is ${smartness}% smart.`)
    }
}
