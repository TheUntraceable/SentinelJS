const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Lets your rob a user.")
    .addUserOption(option =>
        option
        .setName("victim")
        .setDescription("The person you would like to rob.")
        .setRequired(true)
        ),
    async execute(interaction) {
        const victim = interaction.options.getMember("victim")
        const victimData = await interaction.client.db.users.findOne({memberId: victim.id})
        
        if(victimData.passive) {
            return await interaction.reply("They are in passive mode!")
        } 
        
        const excuses = ["You got spotted!",`${vicim.displayName} was staring right at you as you waddled in.`, `${vicim.displayName} closed the door on you. Now you got a good reason to rob them.`, "You got into a white van with a middle-aged man inside whilst on the way to your victims house. Not sure why though.", "You stubbed your toe and screamed at the top of your lungs and you drove away.", `${vicim.displayName} said hi to you on the way to their house. How nice of them.`, `${vicim.displayName} bought a bodyguard who poked you and it sent you flying back to China.`, `I stopped you from robbing bossman don't disrespect man like ${victum.displayName}.`]
        const excuseIndex = Math.floor(Math.random() * excuses.length)

        if(stolen < 0) {
            return await interaction.reply(excuse[excuseIndex])
        }

        const stolen = Math.round(Math.random() * (victimData - -250) + -250)
        await interaction.client.db.users.updateOne({memberId: victim.id},{$inc : {wallet: -stolen}})
        await interaction.client.db.users.updateOne({memberId: interaction.member.id},{$inc: {wallet: stolen}})

        await interaction.reply(`You robbed ${victim.displayName} of ${stolen}${interaction.client.config.cash_emoji}. You dirty soul.`)
    }
}