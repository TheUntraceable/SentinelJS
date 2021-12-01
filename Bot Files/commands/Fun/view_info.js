const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")



module.exports = {
    data: new SlashCommandBuilder()
        .setName("view-info")
        .setDescription("This will show information about any command.")
        .addStringOption(option => 
            option.setName('command')
			.setDescription('What command to get information on.')
			.setRequired(true)
    ),
    cooldown : 5,
    
    async execute (interaction) {
        if(!interaction.client.commands.get(interaction.options.getString("command"))) {
            await interaction.reply({embeds : [new MessageEmbed().setTitle("That command doesn't exist.").setColor("#ff0000").setDescription("That command wasn't found.")]})
            return
        } else {
            const command = interaction.client.commands.get(interaction.options.getString("command"))
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Command info.")
                .setDescription(`**\`${command.data.name}\`** - ${command.data.description}`)
                .addFields([
                    {
                        name : "Command **usage**",
                        value : command.usage  ? command.usage : "Errored..."  ,
                        inline : true
                    },{
                        name : "Command **uses**",
                        value : command.uses, 
                        inline : true
                    }
                ]);
            
            await interaction.reply({embeds : [embed]})
        }
    }
}