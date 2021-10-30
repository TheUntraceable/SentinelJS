const { SlashCommandBuilder } = require("@discordjs/builders")

const { MessageEmbed } = require("discord.js")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("message-logs")
    .setDescription("Set the channel where I should send logs regarding messages.")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Set the channel where I should send logs regarding messages.")
        .setRequired(false)
        ),
    async execute(interaction) {
        
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return await interaction.reply({ephemeral : true,embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You do not have the `MANAGE_GUILD` permission.").setDescription("You need `MANAGE_GUILD` to execute this command. Try again once you are sure you have this permission.")]})
        }
        

        if(!interaction.options.get("channel")) {
            
            await interaction.client.db.guilds.updateOne({
                guildId: interaction.guild.id
            },{
                $set : {
                    messageLogs : false
                }
            })
            return await interaction.reply("I have disabled Message-Logs.")
        }

        if(interaction.options.getChannel("channel").type != "GUILD_TEXT") {

            return await interaction.reply(`You need to set the channel to be a normal text channel, not ${interaction.options.getChannel("channel").type}`)

        } else if(interaction.options.getChannel("channel") == "GUILD_TEXT") {

            await interaction.client.db.guilds.updateOne({
                guildId : interaction.guild.id
            },{
                $set : {
                    messageLogs: interaction.options.getChannel("channel").id 
                }
            })

        }
    }}