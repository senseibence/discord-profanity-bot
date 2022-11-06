const Guild = require('../schema.js');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json');
const mongoClient = new MongoClient(mongoURI);
const fromReadyjs = require('../events/ready.js');

module.exports = {
	name: 'guildDelete',
	async execute(guild) {
		console.log(`Removed from guild: ${guild.name}`);
        const database = mongoClient.db("test");
        const collection = database.collection("guildVariables");
        await collection.deleteOne({ guildId: guild.id });
        const guildMap = fromReadyjs.getGuildMap();
        guildMap.delete(guild.id);
	},
};