const { SlashCommandBuilder } = require('@discordjs/builders');
const fromIsProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('../events/messageCreate');
const { MessageEmbed } = require('discord.js');
let client; let embedMessage;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Bot stats')
        .setDMPermission(true)
        .setDefaultMemberPermissions(0), 
        
	async execute(interaction) {
		client = interaction.client;
		
		client.guilds.cache.forEach(async guild => {
				  
			// read from mongoDB
			const fromDatabase = (await Guild.find({ guildId: guild.id }))[0];
			const guildOnStatus = fromDatabase.guildOnStatus;

			embedMessage += `Guild Name: ${guild.name}\n  Total Members: ${guild.memberCount}\n Guild ID: ${guild.id}\n Filter Status: ${guildOnStatus}+\n\n`
		})
		
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		let totalMessages = fromMessageCreatejs.getTotalMessages();
		let totalDeleted = fromIsProfanityjs.getTotalDeleted();
		
        await interaction.reply({ 
			embeds: [
			  new MessageEmbed()
			  .setDescription("Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted+'\n'+"Uptime: "+uptime+'\n'+"Server Count: "+client.guilds.cache.size+'\n'+"Total Member Count: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n\n'+
					  embedMessage 
			  )
			] 
		})
	},
};
