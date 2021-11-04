const { MessageEmbed } = require("discord.js")

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

module.exports = client => { 

    client.handle = async interaction => {
        
        const timer = ms => new Promise( res => setTimeout(res, ms));

        if(interaction.isSelectMenu()) {
            if(interaction.customId == "CommandListInteraction") {
                console.log(interaction.values)
                const payload = getCommands(interaction.client,interaction.values[0])

                await interaction.update({
                    embeds : [new MessageEmbed().setTitle(`${interaction.values[0]} Commands!`).setDescription(`This is a list of ${interaction.values[0]}'s commands.`).addField("Commands: ",payload,true)],
                    components: [interaction.component.options]
                })
            
            }
        }

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
                await interaction.client.openBank(interaction.member)
                await interaction.client.openAccount(interaction.guild)
                await command.execute(interaction);
                if(command.category.toLowerCase() == "fun"){
                    const specialAmountToGive = Math.round(Math.random() * (50 - 10) + 10)
                    await interaction.client.db.users.updateOne({memberId: interaction.user.id},{$inc : {maxBank: specialAmountToGive}})
                }
 
                if(command.cooldowns != undefined && command.cooldown != undefined) {

                    command.cooldowns.add(interaction.member.id)
    
                    await timer(command.cooldown * 1000)
        
                    command.cooldowns.delete(interaction.member.id)
    
                }
                interaction.client.data_analysis[command.data.name] += 1
                    
            } catch (error) {
    
                console.error(error);
    
                return interaction.reply({ content: `There was an error while executing this command!\nError:${error}`, ephemeral: true });
            }
        } 

    }
}