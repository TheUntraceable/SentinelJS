const { MessageActionRow, MessageEmbed ,MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const get_commands = (client,category=undefined) => {
    data = new Array();
    for (command of client.command_names) {
        const Configuration = new Set();
        const DataAnalysis = new Set();
        const Fun = new Set(); 
        const Invitelogger = new Set();
        const Moderating = new Set();
        const Status = new Set();
        const Unknown = new Set();
                
        if(category === undefined) {
            for (command of client.command_names) {
                let commandObject = client.commands.get(command)
                if (commandObject.category.toLowerCase() == "configuration") {
                    Configuration.add(command)    
                
                } else if(commandObject.category.toLowerCase() == "dataAnalysis") {
                    DataAnalysis.add(command)
            
                } else if(commandObject.category.toLowerCase() == "fun") {
                    Fun.add(command)

                } else if(commandObject.category.toLowerCase() == "invitelogger") { 
                    Invitelogger.add(command)

                } else if(commandObject.category.toLowerCase() == "moderating") {
                    Moderating.add(command)

                } else if(commandObject.category.toLowerCase() == "status") {
                    Status.add(command)

                } else if(command.category.toLowerCase() == "theuntraceableonly") {
                    continue
                } else {
                    Unknown.add(command)
                }
                return [{configuration : Configuration,dataanalysis:DataAnalysis,fun:Fun,invitelogger:Invitelogger,moderating:Moderating,status:Status,unknown:Unknown}]
            }    
        }

}

    return data
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commandlist')
		.setDescription('Sends a list of all commands!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The command category to view.')
                .setRequired(false)),    
    usage : "/commandlist <category_of_commands>",
    cooldown : 5,
    cooldowns : new Set(),

    async execute(interaction) {            
        let message = "";
        const sel = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("CommandListInteraction")
                .setPlaceholder("Select what category of commands you would like to see.")
                .addOptions([
                    {
                        label : "Status",
                        description : "This will show all commands that are in the Status category!",
                        value : "status"
                    },{
                        label : "Configuration",
                        description : "This will show all commands that are in the Configuration category!",
                        value : "configuration"    
                    },{
                        label : "DataAnalysis",
                        description : "This will show all commands that are in the DataAnalysis category!",
                        value : "dataanalysis"    
                    },{
                        label : "Fun",
                        description : "This will show all commands that are in the Fun category!",
                        value : "fun"    
                    },{
                        label : "Moderating",
                        description : "This will show all commands that are in the Moderating category!",
                        value : "moderating"    
                    },
                ])
            )
            const embed = new MessageEmbed()
            .setTitle("Here are a list of all the available commands!")
            .setColor("#51ff00")
            .setDescription("This is a list of all the commands that are available to be used by almost anyone! ||(Except for the ones under Moderating which you need the correct permissions for.)||");
            
        if(!interaction.options.getString("category")) {
                const dictionary = get_commands(interaction.client)
                embed.addFields([
                    {
                        name : "Configuration",
                        value : dictionary["configuration"],
                        inline : true
                    },{
                        name : "Data Analysis",
                        value : dictionary["dataanalysis"],
                        inline : true,
                    },{
                        name : "Fun",
                        value : dictionary["fun"],
                        inline : true,
                    },{
                        name : "InviteLogger",
                        value : dictionary["fun"],
                        inline : true,
                    },{
                        name : "Moderating",
                        value : dictionary["moderating"],
                        inline : true,
                    },{
                        name : "Status",
                        value : dictionary["status"],
                        inline : true,
                    }
                ])
        }


        await interaction.reply({embeds : [embed], components : [sel]});
    }
};