const {MessageEmbed} = require("discord.js")
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
module.exports = client => { 

    client.handle = async interaction => {
        
        const timer = ms => new Promise( res => setTimeout(res, ms));

        if(interaction.isContextMenu()) {
            if(interaction.customId == "CommandListInteraction") {
                const payload = get_commands(interaction.client,interaction.values[0])

                await interaction.update({
                    embeds : [new MessageEmbed().setTitle(`${interaction.values[0]} Commands!`).setDescription(`This is a list of ${interaction.values[0]}'s commands.`.addField("Commands: ",payload,true))],
                    components: [interaction.component.options]
                })
            }
        }
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if(!command) return;
            if(!command.cooldowns) {
                console.error(`${command.data.name} has not got a cooldowns list but does have a cooldown. Fix this.`)
            }
    
            if(command.cooldowns.has(interaction.member.id)) {
                return await interaction.reply(`You are on cooldown. This command has ${command.cooldown}, please try again later.`)
            }
            
            try {
                await command.execute(interaction);
                console.log(interaction.client.data_analysis)
                interaction.client.data_analysis[command.data.name] += 1
                console.log(interaction.client.data_analysis[command.data.name])
                
                command.cooldowns.add(interaction.member.id)
    
                await timer(command.cooldown * 1000)
    
                command.cooldowns.delete(interaction.member.id)
    
            } catch (error) {
    
                console.error(error);
    
                return interaction.reply({ content: `There was an error while executing this command!\nError:${error}`, ephemeral: true });
            }
        } 

    }
}