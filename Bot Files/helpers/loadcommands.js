const fs = require("fs")

const categories = ["Configuration","Fun","Invitelogger","Moderating","Status","TheUntraceableOnly"]

module.exports = client => {

    client.loadCommands = () => {
        
        for(category of categories) {
            const commandFiles = fs.readdirSync(`${process.cwd()}/commands/${category}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                try {
                    const command = require(`${process.cwd()}/commands/${category}/${file}`);
                    if(!command.usage == undefined) {
                        console.log(`Remove usage from ${command.data.name}`)
                    }
                    client.data_analysis[command.data.name] = 0
                    if(command.data != undefined) {
                        command.category = category
                        client.commands.set(command.data.name, command);

                    } else if(command.raw_data != undefined) {
                        command.category = category
                        client.commands.set(command.raw_data.name, command)

                    }

                    console.log(`✅ Loaded ${command.data.name}.`)
                } catch(e) {
                    console.log(`❌ Couldn't load ${command.data.name}`)                    
                }
            }
        }
    }
}