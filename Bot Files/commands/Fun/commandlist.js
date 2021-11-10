const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const getCommands = (client) => {

    let Configuration = ""
    let Fun = "" 
    // const Invitelogger = ""
    let Moderating = ""
    let Status = ""
    
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
        Configuration.slice(0, -1)
        Fun.slice(0, -1)
        Moderating.slice(0, -1)
        Status.slice(0, -1)

        return {configuration : Configuration, fun:Fun, moderating:Moderating, status:Status}; // Add back invite logger here.
    }
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('commandlist')
		.setDescription('Sends a list of all commands!'),

    cooldown : 5,
    cooldowns : new Set(),

    async execute(interaction) {

        let embed = new MessageEmbed()
            .setTitle("Here are a list of all the available commands!")
            .setColor("#51ff00")
            .setDescription("This is a list of all the commands that are available to be used by almost anyone! ||(Except for the ones under Moderating which you need the correct permissions for.)||")

        const dictionary = getCommands(interaction.client);

        embed.addFields([
            {
                name : "Configuration",
                value : dictionary["configuration"] ? dictionary["configuration"] : "None.",
                inline : false
            },,{
                name : "Fun",
                value : dictionary["fun"] ? dictionary["fun"] : "None.",
                inline : false,
            },{
                name : "Moderating",
                value : dictionary["moderating"] ? dictionary["moderating"] : "None.",
                inline : false,
            },{
                name : "Status",
                value : dictionary["status"] ? dictionary["status"] : "None.",
                inline : false,
            }
        ]);

        await interaction.reply({embeds : [embed],components: [sel]});
    }
}