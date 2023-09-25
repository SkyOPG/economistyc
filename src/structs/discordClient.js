const { Client, EmbedBuilder } = require('discord.js');

module.exports = class extends Client {
	constructor(db){
		super({
			intents: [
				"Guilds", 
				"GuildMessages", 
				"GuildMembers", 
				"MessageContent"
			],
		});
		this.db = db
		/**
		 * @type {EmbedBuilder}
		 */
		this.embed = new EmbedBuilder().setColor("Blue")

		this.login("MTE1NTgyMzYzOTA0NDgxNjkxNg.GMS3ln.SZJysTMEhSzWLKm5h1u2NEU48X2TmUa3c4Vdfg");
	}
}