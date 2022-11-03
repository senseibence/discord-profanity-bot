const { SlashCommandBuilder } = require('@discordjs/builders');
const fromIsProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('../events/messageCreate');
const { MessageEmbed } = require('discord.js');
const Guild = require('../schema.js')
let client;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Bot stats')
        .setDMPermission(true)
        .setDefaultMemberPermissions(0), 
        
	async execute(interaction) {
		client = interaction.client;
		
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
		
		let description = "Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted+'\n'+"Uptime: "+uptime+'\n'+"Server Count: "+client.guilds.cache.size+'\n'+"Total Member Count: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n\n';

		for (const guild of client.guilds.cache) {
			guildVars = guild[1];
			const result = await Guild.findOne({ guildId: guildVars.id });
			description += `Guild Name: ${guildVars.name}\n  Total Members: ${guildVars.memberCount}\n Guild ID: ${guildVars.id}\n Filter Status: ${result.guildOnStatus}\n\n`
		}

		const embed = new MessageEmbed()
			.setTitle('Profanity Filter Statistics')
			.setDescription(description)

        await interaction.reply({embeds: [embed]});
	},
};
