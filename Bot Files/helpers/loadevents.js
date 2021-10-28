const fs = require("fs")
module.exports = client => {
    client.loadEvents = () => {
        {
            /*
            const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(`${process.cwd()}/events/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            }
            */
           client.on("interactionCreate", interaction => {
               interaction.client.handle(interaction)
           })
            console.log("I didn't load events :D")        
        }
    }
}