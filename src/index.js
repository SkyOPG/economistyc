const Client = require('./structs/discordClient');
const Economy = require('./structs/economySystem');
const Commands = require('./structs/commands');

const economy = new Economy({
	filePath: require("path").join("./src/db/main.sqlite"),
	config: {
		refreshThreshold: 5000,
		name: "sparks",
		emoji: "⚡",
		prefix: "!"
	}
});
const client = new Client(economy.db);

client.on("ready", () => {
	console.log("Logged in!");
});

client.on("messageCreate", async message => {
	const content = message.content;
	const [cmd, ...args] = content.slice(economy.config.prefix.length).split(" ");
	const options = {
		message, client, economy, args
	};
	if(Commands[cmd] === null || Commands[cmd] === undefined)
		return;
	
	economy.refresh(message.author.id);

	try{
		Commands[cmd](options);
	} catch(e){
		console.log(e);
	}
})