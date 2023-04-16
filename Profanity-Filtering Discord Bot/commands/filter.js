const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // 0 is admin, 1 is everyone
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
		let result = "";

		if (status === 'on') {
			guildMap.get(currentGuildId).onStatus = true;

			// update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildOnStatus: true}});

			result += "Filter Status: On";
		}

		else if (status === 'off') {
			guildMap.get(currentGuildId).onStatus = false;

			// update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildOnStatus: false}});

			result += "Filter Status: Off";
		}

		await interaction.editReply(result);
	},
};