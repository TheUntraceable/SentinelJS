const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist-word")
    .setDescription("Blacklist/Whitelist a word from being used.")
    .addSubcommand(command =>
        command
        .setName("view")
        .setDescription("View the blacklisted words.")
        )
        
    .addSubcommand(command =>
        command
        .setName("blacklist-or-whitelist")
        .setDescription("Wether you would like to blacklist/whitelist a word.")
        
        .addStringOption(option => 
            option
            .setName("word")
            .setDescription("The word to blacklist/whitelist.")
            .setRequired(true)
            )
    
        .addStringOption(option =>
            option
            .setName("whitelist-or-blacklist")
            .setDescription("Whether to whitelist or blacklist the word.")
            .setRequired(true)
            .addChoice("Whitelist", "whitelist")
            .addChoice("Blacklist", "blacklist")
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
        } else {
            // They want to add or remove a word from the blacklist
            const word = interaction.options.getString("word")
            if(interaction.options.getString("whitelist-or-blacklist") == "blacklist") {
                data.badWords.add(word)
            } else {
                data.badWords.remove(word)
            }
            await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {badWords: data.badWords}})
            return await interaction.reply(interaction.options.getString("whitelist-or-blacklist" == "whitelist"? `I have removed ${word} from the blacklist.` : `I have added ${word} to the blacklist.`))
        }
    }
}