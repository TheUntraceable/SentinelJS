const AntiSpam = require('discord-anti-spam');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("anti-spammer")
    .setDescription("Turns on or off AntiSpammer.")
    .addBooleanOption(option =>
        option
        .setName("mode")
        .setDescription("Wether to turn on or off the antispammer.")
        .setRequired(true)
        ),

    cooldown: 5,

    async execute(interaction) {
        
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return await interaction.reply({ephemeral : true,embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You do not have the `MANAGE_GUILD` permission.").setDescription("You need `MANAGE_GUILD` to execute this command. Try again once you are sure you have this permission.")]})
        }
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
        await interaction.client.db.guilds.updateOne({
            guildId : interaction.guild.id
        },{
            $set : {
                antiSpammer: interaction.options.getBoolean("mode") 
            }
        })
        let antispam = new AntiSpam({
            warnThreshold : 3,
            kickThreshold : 7,
            muteThreshold : 5,
            banThreshold : 15,
            maxDuplicatesWarn : 3,
            maxDuplicatesKick  : 7,
            maxDuplicatesMute : 5,
            maxDuplicatesBan : 15,
            muteRoleName : data.muteRole,
            modLogsChannelName : data.actionLogs,
            modLogsEnabled : true,
            errorMessages : true,
            warnEnabled : true,
            kickEnabled : true,
            muteEnabled : true,
            banEnabled : true,
            deleteMessagesAfterBanForPastDays : 14,
            removeMessages : true,	
            removeBotMessages : false,
            })
        interaction.client.antispammers.set(interaction.guild.id, antispam)

        return await interaction.reply(`I have ${interaction.options.getBoolean("mode") ? "`enabled`" : "`disabled`"} the antispammer.`)

    }
}