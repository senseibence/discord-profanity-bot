const Guild = require('../schema.js');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json');
const mongoClient = new MongoClient(mongoURI);

module.exports = {
	name: 'guildDelete',
	async execute(guild) {
		const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");
		await collection.deleteOne({ guildId: guild.id });
	},
};
