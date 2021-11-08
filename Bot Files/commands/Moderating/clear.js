const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deleted an amount of messages")
    .addIntegerOption(option =>
        option
        .setName("amount")
        .setDescription("The amount of messages you would like to have deleted in chat.")
        .setRequired(true)
        )
    .addUserOption(option =>
        option
        .setName("author")
        .setDescription("The author of the messages. This will only let messages sent by this user are deleted.")
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName("regex")
        .setDescription("The regex the messages must match in order to be deleted.")
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName("string")
        .setDescription("The string which must be included within the messages in order to be deleted.")
        .setRequired(false)
        )
    .addRoleOption(option =>
        option
        .setName("role")
        .setDescription("The role that the author of the messages must have in order to be deleted.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger("amount")
        if(amount > 100 || amount <= 0) {
            return await interaction.reply("The most messages you can delete is 100 and the least is 1.")
        }
        
        const toDelete = new Array();
        const messages = interaction.channel.messages.fetch({limit: amount})

        for(const message of messages.values()) {

            const author = interaction.options.getMember("author") || message.author
            const regex = interaction.options.getString("regex") || /.*/
            const string = interaction.options.getString("string") || ""
            const role = interaction.options.getRole("role") || message.author.roles.highest

            if(message.author.id == author.id && regex.test(message.content) && message.content.includes(string) && message.author.roles.has(role)) {
                toDelete.push(message.id)
            }
        }
        interaction.channel.bulkDelete(toDelete,true)
            .then(messages =>
                interaction.reply(`I have deleted ${messages.size} messages!`)           
            ).catch(
                console.error
            )
    }

}