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
		let totalInteractions = fromInteractionCreate.getTotalInteractions();
		
		try {
			const embed = new MessageEmbed()
				.setColor('#dfc281')
				.setTitle('Profanity Filter Statistics')
				.setDescription("Uptime: "+uptime+'\n'+"Total Members: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n'+"Total Servers: "+client.guilds.cache.size+'\n'+"Total Interactions: "+totalInteractions+'\n'+"Messages Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted)
				.setThumbnail('https://i.postimg.cc/63T3VzKP/discordbotprofilepic.png')
				.setTimestamp()
			await interaction.editReply({ embeds: [embed] })
		} catch (error) {
			console.error(error);
			await interaction.editReply('There was an error while replying to this command');
		}
	},
};
