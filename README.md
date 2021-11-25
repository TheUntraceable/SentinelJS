# **Sentinel**
![](https://custom-icon-badges.herokuapp.com/github/stars/TheUntraceable/SentinelJS?logo=star)
[![](https://ptb.discord.com/api/guilds/813543866220806216/embed.png)](https://discord.gg/dYwHhQKxBs)
[![](https://custom-icon-badges.herokuapp.com/github/commit-activity/w/TheUntraceable/SentinelJS?style=plastic&logo=github)](https://github.com/TheUntraceable/SentinelJS)
[![](https://custom-icon-badges.herokuapp.com/github/last-commit/TheUntraceable/SentinelJS?style=plastic&logo=github)](https://github.com/TheUntraceable/SentinelJS)

## **What is it?**
Sentinel (originally named Security) is designed to keep your discord server nice and secure from potential threats to your server and community. Some of the rich  features included are: 

- **Anti-Spammer:**
    - This has various methods of detecting what is spam and what is a celebration!
- **Message Logging:**
    - This will log all messages! If you wanted to, you could view read how the conversation went on right from the logs with the instant reaction!
- **Action Logging:**
    - From editing a nickname to deleting channels, this feature has you covered on what actions are being taken by who and when.
- **Invite Logging:**
    - Ever wondered how you're getting raided? Just check with this feature which will find out who invited who with what invite and who made that invite.
- **Moderation:**
    - Someone disobeying the rules? We have the fix for that, ***moderation commands***, these commands are sure to show them who's boss and that their actions will always have consequences. 
> **Note: There are many more rich, easy, useful features to come so be ready for 100% security and stability.**
--------
## Security is boring, what else?
Unlike army soldiers, Sentinel knows how to have fun, instead of just having security and leaving it there, there are a few categories of rich, enjoyable, extra categories of commands such as:
- **Economy**
    - Become the second richest person (because Untraceable is first all the time, or is he? ) in this economic system from begging on the streets for spare change to working as a multi millionaire investor. (jobs and such will come soon trust me ;) 
- **Games**
    - There are a bunch of games you can play within discord within a command!

So what are you waiting for? Invite Sentinel now!
-
## How do I use it?
I would prefer if you would just invite the [bot](https://dsc.gg/security), but because someone is going to run their own instance because they have severe trust issues, so I may as well hold their hand the entire way through it.

    - Step One
        - Install Docker
        - Install the repository.
        - Lucky for you, I made a Dockerfile so that you can easily run the bot, even if you're on Linux, Potato, or even rooted android! I don't know if it works.

    - Step Two
        - Configure the bot.
        - Simply add a config.json within the "Bot Files" directory.
        - After this, add some data which should make the file look like the example-config.json.

    - Step Three
        - Build the Dockerfile
        - Simply make sure you're in the directory containing my Dockerfile
        - Run "docker build ."
      
    - Step Four
        - Run the Docker Container
        - When you ran the docker build command, it should return something like "sha256:random_letters_well_not_really_just_sha256_encrypted_letters?"
        - Remove the "sha256:" part and then run "docker run {whatever_you_have_here}"
        - If you have any issues, don't hesitate to join the Discord, link below.

> **Usefull Links**
> + [Patreon](https://www.patreon.com/user?u=50781264)
> + [Discord](https://discord.gg/dYwHhQKxBs)
> + [Website](https://sentinel.theuntraceable.tk) *I am using a free domain as of now because I want to make sure I don't waste any money.*
> + [License](https://github.com/TheUntraceable/SentinelJS/blob/e1e020bf80d79c692bf79c6491e21e364071623f/LICENSE.md)
> + [Invite](https://dsc.gg/security)

---
## Documentation

`[argument]` = Optional Argument.
`<argument>` = Required Argument.

This is temporary documentation.
| Command Name | Command Description | Category | Arguments |
| :----------- | :-----------------: | :------: | --------: |
| memberupdates | Disables/Enables member update logs. | Configuration | memberupdates <channel> |
| susaccounts | Disables/Enables suspicious accounts logs. Damn that's a mouthful. | Configuration | susaccounts <channel> |
| antispammer | Disables/Enables the antispammer. | Configuration | antispammer |
| actionlogs | Disables/Enables action logs. | Configuration | actionlogs <channel> | 
| messagelogs | Disables/Enables message logs. | Configuration | messagelogs <channel> |
| sell | Sells something in your inventory. | Fun | sell <item> [amount=1] |
| shop | The current shop, (I promise I'll make this great one day.) | Fun | shop | 
| rockpaperscissors | Let's you play Rock, Paper, Scissors. | Fun | rockpaperscissors [move] |
| ping | Gets the bot's current ping. | Fun | ping | 
| leaderboard | Shows the current leaderboard. Not guild specific. | Fun | leaderboard [top_few=3] |
| commandlist | Gives a list of all the commands! | Fun | commandlist |
| credits | This shows the credits. | Fun | credits |
| rob | Robs someone. | Fun | rob [member] |
| howsmart | Find out how smart a member is! The bot uses great calculations to determine how smart they are. | Fun | howsmart [member] |
| beg | Beg on the street coins! | Fun | beg |
| buy | Buys something from the shop. (I promise to make this good). | Fun | buy <item> [amount=1] |
| withdraw | Withdraw a certain amount of coins from your bank! | Fun | withdraw [amount] |
| use | Use an item. | Fun | use |
| deposit | Deposit a certain amount of coins to your bank! | Fun | deposit [amount] |
| send | Sends some money to a chosen player out of your wallet. | Fun | send <member> [amount] |
| balance | Shows you your balance. | Fun | balance [member] |
| command_info | Gets the amount of times a command has been used. | Fun | command_info <command_name> |
| slots | Gambles some money on the slot machines! | Fun | slots [amount] |
| invite | Special invites that are useful. | Fun | invite |
| bag | Shows your inventory. | Fun | bag [member] |
| botstats | Gets the bot's stats. | Fun | botstats |
| ban | Bans a user from the server. They cannot rejoin even if they get a new invite unless unban. | Moderating | ban <member> <reason> |
| unmute | Unmutes the specified user. | Moderating | unmute <member> [reason] |
| whois | This gets the information about a user. | Moderating | whois [member] |
| getmember | Makes it easier to get a user from an ID. | Moderating | getmember <id> |
| mute | Mutes the specified user. | Moderating | mute <member> [reason] [time=600] |
| report | Reports the specified user. | Moderating | report <member> <reason> |
| warn | Warns a specified user. | Moderating | warn <member> [reason] |
| remove_warn | Removes a warn. | Moderating | remove_warn <member> <warn> |
| unban | Unbans a member. | Moderating | unban <member> [reason] |
| warns | Shows the warns of a user. | Moderating | warns <member> |
| help | The help command! | Help | help [command] |

---
## I want to contribute!
Contribute if you want. If you do make a great contribution you'll get the "Contributor" role in the Discord Server. If you frequently contribute, you'll get the "Notable Contributor".
Before you contribute, I have a few requirements.

First you should test your code. If any error is found, you're expected to fix it and make the pull request again.

If you are contributing to an event, you should format it like this 
```javascript
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "Event Name", // The event's name. String.
    once: true // Does the event run only once? Boolean.
    execute(parameters) { // Parameters you need for the event to run.
        // Check if the guild wants to be alerted if the event occurs.
        // Fortunately, to send the message to the guild, index the Document with the event type (changes to guild channels are stuff are actionLogs, member updates are memberUpdates, etc.)
        const embed = new MessageEmbed()
        .setTitle("What happened") // For example "A member has been updated!" or "A member has left!"
        .setDescription(`${who} has ${done_what}!`) // For example "The Untraceable has deleted #general"
        .setColor("RED") // Green when something has been created, red when something has been deleted, yellow when something is modified.
        .setTimestamp()
        // Send the embed
    }
}
```
That's all I need. Thanks :D.