const { MessageActionRow, MessageEmbed ,MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const get_commands = (client,category=undefined) => {

    const Configuration = new Set();
    const DataAnalysis = new Set();
    const Fun = new Set(); 
    const Invitelogger = new Set();
    const Moderating = new Set();
    const Status = new Set();
    const Unknown = new Set();

    for (command of client.command_names) {
                
        if(!category) {
            for (command of client.command_names) {

                const commandObject = client.commands.get(command)
                
                if (commandObject.category.toLowerCase() == "configuration") {
                    Configuration.add(command)    
                
                } else if(commandObject.category.toLowerCase() == "dataanalysis") {
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
                return {configuration : Configuration,fun:Fun,invitelogger:Invitelogger,dataanalysis:DataAnalysis,moderating:Moderating,status:Status,unknown:Unknown}
            }    
        }
    }
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

                console.log(dictionary)
                
                embed.addFields([
                    {
                        name : "Configuration",
                        value : dictionary["configuration"] ? dictionary["configuration"] : "None.",
                        inline : true
                    },{
                        name : "Data Analysis",
                        value : dictionary["dataanalysis"] ? dictionary["dataanalysis"] : "None.",
                        inline : true,
                    },{
                        name : "Fun",
                        value : dictionary["fun"] ? dictionary["fun"] : "None.",
                        inline : true,
                    },{
                        name : "InviteLogger",
                        value : dictionary["invitelogger"] ? dictionary["invitelogger"] : "None.",
                        inline : true,
                    },{
                        name : "Moderating",
                        value : dictionary["moderating"] ? dictionary["moderating"] : "None.",
                        inline : true,
                    },{
                        name : "Status",
                        value : dictionary["status"] ? dictionary["status"] : "None.",
                        inline : true,
                    }
                ])
        }


        await interaction.reply({embeds : [embed], components : [sel]});
    }
};