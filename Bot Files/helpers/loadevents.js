const fs = require("fs")
module.exports = client => {
    client.loadEvents = () => {
        {
            const eventFiles = fs.readdirSync(`${process.cwd()}/Bot Files/events`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(`${process.cwd()}/Bot Files/events/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            }        
        }
    }
}