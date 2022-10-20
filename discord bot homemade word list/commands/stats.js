const { SlashCommandBuilder } = require('@discordjs/builders');
const fromIsProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('../events/messageCreate');
const fromFilterjs = require('./filter.js');
const GuildSettings = fromFilterjs.getGuildSettings();
const { MessageEmbed } = require('discord.js');
let client;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Bot stats')
        .setDMPermission(true)
        .setDefaultMemberPermissions(0), 
        
	async execute(interaction) {
		client = interaction.client;
		const guildMap = fromFilterjs.getGuildMap();
		const allGuildIds = client.guilds.cache.map(guild => guild.id);

		for (let i = 0; i < allGuildIds.length; i++) {
			let currentGuildId = allGuildIds[i];
			if (!guildMap.has(currentGuildId)) {
				guildMap.set(currentGuildId, new GuildSettings());
			}
		}
		
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
		
        return interaction.reply({ 
			embeds: [
			  new MessageEmbed()
			  .setDescription("Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted+'\n'+"Uptime: "+uptime+'\n'+"Server Count: "+client.guilds.cache.size+'\n'+"Total Member Count: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n\n'+
				client.guilds.cache
				  .map(guild => `Guild Name: ${guild.name}\n  Total Members: ${guild.memberCount}\n Guild ID: ${guild.id}\n Filter Status: ${guildMap.get(guild.id).guildOnStatus}`).join('\n\n') 
			  )
			] 
		})
	},
};
