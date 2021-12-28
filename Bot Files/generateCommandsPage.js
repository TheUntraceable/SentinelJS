const { Collection } = require("discord.js")

class CommandsPageGenerator {
    constructor(base) {
        this.base = base; // The base HTML page
        this.commands = new Collection();
    }

    generateCommandsPage() {
        for(const command of this.commands.values()) {
            base += `
            <div class="command" id=${command.data.name}>
                <div class="command-name">
                    <p>Name: ${command.data.name}</p>
                </div>
                <div class="command-description">
                    <p>Description: ${command.data.description}</p>
                </div>
                <div class="command-category">
                    <p>Category: ${command.category}</p>
                </div>
            `
            if(command.data.options.length > 0) {
                base += `
                <div class="command-args">
                    <p>Arguments: ${command.data.options.map(option => option.name.required ? `<${option.name}>` : `[${option.name}]`).join(" ")}</p>
                </div>`
            } else {
                base += `
                <div class="command-args">
                    <p>Arguments: None.</p>
                </div>`                
            }
            base += `
                <div class="command-usage">
                    <p>Usage: /${command.usage}</p>
                </div>
            </div>
            `
        }
        if(!base.endsWith("</html>")) {
            base += "</html>"
        }

        return base
    } 
}

base = `<!DOCTYPE HTML>\n<html>\n    <title> Commands Page </title>\n    <h1> Arguments! </h1>\n    <p> If an argument is surrounded by "[]" then the argument is optional, if it is surrounded by "<>", then it is required.</p>\n`

const generator = new CommandsPageGenerator(base)

require("./helpers/loadcommands.js")(generator)
generator.loadCommands();
const html = generator.generateCommandsPage()
console.log(html)