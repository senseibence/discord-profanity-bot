const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)
const lists = require('../profanityList.js');
const wordBlacklist = lists.getBlacklist();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('word_blacklist')
		.setDescription('Customize word blacklist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option => option.setName('add').setDescription('Add word to blacklist'))
        .addStringOption(option => option.setName('remove').setDescription('Remove word from blacklist'))
        .addStringOption(option => 
            option.setName('reset')
                .setDescription('Reset word blacklist')
                .addChoices(
					{ name: 'confirm', value: 'reset' }
				)),
                
	async execute(interaction) {

        const currentGuildId = interaction.guild.id;
        const guildMap = fromReadyjs.getGuildMap();
        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const reset = interaction.options.getString('reset');
        let newWordBlacklist = guildMap.get(currentGuildId).wordBlacklist;
        const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");
        let result = "";

        if (addedWord !== null) {
            newWordBlacklist.add(addedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordBlacklist: Array.from(newWordBlacklist)}});

            result += '"'+addedWord+'" has been added to the word blacklist'+'\n';
        }

        if (removedWord !== null) {
            newWordBlacklist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordBlacklist: Array.from(newWordBlacklist)}});

            result += '"'+removedWord+'" has been removed from the word blacklist'+'\n';
        }

        if (reset !== null) {
            newWordBlacklist = new Set(wordBlacklist.slice(0));
            guildMap.get(currentGuildId).wordBlacklist = newWordBlacklist

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordBlacklist: Array.from(newWordBlacklist)}});
            
            result += "The word blacklist has been reset";
        }

        if (result.length === 0) {
            result = "Try giving an input!";
        }

        try {
            await interaction.editReply(result);
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error while replying to this command');
        }
	},
};