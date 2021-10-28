const { MessageEmbed } = require("discord.js")
module.exports = {

	name: 'applicationCommandDelete',

	once: false,

	async execute(command) {
        console.log(`Deleted command: ${command.name}.`)

        command.client.guilds.fetch("901801807498608710").then(guild =>

            guild.channels.fetch("901801807498608710").then(channel =>

                channel.send({embeds : [new MessageEmbed().setColor("#ff0000").setTitle("Command deleted!").setDescription(`<:moderationhighest:902500575869014037> ${command.name} has been deleted.`)]})

                )
            )
    }
}