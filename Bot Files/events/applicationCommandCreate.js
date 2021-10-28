const { MessageEmbed } = require("discord.js")
module.exports = {

	name: 'applicationCommandCreate',

	once: false,

	async execute(command) {
        console.log(`New command: ${command.name}.`)

        command.client.guilds.fetch("901801807498608710").then(guild =>

            guild.channels.fetch("901801807498608710").then(channel =>

                channel.send({embeds : [new MessageEmbed().setColor("#51ff00").setTitle("New Command!").setDescription(`<:moderationlow:902500574677843968> There is a new command: ${command.name}. Check it out!`)]})

                )
            )
    }
}