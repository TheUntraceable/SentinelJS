const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  Discord,
  MessageButton,
  MessageActionRow,
  MessageEmbed,
} = require("discord.js");
const url = "https://www.reddit.com/r/meme/hot/.json?limit=100";
const https = require("https");
module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("Get a meme"),
  cooldown: 5,
  cooldowns: new Set(),
  async execute(interaction) {
	https.get(url, (result) => {
	  var body = "";
	  result.on("data", (chunk) => {
		body += chunk;
	  });
	  result
		.on("end", () => {
		  var response = JSON.parse(body);
		  var index =
			response.data.children[Math.floor(Math.random() * 99) + 1].data;
		  if (index.post_hint !== "image") {
			const yeah = new MessageActionRow().addComponents(
			  new MessageButton()
				.setLabel("View Subreddit")
				.setStyle("LINK")
				.setURL("https://www.reddit.com/r/meme")
			);
			var text = index.selftext;
			const textembed = new Discord.MessageEmbed()
			  .setTitle(subRedditName)
			  .setColor("RANDOM")
			  .setDescription(`[${title}](${link})\n\n${text}`)
			  .setURL(`https://reddit.com/${subRedditName}`);

			interaction.reply({
			  embeds: [textembed],
			  components: [yeah],
			});
		  }
		  var image = index.preview.images[0].source.url.replace("&amp;", "&");
		  var title = index.title;
		  var link = "https://reddit.com" + index.permalink;
		  var subRedditName = index.subreddit_name_prefixed;
		  if (index.post_hint !== "image") {
			const hello = new MessageActionRow().addComponents(
			  new MessageButton()
				.setLabel("View Subreddit")
				.setStyle("LINK")
				.setURL("https://www.reddit.com/r/meme")
			);
			const textembed = new Discord.RichEmbed()
			  .setTitle(subRedditName)
			  .setColor("RANDOM")
			  .setDescription(`[${title}](${link})\n\n${text}`)
			  .setURL(`https://reddit.com/${subRedditName}`);
			interaction.reply({
			  embeds: [textembed],
			  components: [hello],
			});
		  }
		  console.log(image);
		  const hi = new MessageActionRow().addComponents(
			new MessageButton()
			  .setLabel("View Subreddit")
			  .setStyle("LINK")
			  .setURL("https://www.reddit.com/r/meme")
		  );
		  const imageembed = new MessageEmbed()
			.setTitle(subRedditName)
			.setImage(image)
			.setColor("RANDOM")
			.setDescription(`[${title}](${link})`)
			.setURL(`https://reddit.com/${subRedditName}`);
		  interaction.reply({ embeds: [imageembed], components: [hi] });
		})
		.on("error", function (e) {
		  console.log("Got an error with memes lol: ", e);
		});
	});
  },
};

// I need to cleanse this file.