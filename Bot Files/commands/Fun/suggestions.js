// const { GuildText } = require("discord.js")
// const { SlashCommandBuilder } = require("@discordjs/builders")

// module.exports  = {
//     data: new SlashCommandBuilder()
//     .setName("suggestion")
//     .setDescription("Send a suggestion to the Suggestions channel within the server if there is one set.")
//     .addSubcommand(command => 
//         command
//         .setName("create")
//         .setDescription("Create a suggestion.")
//         .addStringOption(option =>
//             option
//             .setName("suggestion")
//             .setDescription("The suggestion you would like to create.")
//             .setRequired(true)
//         )
//         )
//     .addSubcommand(command =>
//         command
//         .setName("delete")
//         .setDescription("Delete a suggestion.")
//         .addStringOption(option =>
//             option
//             .setName("suggestion_id")
//             .setDescription("The ID of the suggestion you would like to delete.")
//             .setRequired(true)
//         )
//     )
//     .addSubcommand(command =>
//         command
//         .setName("accept")
//         .setDescription("Accept a suggestion.")
//         .addStringOption(option =>
//             option
//             .setName("suggestion_id")
//             .setDescription("The ID of the suggestion you would like to accept.")
//             .setRequired(true)
//         )
//     )
//     .addSubcommand(command =>
//         command
//         .setName("reject")
//         .setDescription("Reject a suggestion.")
//         .addStringOption(option =>
//             option
//             .setName("suggestion_id")
//             .setDescription("The ID of the suggestion you would like to reject.")
//             .setRequired(true)
//         )
//     )
//     .addSubcommand(command =>
//         command
//         .setName("set_channel")
//         .setDescription("Set the channel for suggestions to be sent to.")
//         .addChannelOption(option =>
//             option
//             .setName("channel")
//             .setDescription("The channel you would like to set as the suggestions channel.")
//             .setRequired(true)
//             .addChannelType(GuildText)
//             )

//     async execute(interaction) {
//         const 
//     }
// }