const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for coins."),

    cooldown: 30,
    
    async execute(interaction) {
        const someone = ["Young Bloke","Your dad", "Your mum", "Bill Gates", "Walmart Employee", "Masked man", "Man who lives down the street", "Karen", "Kiddies", "Year 7's", "Idiots", "Jokes", "Charities", "Mistakes", "Accidents", "Complete Idiots", "Drunk Idiots", "Drug Addicts", "Alcoholic", "James","**She**","Santa", "Slave", "Elf", "Drug Dealer", "A Masked Figure."]

        const randomer = someone[Math.round(Math.random() * someone.length)]
       
        let toGive = Math.round(Math.random() * (1000 - -250) + -250)

        if(toGive <= 0) {
            return await interaction.reply(`${randomer} gave you nothing.`) // I wanted to make a joke but non of them are funny, I was gonna say somethin like "They didn't like you so they didn't give you anything. Go sue them." but nah.
        }
        await interaction.client.db.users.updateOne({memberId: interaction.member.id},{$inc: {wallet: toGive}})
        return await interaction.reply(`${randomer} gave you ${toGive} ${interaction.client.config.cash_emoji}.`)
    }
}