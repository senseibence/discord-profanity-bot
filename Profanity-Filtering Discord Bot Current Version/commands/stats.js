const { SlashCommandBuilder } = require('@discordjs/builders');
const fromIsProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('../events/messageCreate');
const fromReadyjs = require('../events/ready.js');
const fromInteractionCreate = require('../events/interactionCreate.js');
const { MessageEmbed } = require('discord.js');
let client;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Bot stats')
        .setDMPermission(true)
        .setDefaultMemberPermissions(0), 
        
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		client = interaction.client;
		const guildMap = fromReadyjs.getGuildMap();
		
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
		let totalInteractions = fromInteractionCreate.getTotalInteractions()
		
		try {
			await interaction.editReply({ 
				embeds: [
				  new MessageEmbed()
				  .setColor('#dfc281')
				  .setTitle("Profanity Filter Statistics")
				  .setDescription("Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted+'\n'+"Total Interactions: "+totalInteractions+'\n'+"Uptime: "+uptime+'\n'+"Server Count: "+client.guilds.cache.size+'\n'+"Total Member Count: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n\n'+
					client.guilds.cache
					  .map(guild => `Guild Name: ${guild.name}\n  Total Members: ${guild.memberCount}\n Guild ID: ${guild.id}\n Filter Status: ${guildMap.get(guild.id).onStatus}`).join('\n\n') 
				  )
				  .setThumbnail('https://i.postimg.cc/63T3VzKP/discordbotprofilepic.png')
				  .setTimestamp()
				] 
			})
		} catch (error) {
			console.error(error);
			await interaction.editReply('An error occured while replying to this command');
		}
	},
};