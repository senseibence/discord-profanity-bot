const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
		.setDMPermission(false)
		.setDefaultMemberPermissions(1) // 0 is admin
		.addStringOption(option =>
			option.setName('status')
				.setDescription('Turns filter on or off')
				.setRequired(true)
				.addChoices(
					{ name: 'on', value: 'on' },
					{ name: 'off', value: 'off' },
					
				)),
	
	async execute(interaction) {
		const currentGuildId = interaction.guild.id;
		const status = interaction.options.getString('status');
		const guildMap = fromReadyjs.getGuildMap();
		const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");

		if (status === 'on') {
			guildMap.get(currentGuildId).onStatus = true;

			// update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildOnStatus: true}});

			await interaction.reply("Filter Status: On");
		}

		else if (status === 'off') {
			guildMap.get(currentGuildId).onStatus = false;

			// update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildOnStatus: false}});

			await interaction.reply("Filter Status: Off");
		}
	},
};