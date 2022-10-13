const { SlashCommandBuilder } = require('@discordjs/builders');
const fromIsProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('../events/messageCreate');
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
		
		// everything from the client gets updated correctly except member count. So the below correctly gives uptime, server count, and server name, but not member count. I have no fix
		return interaction.reply({ 
			embeds: [
			  new MessageEmbed()
			  .setDescription("Messages Interpreted: "+totalMessages+'\n'+"Profanities Deleted: "+totalDeleted+'\n'+"Uptime: "+uptime+'\n'+"Server Count: "+client.guilds.cache.size+'\n'+"Total Member Count: "+client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+'\n\n'+
				client.guilds.cache
				  .map(g => `Guild Name: ${g.name}\n  Total Members: ${g.memberCount}\n Guild ID: ${g.id}`).join('\n\n')
			  )
			] 
		})
	},
};
