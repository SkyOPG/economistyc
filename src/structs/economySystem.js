const { QuickDB } = require('quick.db');

module.exports = class {
	constructor(options){
		this.db = new QuickDB({ 
			filePath: options.filePath
		});

		this.config = options.config;
	}

	async refresh(id){
		const db = this.db;
		const opt = await db.get(`user_${id}`); // { bal: 0, bank: 0, items: [] }
		if(opt === null || opt === undefined){ // instead of "{ bal: 0, bank: 0, items: [] }" its null
			const opts = {
				bal: 0,
				bank: 0,
				items: []
			};
			await db.set(`user_${id}`, opts);
			return;
		}
		if(opt.bal < 0 && opt.bank >= -opt.bal){
			const { bal, bank } = opt;

			opt["bal"] = 0;
			opt["bank"] = bank + bal;

			await db.set(`user_${id}`, opt);
		}
	}
	async toggleban(id){
		const db = this.db;
		const opt = await db.get(`user_${id}`);

		if(opt.banned === null){
			opt["banned"] = true;
		} else {
			opt["banned"] = !opt["banned"];
		}

		await db.set(`user_${id}`, opt);
	}

	async addcoins(type, amt, id){
		const db = this.db;
		const opt = await db.get(`user_${id}`); // { bal: 0, bank: 0, items: [] }

		opt[type] += amt;
		await db.set(`user_${id}`, opt);
	}

	async remcoins(type, amt, id){
		const db = this.db;
		const opt = await db.get(`user_${id}`); // { bal: 0, bank: 0, items: [] }

		opt[type] -= amt;
		await db.set(`user_${id}`, opt);
	}

	async setcoins(type, amt, id){
		const db = this.db;
		const opt = await db.get(`user_${id}`); // { bal: 0, bank: 0, items: [] }

		opt[type] = amt;
		await db.set(`user_${id}`, opt);
	}

	async utils(options){
		switch(options.type){
			case "balance": {
				if(options.utility === "randomize"){
					const max = options.max;

					return Math.floor(Math.random() * max+1);
				}
			} break;

			default:
				console.log("Unknown util");
			break;
		}
	}

	async about(){
		const lines = [
			"This is an economy bot made by SkyOPG.",
			"it's initial idea was a poll in some server",
			"people: ",
			"- \`skyopg\`: Developer",
			"- \`i should put someone here\`: i should put something here",
			"- \`i should put someone here\`: i should put something here"
		]
		return lines.join("\n");
	}
}



