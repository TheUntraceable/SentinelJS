const { Collection } = require("discord.js")

class CommandsPageGenerator {
    constructor() {
        this.commands = new Collection();
    }

    generateCommandsPage() {
        let base = "";

        for(const command of this.commands.values()) {
            if(command.category == "TheUntraceableOnly") {
                continue
            }
            base += `
<div id = "${command.data.name}" class="command">
    <div class="command-name">
        <button onclick="toggle('${command.data.name}')" type="button">${command.data.name}</button>
    </div>
    <div id="${command.data.name}-description-category-args-permissions" class="command-description-category-args-permissions">
        <div id="${command.data.name}-description" class="command-description">
            <p>Description: ${command.data.description}</p>
        </div>
        <div id="${command.data.name}-category"class="command-category">
            <p>Category: ${command.category}</p>
        </div>
            `
            if(command.data.options.length > 0) {
                base += `
        <div id="${command.data.name}-arg" class="command-args">
            <p>Arguments: ${command.data.options.map(option => option.required ? `<${option.name}> ${option.description ? `(${option.description})` : ""}` : `[${option.name}] ${option.description ? `(${option.description})` : ""}`).join(", ")}</p>
        </div>`
            } else {
                base += `
        <div id="${command.data.name}-args" class="command-args">
            <p>Arguments: None.</p>
        </div>`                
            }
            if(command.requiredPermissions) {
                base += `
        <div id="${command.data.name}-permissions" class="command-permissions">
            <p>Required Permissions: ${command.requiredPermissions.join(", ")}</p>
        </div>`
            } else {
                base += `

        <div id="${command.data.name}-permissions" class="command-permissions">
            <p>Required Permissions: None.</p>
        </div>`
                }
            base += `
    </div>
</div>`
        }
/* <script>
    function toggle(commandName) {
        const mainStuff = document.getElementById(commandName + "-description-category-args-permissions")
        if(mainStuff.style.visibility != "visible") {
            mainStuff.style.visibility = "visible"
        } else {
            mainStuff.style.visibility = "hidden"
        }
    }
</script> */

        return base
    } 
}

// base = `<!DOCTYPE HTML>\n<html>\n    <title> Commands Page </title>\n    <h1> Arguments! </h1>\n    <p> If an argument is surrounded by <strong>"[ ]"</strong> then the argument is optional, if it is surrounded by <strong>"<>"</strong>, then it is required.</p>\n`

const generator = new CommandsPageGenerator()

require("./helpers/loadcommands.js")(generator)
generator.loadCommands();
const html = generator.generateCommandsPage()
console.log(html)