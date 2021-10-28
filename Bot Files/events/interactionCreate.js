module.exports = {
    name: "interactionCreate",

    once: false,

    async execute(interaction) {
        await interaction.client.handle(interaction)
    }
}