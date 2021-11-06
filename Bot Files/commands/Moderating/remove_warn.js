const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-warn")
    .setDescription("Remove a warn from a user.")
    .addUserOption(option => 
        option
        .setName("user")
        .setDescription("The user's warn you would like to remove")
        .setRequired(true)
        )
    .addIntegerOption(option =>
        option
        .setName("id")
        .setDescription("The Id of the war you'd like to delete. If this is not set, all warns will be deleted.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getMember("user")
        const id = interaction.options.getInteger("id")
        if(!id) {
            await interaction.client.db.users.updateOne({memberId: user},{$set: {warns: []}})
            return await interaction.reply(`Removed all warns from ${user.displayName}.`)
        }

        await interaction.client.db.users.updateOne({memberId: user},{$pull: {warns: {count: id}}})
        return await interaction.reply(`Removed warn ${count} from ${user.displayName}.`)
    

    }
}