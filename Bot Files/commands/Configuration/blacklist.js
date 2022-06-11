const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist a word.")
    .addSubcommand(command =>
        command
        .setName("view")
        .setDescription("View the blacklisted words.")
        )
        
    .addSubcommand(command =>
        command
        .setName("add")
        .setDescription("Wether you would like to blacklist/whitelist a word.")
        
        .addStringOption(option => 
            option
            .setName("word")
            .setDescription("The word to blacklist/whitelist.")
            .setRequired(true)
            )
        )
    .addSubcommand(command => 
        command
        .setName("remove")
        .setDescription("Remove a word from the blacklist.")
        .addStringOption(option =>
            option
            .setName("word")
            .setDescription("The word to remove from the blacklist.")
            .setRequired(true)
            )
        ),
    cooldown: 3,
    async execute(interaction) {
        
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
        const command = interaction.options.getSubcommand()

        if(command == "view") {
            let m = "Here are all the blacklisted words.\n"
            for(word in data.badWords) {
                m += `${word}\n`
            }
            return await interaction.reply({ephemeral: true, content: m})

        } else if(command == "add") {

            const word = interaction.options.getString("word")

            if(data.badWords.includes(word)) {
                return await interaction.reply({ephemeral: true, content: `${word} is already blacklisted.`})
            }

            data.badWords.add(word)

            await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {badWords: data.badWords}})

            return await interaction.reply(interaction.options.getString("whitelist-or-blacklist" == "whitelist"? `I have removed ${word} from the blacklist.` : `I have added ${word} to the blacklist.`))

        } else if(command == "remove") {
            const word = interaction.options.getString("word")
            if(!data.badWords.includes(word)) {
                return await interaction.reply({ephemeral: true, content: `${word} is not blacklisted.`})
            }
            data.badWords = data.badWords.filter(w => w != word)
            await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {badWords: data.badWords}})
            return await interaction.reply(`I have removed ${word} from the blacklist.`)
        }
    }
}