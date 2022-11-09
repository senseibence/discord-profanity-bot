const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Add or remove words from whitelist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1) // 0 is admin
        .addStringOption(option => option.setName('add').setDescription('Adds word to whitelist'))
        .addStringOption(option => option.setName('remove').setDescription('Removes word from whitelist')),
        
	async execute(interaction) {
        const currentGuildId = interaction.guild.id;
        const guildMap = fromReadyjs.getGuildMap();
        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const newWhitelist = guildMap.get(currentGuildId).whitelist;
        const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");

        if (addedWord !== null && removedWord !== null) {
            newWhitelist.add(addedWord);
            newWhitelist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWhitelist: Array.from(newWhitelist)}});

            await interaction.reply('"'+addedWord+'" was added to whitelist' +'\n'+'"'+removedWord+'" was removed from whitelist');
        }

        else if (addedWord !== null) {
            newWhitelist.add(addedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWhitelist: Array.from(newWhitelist)}});

            await interaction.reply('"'+addedWord+'" was added to whitelist');
        }

        else if (removedWord !== null) {
            newWhitelist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWhitelist: Array.from(newWhitelist)}});

            await interaction.reply('"'+removedWord+'" was removed from whitelist');
        }

        else {
            await interaction.reply("Nothing changed, try giving an input!");
        }
	},
};