const DiscordRPC = require('discord-rpc');
const { clientId } = require('./config.json');

const rpc = new DiscordRPC.Client({
	transport: 'ipc'
});

//Creating a start- and endTimestamp for the initial timer
var d1 = new Date ();

rpc.on('ready', () => {
	console.clear();
	console.log("Setting RPC activity...");
	
	//Sets the initial Rich Presence
	rpc.setActivity({
		details: "Rewriting Sentinel to JS",
		state: "Procrastinating...",
        buttons: [{label: "View the progress!",url: "https://github.com/TheUntraceable/SentinelJS"},{label: "Learn more!",url: "https://sentinel.theuntraceable.tech"}],
		largeImageKey: "sentinel",
		largeImageText: "Sentinel's Profile Picture, yes I had nothing else for it...",
		instance: false,
		startTimestamp: d1,
	}).then(console.log(`RPC has been set! If it doesn’t set immediately please wait for it to refresh (if set) or just re-node app.js`)).catch(err => {throw err});
    rpc.on('ready', () => {
        setActivity();
      
        // activity can only be set every 15 seconds
        setInterval(() => {
          setActivity();
        }, 15e3);
      });
      
});

rpc.login({clientId: clientId}).catch(console.error);