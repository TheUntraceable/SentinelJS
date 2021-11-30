const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a user.") // Haha snitches. I kinda wanna make the command blacklist you and be a troll but :shrug:
    .addStringOption(option => 
        option
        .setName("reason")
        .setDescription("Why you would like to report them.")
        .setRequired(true)
        )
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("The user you would like to report.")
            .setRequired(true)
        ),
    cooldown: 15,
    async execute(interaction) {
        const member = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
        
        if(!data.reportChannel) return await interaction.reply("There is no report channel set up.")

        interaction.client.channels.fetch(data.reportChannel).then(channel  => 
            channel.send(`${interaction.member} has reported ${member}. Reason: ${reason}.`)
        )
        await interaction.reply(`I have reported ${interaction.member}. Reason: ${reason}.`)
    }
}