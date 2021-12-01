const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("The slash command which covers all tag commands.")
    
    .addSubcommand(command =>
        command
        
        .setName("create")
        .setDescription("Create a tag.")
        
        .addStringOption(option =>
            option
            .setName("name")
            .setDescription("Name of the tag.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option
            .setName("contents")
            .setDescription("Contents of the tag.")
            .setRequired(true)
            )
        )
    .addSubcommand(command =>
        command

        .setName("edit")
        .setDescription("Edit a tag.")
        
        .addStringOption(option => 
            option
            .setName("name")
            .setDescription("The name of the tag.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option
            .setName("contents")
            .setDescription("The new contents of the tag.")
            .setRequired(true)
            )
        )
    .addSubcommand(command => 
        command
        
        .setName("view")
        .setDescription("View the contents of the tag.")
        .addStringOption(option => 
            option
            .setName("name")
            .setDescription("The name of the tag you'd like to view.")
            .setRequired(true)
            )
        .addIntegerOption(option => 
            option
            .setName("guild")
            .setDescription("The guild I should get this tag from. This should be the ID of a guild that I am in.")
            .setRequired(false)
            )
        )
    .addSubcommand(command =>
        command

        .setName("delete")
        .setDescription("Delete a tag.")
        .addStringOption(option => 
            option
            .setName("name")
            .setDescription("The name of the tag you'd like to delete.")
            .setRequired(true)
            )
        )
    .addSubcommand(command =>
        command

        .setName("info")
        .setDescription("View the info of a command.")
        .addStringOption(option =>
            option
            .setName("name")
            .setDescription("The name of the tag you'd like to get information on.")
            .setRequired(true)
            )
        .addIntegerOption(option => 
            option
            .setName("guild")
            .setDescription("The guild I should get this tag from. This should be the ID of a guild that I am in.")
            .setRequired(false)
            )
        )
    .addSubcommand(command => 
        command

        .setName("alias")
        .setDescription("Create an alias pointing to a tag or another alias.")
        
        .addStringOption(option =>
            option
            .setName("name")
            .setDescription("The name of the tag you'd like to create an alias to.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option
            .setName("alias-name")
            .setDescription("The name of the alias you'd like to create.")
            .setRequired(true)
            )
    ),

    async execute(interaction) {
       
        const command = interaction.options.getSubcommand()
        const name = interaction.options.getString("name")
       
        if(command == "create") {

            const contents = interaction.options.getString("contents")

            let data = await interaction.client.db.tags.findOne({name: name})

            if(data) {
                await interaction.reply("Tag already exists.")
                return
            }

            await interaction.client.db.tags.insertOne({type: "core" ,name: name, contents: contents, owner: interaction.user.id, uses:0, guildId: interaction.guild.id})
            await interaction.reply(`Created tag ${name}.`)

        } else if(command == "delete") {

            let data = await interaction.client.db.tags.findOne({name: name})

            if(!data) {
                await interaction.reply(`A tag with the name ${name} doesn't exist.`)
                return
            }

            if(data.owner != interaction.user.id) {
                if(!interaction.member.permissions.has("MANAGE_GUILD")) {
                    await interaction.reply("You do not have permission to delete this tag. Make sure you own it or have the `MANAGE_GUILD` permissions.")
                    return
                }
            }

            if(data.type == "alias") {
                await interaction.client.db.tags.deleteOne(data)
                await interaction.reply("I have deleted that alias.")
                return
            }

            await interaction.client.db.tags.deleteOne({name: name})
            await interaction.client.db.tags.deleteMany({pointsTo: name})
            await interaction.reply(`Deleted tag ${name}.`)

        } else if(command == "edit") {

            const contents = interaction.options.getString("contents")
            let data = await interaction.client.db.tags.findOne({name: name})
            
            if(data.type == "alias") {
                await interaction.client.db.tags.updateOne({name: data.pointsTo},{$set: {contents: contents}})
            }

            if(data.owner != interaction.user.id) {
                if(!interaction.member.permissions.has("MANAGE_GUILD")) {
                    await interaction.reply("You do not have permission to edit this tag. Make sure you own it or have the `MANAGE_GUILD` permissions.")
                    return
                }
            }


            await interaction.client.db.tags.updateOne({name: name}, {$set: {contents: contents}})
            await interaction.reply(`Edited tag ${name}.`)
       
        } else if(command == "view") {
            
            let data = await interaction.client.db.tags.findOne({name: name})
            
            if(!data) {
                await interaction.reply("That is not a valid tag.")
                return
            }

            if(data.type == "alias") {
                let data = await interaction.client.db.tags.findOne({name: data.pointsTo})
                await interaction.client.db.tags.updateOne({name:data.pointsTo},{$inc: {uses: 1}})
            } else {
                await interaction.client.db.tags.updateOne({name:name},{$inc: {uses: 1}})
            }
            await interaction.reply(data.contents)
       
        } else if(command == "info") {
            
            let data = await interaction.client.db.tags.findOne({name:name})
            
            if(!data) {
                await interaction.reply("That is not a valid tag.")
                return
            }

            if(data.type == "alias") {
                let data = await interaction.client.db.tags.findOne({name: data.pointsTo})
            }

            await interaction.reply(`${name} is an alias of ${data.name}. ${name} has been used ${data.uses} times and the owner is ${interaction.client.users.resolve(data.owner).tag}.`)
      
        } else if(command == "alias") {

            const alias = interaction.options.getString("alias-name")

            let data = await interaction.client.db.tags.findOne({name:name})

            if(!data) {
                await interaction.reply("That tag doesn't exist.")
                return
            }

            data = await interaction.client.db.tags.findOne({name:alias})
            
            if(data) {
                await interaction.reply("There is an alias/tag with that name that already exists.")
                return
            }

            await interaction.client.db.tags.insertOne({type: "alias", pointsTo: name})
            await interaction.reply(`I have created an alias (${alias}) which points to ${name}.`)

        }
    }
}
