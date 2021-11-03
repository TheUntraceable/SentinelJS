const { MessageActionRow, MessageEmbed ,MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const getCommands = (client,category=undefined) => {

    let Payload = ""
    let Configuration = ""
    let Fun = "" 
    // const Invitelogger = ""
    let Moderating = ""
    let Status = ""
    
    if(!category) {
        for (command of client.commands.keys()) {
            const commandObject = client.commands.get(command);

            if (commandObject.category.toLowerCase() == "configuration") {
                Configuration += `\`${command}\`,`

            } else if(commandObject.category.toLowerCase() == "fun") {
                Fun += `\`${command}\`,`

            } else if(commandObject.category.toLowerCase() == "invitelogger") { 
                Invitelogger += `\`${command}\`,`

            } else if(commandObject.category.toLowerCase() == "moderating") {
                Moderating += `\`${command}\`,`

            } else if(commandObject.category.toLowerCase() == "status") {
                Status += `\`${command}\`,`
            
            }
        }
        Configuration.slice(0, -1)
        Fun.slice(0, -1)
        Moderating.slice(0, -1)
        Status.slice(0, -1)

        return {configuration : Configuration, fun:Fun, moderating:Moderating, status:Status}; // Add back invite logger here.
    } else {
        for(command of client.commands.keys()) {
            const commandObject = client.commands.get(command)
            if(commandObject.category == category) {
                Payload += `\`${command}\`,`
            }
        }
        return Payload;
    }
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('commandlist')
		.setDescription('Sends a list of all commands!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The command category to view.')
                .setRequired(false)
                .addChoice("Status","status")
                .addChoice("Moderating","moderating")
                .addChoice("Fun","fun")
                .addChoice("Configuration","configuration")
                ),

    cooldown : 5,
    cooldowns : new Set(),

    async execute(interaction) {
        const category = interaction.options.getString("category")
        
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
                        label : "Fun",
                        description : "This will show all commands that are in the Fun category!",
                        value : "fun"    
                    },{
                        label : "Moderating",
                        description : "This will show all commands that are in the Moderating category!",
                        value : "moderating"
                    },
                ])
            );
        
        let embed = new MessageEmbed()
            .setTitle("Here are a list of all the available commands!")
            .setColor("#51ff00")
            .setDescription("This is a list of all the commands that are available to be used by almost anyone! ||(Except for the ones under Moderating which you need the correct permissions for.)||")

            if(!category) {
                const dictionary = getCommands(interaction.client);
                embed.addFields([
                    {
                        name : "Configuration",
                        value : dictionary["configuration"] ? dictionary["configuration"] : "None.",
                        inline : true
                    },,{
                        name : "Fun",
                        value : dictionary["fun"] ? dictionary["fun"] : "None.",
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
                ]);
            } else {
                const payload = getCommands(interaction.client,interaction.options.getString("category"))
                return await interaction.reply({embeds : [new MessageEmbed().setTitle(`${interaction.options.getString("category")} Commands!`).setDescription(`This is a list of ${category}'s commands.`).addField("Commands: ",payload,true)],components: [sel]})
            }

        await interaction.reply({embeds : [embed],components: [sel]});
    }
}