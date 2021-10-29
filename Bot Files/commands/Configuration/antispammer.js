const { SlashCommandBuilder } = require("@discordjs/builders")

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
