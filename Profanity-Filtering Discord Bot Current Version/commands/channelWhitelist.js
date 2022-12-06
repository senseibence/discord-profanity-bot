const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MongoClient } = require('mongodb');
const { mongoURI } = require('../strings.json')
const fromReadyjs = require('../events/ready.js')
const mongoClient = new MongoClient(mongoURI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel_whitelist')
		.setDescription('Customize channel whitelist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option => option.setName('add').setDescription('Add channel ID to whitelist'))
        .addStringOption(option => option.setName('remove').setDescription('Remove channel ID from whitelist'))
        .addStringOption(option => 
            option.setName('reset')
                .setDescription('Reset channel whitelist')
                .addChoices(
					{ name: 'confirm', value: 'reset' }
				)),
        
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const currentGuildId = interaction.guild.id;
        const guildMap = fromReadyjs.getGuildMap();
        const addedChannel = interaction.options.getString('add');
        const removedChannel = interaction.options.getString('remove');
        const reset = interaction.options.getString('reset');
        let newChannelWhitelist = guildMap.get(currentGuildId).channelWhitelist;
        const database = mongoClient.db("test");
		const collection = database.collection("guildVariables");
        let result = "";

        if (addedChannel !== null) {
            newChannelWhitelist.add(addedChannel);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildChannelWhitelist: Array.from(newChannelWhitelist)}});

            result += 'Channel with ID "'+addedChannel+'" has been added to the channel whitelist';
        }

        if (removedChannel !== null) {
            newChannelWhitelist.delete(removedChannel);

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildChannelWhitelist: Array.from(newChannelWhitelist)}});

            result += 'Channel with ID "'+removedChannel+'" has been removed from the channel whitelist';
        }

        if (reset !== null) {
            newChannelWhitelist = new Set();
            guildMap.get(currentGuildId).channelWhitelist = newChannelWhitelist;

            // update mongoDB
			await collection.updateOne(
				{guildId: currentGuildId},
				{$set: {guildChannelWhitelist: Array.from(newChannelWhitelist)}});
            
            result += "The channel whitelist has been reset";
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