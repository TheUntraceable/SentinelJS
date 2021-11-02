const {MessageEmbed} = require("discord.js")
module.exports = client => { 

    client.handle = async interaction => {
        
        const timer = ms => new Promise( res => setTimeout(res, ms));

        if(interaction.isCommand()) {
            if(!interaction.inGuild()) { 
                return await interaction.reply("Commands will only work within servers.")
            }

            const command = client.commands.get(interaction.commandName);

            if(!command) return;
            
            if(command.enabled === false) {
                return await interaction.reply(`${command.data.name} has been disabled.`)
            }
            
            if(command.cooldowns != undefined & command.cooldown == undefined || command.cooldowns == undefined & command.cooldown != undefined) {
                console.error(`${command.data.name} has not got a cooldowns list but does have a cooldown. Fix this.`)
            }

            if(!command.cooldowns == undefined) {
                if(command.cooldowns.has(interaction.member.id)) {
                    return await interaction.reply(`You are on cooldown. This cooldown will be gone <t:${Math.round(Date.now() / 1000) + command.cooldown}:R>, please try again later.`)
                }
            
            }
            if(command.implemented != undefined){
                if(command.implemented === false) {
                    return await interaction.reply({ephemeral:true,embeds : [new MessageEmbed().setTitle("This command isn't created yet!").setDescription("Hey there! Thanks for showing interest in Sentinel, but I regret to inform you that this command has not yet been implemented. To speed up and encourage my developers to make the commands, they have all of the commands setup on Discord's side, but not yet on their side, thus this command in not usable as of now! Keep an eye out for updates! Thanks, and sorry!").setColor("RANDOM")]})
                }
            }    
            try {
                await command.execute(interaction);
                if(command.cooldowns != undefined && command.cooldown != undefined) {

                    command.cooldowns.add(interaction.member.id)
    
                    await timer(command.cooldown * 1000)
        
                    command.cooldowns.delete(interaction.member.id)
    
                }
                interaction.client.data_analysis[command.data.name] += 1
                    
            } catch (error) {
    
                console.error(error);
    
                return interaction.followUp({ content: `There was an error while executing this command!\nError:${error}`, ephemeral: true });
            }
        } 

    }
}