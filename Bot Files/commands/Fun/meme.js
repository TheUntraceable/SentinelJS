const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPost(posts) {
    const randomIndex = randomInt(0, posts.length);
    return posts[randomIndex].data;
}
module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme."),
    // I was about to let users choose what subreddits they wanted to get memes from, but I decided to just get a random one because I can't be asked to check if it's dangerous. Maybe Soon?

    cooldown: 5,
    
    async execute(interaction) {
        const subReddits = [
            "r/programmerreactions",
            "r/memes",
            "r/meme",
            "r/dankmemes",
            "r/ProgrammerHumor",
            "r/programme_irl",
            "r/badUIbattles"
          ];
        const randomIndex = randomInt(0, subReddits.length);
        axios.get(`https://reddit.com/${subReddits[randomIndex]}/.json`).then(async resp => {
            const { title, url, subreddit_name_prefixed: subreddit } = getRandomPost(resp.data.data.children);
            await interaction.reply({embeds : [new MessageEmbed().setTitle(title).setURL(url).setImage(url).setFooter(`from ${subreddit}`)]})
        })

    }
}