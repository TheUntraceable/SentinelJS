module.exports = {
    name: "interactionCreate",

    once: false, // My bot's dead so this is gonna be true but maybe people are just taking the source :(

    async execute(interaction) {
        await interaction.client.handle(interaction)
    }
}