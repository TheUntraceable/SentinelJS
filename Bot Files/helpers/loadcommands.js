const fs = require("fs")

const categories = ["Configuration","DataAnalysis","Fun","Invitelogger","Moderating","Status","TheUntraceableOnly"]

module.exports = client => {

    client.loadCommands = () => {
        
        for(category of categories) {
            const commandFiles = fs.readdirSync(`${process.cwd()}/commands/${category}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                try {
                    const command = require(`${process.cwd()}/commands/${category}/${file}`);
                    client.command_names.push(command.data.name)
                    client.commands.set(command.data.name, command);
                    console.log(`✅ Loaded ${command.data.name}.`)
                } catch(e) {
                    console.log(`❌ Couldn't load ${command.data.name}`)                    
                }
            }
        }
    }
}