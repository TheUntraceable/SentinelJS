
const {MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")
const {inspect} = require('util');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluates code.")
        .addStringOption(option =>
            option.setName('code')
                .setDescription('The code to evaluate.')
                .setRequired(true)),

    async execute(interaction) {
    try {  
        let input = args.join(' ').replace(/.*token.*(\s|$)/i,"'<token-hidden>'");
        const evaled = eval(input);
        const embed = new MessageEmbed()
        .setTitle('**CODE EVALUATED**')
        .addField('**Input:**',`\`\`\`js\n${args.join(' ')} \`\`\``)
        .addField('**Output:**',`\`\`\`js\n${clean(inspect(evaled))} \`\`\``)
        .addField('**Type:**',`\`\`\`js\n${Object.prototype.toString.call(evaled)} \`\`\``)
        .setFooter(`Executed in ${(Date.now() - message.createdTimestamp)}ms`)
        .setColor('1')
        .setTimestamp();
        await interaction.reply(embed);
        console.log(evaled);
        } catch (error) {
            console.error(error);
            message.reply("There was an error during evaluation.\n```" + error + "```");
        }
    }
    };
