const { MessageEmbed } = require("discord.js")

module.exports = {

	name: 'channelCreate',

	once: false,

	async execute(channel) {
        const id = await channel.client.mongo.guilds.find({})

        channel.guild.channels.fetch(id).then(channel =>
        
            channel.send({embeds : [new MessageEmbed().setColor("YELLOW").setTitle("Command deleted!").setDescription(`<:moderationmedium:902500576007426068> ${command.name} has been updated.`)]})

        )
    }
}