const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleCreate",
    once: false,
    async execute(role) {
        
        const data = await role.client.db.guilds.findOne({guildId: role.guild.id})
        if(data.actionLogs != false) {
            
            const embed = new MessageEmbed()
            .setTitle("New role created!")
            .setDescription("A new role has been created! I would mention the name but that'd just be 'new roles'...")
            .setColor("#51ff00")
            .setTimestamp()

            role.client.channels.fetch(data.actionLogs).then(channel =>
                channel.send({embeds: [embed]})
            )

        }
    }
}