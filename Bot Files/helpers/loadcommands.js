const fs = require("fs")

const categories = ["Configuration","Fun","Moderating","Status","TheUntraceableOnly"]

module.exports = client => {

    client.loadCommands = () => {
        
        for(category of categories) {
            const commandFiles = fs.readdirSync(`${process.cwd()}/commands/${category}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                try {
                    const command = require(`${process.cwd()}/commands/${category}/${file}`);
                    if(!command.usage === undefined) {
                        console.log(`Remove usage from ${command.data.name}`)
                    }
                    command.cooldowns = new Set(); // Just so I don't have to add a `cooldowns: new Set()` to each and every command
                    
                    if(command.data != undefined) {
                        command.category = category
                        let usage = ""
                        usage += `${command.data.name}`
                        if(!command.data.options != 0) {
                            for (option of command.data.options) {
                                usage += `${option.required ? `<${option.name}>` : `[${option.name}]`}`
                            }
                        }
                        command.usage = usage
                        command.uses = 0
                        client.commands.set(command.data.name, command);

                    } else if(command.raw_data != undefined) {
                        command.category = category
                        command.uses = 0
                        let usage = ""
                        usage += `${command.raw_data.name}`
                        if(!command.raw_data.options) {
                            for (option of command.raw_data.options) {
                                usage += `${option.name.required ? `<${option.name}>` : `[${option.name}]`}`
                            }
                        }
                        command.usage = usage
                        client.commands.set(command.raw_data.name, command)

                    }

                    console.log(`✅ Loaded ${command.data.name}.`)
                } catch(e) {
                    console.error(e)
                }
            }
        }
    }
}