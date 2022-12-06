const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)
const lists = require('../profanityList.js');
const wordWhitelist = lists.getWhitelist();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('word_whitelist')
		.setDescription('Customize word whitelist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) 
        .addStringOption(option => option.setName('add').setDescription('Add word to whitelist'))
        .addStringOption(option => option.setName('remove').setDescription('Remove word from whitelist'))
        .addStringOption(option => 
            option.setName('reset')
                .setDescription('Reset word whitelist')
                .addChoices(
					{ name: 'confirm', value: 'reset' }
				)),
        
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const currentGuildId = interaction.guild.id;
        const guildMap = fromReadyjs.getGuildMap();
        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const reset = interaction.options.getString('reset');
        let newWordWhitelist = guildMap.get(currentGuildId).wordWhitelist;
        const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");
        let result = "";

        if (addedWord !== null) {
            newWordWhitelist.add(addedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordWhitelist: Array.from(newWordWhitelist)}});

            result += '"'+addedWord+'" has been added to the word whitelist'+'\n';
        }

        if (removedWord !== null) {
            newWordWhitelist.delete(removedWord);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordWhitelist: Array.from(newWordWhitelist)}});

            result += '"'+removedWord+'" has been removed from the word whitelist'+'\n';
        }

        if (reset !== null) {
            newWordWhitelist = new Set(wordWhitelist.slice(0));
            guildMap.get(currentGuildId).wordWhitelist = newWordWhitelist;

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildWordWhitelist: Array.from(newWordWhitelist)}});
            
            result += "The word whitelist has been reset";
        }

        if (result.length === 0) {
            result = "Try giving an input!";
        }

        try {
            await interaction.editReply(result);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occured while replying to this command');
        }
	},
};