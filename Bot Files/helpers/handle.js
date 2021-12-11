const { MessageEmbed } = require("discord.js")

module.exports = client => { 

    client.handle = async interaction => {
        
        const timer = ms => new Promise( res => setTimeout(res, ms));

        if(interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName)

            if(!command) return;

            const typed = interaction.options.getFocused(true)

            const toSuggest = new Array();

            if(interaction.commandName == "help") {

                const suggested = interaction.client.commands.filter(c => c.name.startsWith(typed)).map(c => c.name)

                if(suggested.length > 0) {
                    for(suggestion of suggested) {
                        toSuggest.push({
                            name: suggestion.name,
                            value: suggestion.name
                        })
                    }
                    await interaction.respond(toSuggest)
                }
            }

        }

        if(interaction.isCommand()) {

            if(!interaction.inGuild()) { 
                return await interaction.reply("Commands will only work within servers.")
            }

            const command = client.commands.get(interaction.commandName);

            if(!command) return;

            let data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
            if(!data) data = await interaction.client.openAccount(interaction.guild)

            if(data.disabledCommands != undefined) {
                
                if(data.disabledCommands.includes(command.name)) {
                    return await interaction.reply(`${command.name} is disabled by Guild Admins.`)
                }
            }

            
            if(command.enabled === false) {
                return await interaction.reply(`${command.data.name} has been disabled by Untraceable.`)
            }
            
            if(command.cooldowns != undefined & command.cooldown == undefined || command.cooldowns == undefined & command.cooldown != undefined) {
                console.error(`${command.data.name} has not got a cooldowns list but does have a cooldown. Fix this.`)
            }

            if(command.cooldowns.has(interaction.user.id)) {
                    return await interaction.reply(`You are on cooldown. This cooldown will be gone <t:${Math.round(Date.now() / 1000) + command.cooldown}:R>, please try again later.`)
            }

            if(command.requiredPermissions != undefined) {
                const embed = new MessageEmbed()

                for(permission of command.requiredPermissions) {
                    if(!interaction.member.permissions.has(permission) && !interaction.guild.ownerId == interaction.user.id) {
                        embed
                        .setTitle(`You do not have the \`${permission}\` permission.`)
                        .setDescription(`You need \`${permission}\` to execute this command. Try again once you are sure you have this permission.`)
                        .setColor("#ff0000")
                        
                        return await interaction.reply({embeds: [embed]})
                    } else if(!interaction.guild.me.permissions.has(permission)) {
                        embed
                        .setTitle(`I do not have the \`${permission}\` permission.`)
                        .setDescription(`I need \`${permission}\` to execute this command. Try again once I have this permission.`)
                        .setColor("#ff0000")
                        
                        return await interaction.reply({embeds: [embed]})
                    }
                }
            }


            try {
                
                for(option in interaction.options.data) {
                    if(option.type == "USER") {
                        await interaction.client.openBank(option.member)
                    }
                }
                await interaction.client.openBank(interaction.member)
                await interaction.client.openAccount(interaction.guild)
                
                await command.execute(interaction);
                interaction.client.statcord.postCommand(interaction.commandName, interaction.user.id);
                
                if(command.cooldown) {

                    command.cooldowns.add(interaction.user.id)
    
                    await timer(command.cooldown * 1000)
        
                    command.cooldowns.delete(interaction.user.id)
    
                }
                
                command.uses ++

                if(command.category.toLowerCase() == "fun") {
                    const specialAmountToGive = Math.round(Math.random() * (50 - 10) + 10)
                    await interaction.client.db.users.updateOne({memberId: interaction.user.id},{$inc : {maxBank: specialAmountToGive}})
                }
 
                    
            } catch (error) {
    
                console.error(error);
    
                return interaction.reply({ content: `There was an error while executing this command!\nError:${error}`, ephemeral: true });
            }
        } 

    }
}