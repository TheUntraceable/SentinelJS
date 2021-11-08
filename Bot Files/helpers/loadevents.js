const fs = require("fs")
module.exports = client => {
    client.loadEvents = () => {
        {
            
            const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));

            for (const file of eventFiles) {

                const event = require(`${process.cwd()}/events/${file}`);

                if (event.once) {
                    client.once(event.name, async (...args) => {
                        
                        try {
                            await event.execute(...args)
                        } catch (error) {
                            console.error(error)
                        }
                    });

                } else {
                    client.on(event.name, async (...args) => {
                        try {
                            event.execute(...args)
                        } catch (error) { 
                            console.error(error)
                        }
                    });
                }
            }
        }
    }
}