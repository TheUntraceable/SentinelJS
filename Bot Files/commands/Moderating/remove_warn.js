const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-warn")
    .setDescription("Remove a warn from a user.")
    .addUserOption(option => 
        option
        .setName("user")
        .setDescription("The user's warn you would like to remove")
        .setRequired(true)
        )
    .addIntegerOption(option =>
        option
        .setName("id")
        .setDescription("The id of the war you'd like to delete. If this is not set, all warns will be deleted.")
        .setRequired(false)
        ),
    cooldown: 10,
    requiredPermissions: ["MANAGE_MESSAGES"],
    async execute(interaction) {
        const user = interaction.options.getMember("user")
        const id = interaction.options.getInteger("id")
        
        await interaction.client.openBank(user)

        const data = await interaction.client.db.users.findOne({memberId: user.id});
        const warns = data.warns;
        
        if(user.roles.highest >= interaction.member.roles.highest && !interaction.member.id == interaction.guild.ownerId) {
            return await interaction.reply("You can't do that due to role hierarchy.")
        } else if(!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return await interaction.reply("You are missing the `MANAGE_MESSAGES` permissions.")
        }
        if(!id) {
            await interaction.client.db.users.updateOne({memberId: user.id},{$set: {warns: new Array()}})
            return await interaction.reply(`Removed all warns from ${user.displayName}.`)
        }
        
        for(warn of warns) {
            if(warn.count == id) {
                warns.splice(warns.indexOf(warn), 1)
                break;
            }
        }
        await interaction.client.db.users.updateOne({memberId: user.id},{$set: {warns: warns}})
        return await interaction.reply(`Removed warn ${id} from ${user.displayName}.`)

    }
}