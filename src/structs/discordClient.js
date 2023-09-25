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
		this.config = require('./config');

		this.login(this.config.token);
	}
}