const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const mongoClient = new MongoClient(mongoURI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Add or remove words from blacklist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1) // 0 is admin
        .addStringOption(option => option.setName('add').setDescription('Adds word to blacklist'))
        .addStringOption(option => option.setName('remove').setDescription('Removes word from blacklist')),
        
	async execute(interaction) {
        const currentGuildId = interaction.guild.id;
		
	// read from mongoDB
	const fromDatabase = (await Guild.find({ guildId: currentGuildId }))[0];
	const guildBlacklist = fromDatabase.guildBlacklist;
	const newBlacklist = new Set(guildBlacklist);
	
        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        
        const database = mongoClient.db("test");
	const collection = database.collection("guildVariables");

        if (addedWord !== null && removedWord !== null) {
            newBlacklist.add(addedWord);
            newBlacklist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildBlacklist: Array.from(newBlacklist)}});

            await interaction.reply('"'+addedWord+'" was added to blacklist' +'\n'+'"'+removedWord+'" was removed from blacklist');
        }

        else if (addedWord !== null) {
            newBlacklist.add(addedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildBlacklist: Array.from(newBlacklist)}});

            await interaction.reply('"'+addedWord+'" was added to blacklist');
        }

        else if (removedWord !== null) {
            newBlacklist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildBlacklist: Array.from(newBlacklist)}});

            await interaction.reply('"'+removedWord+'" was removed from blacklist');
        }

        else {
            await interaction.reply("Nothing changed, try giving an input!");
        }
	},
};
