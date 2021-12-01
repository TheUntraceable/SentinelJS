const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("slash-command-list")
    .setDescription("List all slash commands along with their Id, mainly meant for The Untraceable but...")
    .addStringOption(option =>
        option
        .setName("command")
        .setDescription("The command you want to see the Id of.")
        .setRequired(false)
        )
    .addIntegerOption(option => 
        option
        .setName("id")
        .setDescription("The Id of the command you want to see.")
        .setRequired(false)
        ),
    
    cooldown: 5,

    async execute(interaction) {
        let m = ""

        const command = interaction.options.getString("command") || interaction.options.getInteger("id") || "all" 
        
        if(!interaction.client.application?.owner) await interaction.client.application?.fetch()
        const commands = await interaction.client.application.commands.fetch()

        if(command === "all") {
            
            for(applicationCommand of commands.values()) {
                m += `\`${applicationCommand.name}\` - \`${applicationCommand.id}\`\n`
            }

            return await interaction.reply({content: m, ephemeral: true})

        } else if(typeof(command) == "number") {
                
                const command = commands.get(command)
    
                if(!command) return await interaction.reply({content: "Command not found.", ephemeral: true})
    
                return await interaction.reply({content: `\`${command.name}\` - \`${command.id}\``, ephemeral: true})
    
        } 

        const _command = commands.find(c => c.name.toLowerCase() === command.toLowerCase())

        if(!_command) return await interaction.reply({content: "Command not found.", ephemeral: true})

        return await interaction.reply({content: `\`${_command.name}\` - \`${_command.id}\``, ephemeral: true})
    }
}