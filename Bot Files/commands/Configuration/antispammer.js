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

    async execute(interaction) {
        
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return await interaction.reply({ephemeral : true,embeds : [new MessageEmbed().setColor("#ff0000").setTitle("You do not have the `MANAGE_GUILD` permission.").setDescription("You need `MANAGE_GUILD` to execute this command. Try again once you are sure you have this permission.")]})
        }
        
        await interaction.client.db.guilds.updateOne({
            guildId : interaction.guild.id
        },{
            $set : {
                antispammer: interaction.options.getBoolean("mode") 
            }
        })
        return await interaction.reply(`I have ${interaction.options.getBoolean("mode") ? "`enabled`" : "`disabled`"} the antispammer.`)

    }
}
