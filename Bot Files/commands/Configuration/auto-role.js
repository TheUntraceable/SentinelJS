const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("auto-role")
    .setDescription("I will give these roles to the people who join.")
    .addSubcommand(command =>
        command
        .setName("add")
        .setDescription("Add a role to the list of roles that I should give to the new members.")
        
        .addRoleOption(option =>
            option
            .setName("role")
            .setDescription("The role you'd like to add to this list.")
            .setRequired(true)
            )
        )
    .addSubcommand(command =>
        command
        .setName("remove")
        .setDescription("Remove a role from the list of roles that I should give to new members.") 
        
        .addRoleOption(option => 
            option
            .setName("role")
            .setDescription("The role you'd like to remove from this list.")
            .setRequired(true)
            )
        )
    .addSubcommand(command =>
        command
        .setName("view")
        .setDescription("View the roles that will be given to new members.")
        ),
    cooldown: 5,
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})        

        if(subcommand == "remove" || subcommand == "add") {
            const role = interaction.options.getRole("role")

            if(subcommand == remove) {
                if(!data.autoRoles.includes(role.id)) {
                    return await interaction.reply(`${role.name} is not in the auto-roles list.`)
                } else {
                    data.autoRoles.splice(data.autoRoles.indexOf(role.id), 1)
                    await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {autoRoles: data.autoRoles}})
                    await interaction.reply(`I have removed ${role.name} from the auto roles list.`)
                }
            } else {
                if(data.autoRoles.includes(role.id)) {
                    return await interaction.reply(`${role.name} is already in the auto roles list!`)
                }

                data.autoRoles.push(role.id)

                await interaction.client.db.guilds.updateOne({guildId: interaction.guild.id}, {$set: {autoRoles: data.autoRoles}})
                await interaction.reply(`I have added ${role.name} to the auto roles list.`)
            }
        } else {
            let m = "";
            for (role of data.autoRoles) {
                m += `${interaction.guild.roles.cache.get(role).name}\n`
            }
            return await interaction.reply(`The following roles will be granted to anyone who joins the guild.\n${m}`)
        }
        
        

    }
}