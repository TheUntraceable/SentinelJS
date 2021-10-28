const { MessageEmbed } = require("discord.js")

module.exports = {

	name: 'applicationCommandUpdate',

	once: false,

	async execute(command) {
        console.log(`Deleted command: ${command.name}.`)

        command.client.guilds.fetch("901801807498608710").then(guild =>

            guild.channels.fetch("901801807498608710").then(channel =>

                channel.send({embeds : [new MessageEmbed().setColor("YELLOW").setTitle("Command deleted!").setDescription(`<:moderationmedium:902500576007426068> ${command.name} has been updated.`)]})

                )
            )
    }
}