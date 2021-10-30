const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("voice-logs")
    .setDescription("Set the channel where I should send logs regarding voice states.")
    
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding voice states.")
        .setRequired(false)
        ),
        
    async execute(interaction) {
        
        if(!interaction.options.get("channel")) {
            
            await interaction.client.db.guilds.updateOne({
                guildId: interaction.guild.id
            },{
                $set : {
                    voiceLogs : false
                }
            })
            return await interaction.reply("I have disabled Voice-Logs.")
        }

        if(interaction.options.getChannel("channel").type != "GUILD_TEXT") {

            return await interaction.reply(`You need to set the channel to be a normal text channel, not ${interaction.options.getChannel("channel").type}`)

        } else if(interaction.options.getChannel("channel") == "GUILD_TEXT") {

            await interaction.client.db.guilds.updateOne({
                guildId : interaction.guild.id
            },{
                $set : {
                    voiceLogs: interaction.options.getChannel("channel").id 
                }
            })

        }

    }
}