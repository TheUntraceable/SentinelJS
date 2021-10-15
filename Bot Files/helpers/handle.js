module.exports = client => { 

    client.handle = async interaction => {
        
        const timer = ms => new Promise( res => setTimeout(res, ms));

        if (!interaction.isCommand()) return;

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

            command.cooldowns.add(interaction.member.id)

            await timer(command.cooldown * 1000)

            command.cooldowns.delete(interaction.member.id)           

        } catch (error) {

            console.error(error);

            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}