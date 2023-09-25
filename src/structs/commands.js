module.exports = {
	ping: ({ client, message }) => {
		message.channel.send(`Pong!\n- ${client.ws.ping}`);
	},
	bal: async ({ client, economy, message }) => {
		const db = economy.db;
		const user = message.mentions.users.first() || message.author;
		const opts = await db.get(`user_${user.id}`);
		console.log(opts)
		const embed = client.embed
			.setTitle(`${user.displayName}'s Balance`)
			.addFields(
				{
					name: economy.config.name,
					value: `${opts["bal"]} ${economy.config.emoji}`
				},
				{
					name: "bank",
					value: `${opts["bank"]} ${economy.config.emoji}`
				}
			)
		message.channel.send({
			embeds: [
				embed
			]
		})
	}
}