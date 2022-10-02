const { SlashCommandBuilder } = require('@discordjs/builders');
const fromProfLibjs = require('../profanityLibrary.js');

const guildIds = [];
const guildOnStatus = [false];
const allLibraries = [];
const originalLibrary = fromProfLibjs.getProfanityLibrary();

module.exports = {
	getGuildIds,
	getGuildOnStatus,
	getAllLibraries,
	
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
		.setDMPermission(false)
		.setDefaultMemberPermissions(1) //0 is admin
		.addStringOption(option =>
			option.setName('status')
				.setDescription('Turns filter on or off')
				.setRequired(true)
				.addChoices(
					{ name: 'on', value: 'on' },
					{ name: 'off', value: 'off' },
					
				)),
	
	async execute(interaction) {
		const currentGuildId = interaction.guild.id;

		if (!guildIds.includes(currentGuildId)) {
			guildIds.push(currentGuildId);
		}			

		const index = guildIds.indexOf(currentGuildId);

		if (allLibraries[index] === undefined) {
			allLibraries[index] = originalLibrary.slice(0);
		}

		const status = interaction.options.getString('status');

		if (status === 'on') {
			guildOnStatus[index] = true;
			const str = "Filter Status: On";
			await interaction.reply(str);
		}

		else if (status === 'off') {
			guildOnStatus[index] = false;
			const str = "Filter Status: Off";
			await interaction.reply(str);
		}
		
	},
};

function getGuildIds() {
	return guildIds;
}

function getGuildOnStatus() {
	return guildOnStatus;
}

function getAllLibraries() {
	return allLibraries;
}