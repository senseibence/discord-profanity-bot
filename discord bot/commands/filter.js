const { SlashCommandBuilder } = require('@discordjs/builders');

const guildIds = [];
const guildOnStatus = [false];
const guildFilterLevel = ["strict"];

module.exports = {
	getGuildIds,
	getGuildOnStatus,
	getGuildFilterLevel,
	
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
		.setDMPermission(false)
		.setDefaultMemberPermissions(0)
		.addStringOption(option =>
			option.setName('status')
				.setDescription('Turns filter on or off')
				.setRequired(false)
				.addChoices(
					{ name: 'on', value: 'on' },
					{ name: 'off', value: 'off' },
					
				))
	
		.addStringOption(option =>
			option.setName('mode')
				.setDescription('Switches between strict and lenient filtering')
				.setRequired(false)
				.addChoices(
					{ name: 'strict', value: 'strict' },
					{ name: 'lenient', value: 'lenient' },

				)),
		
	async execute(interaction) {
		const currentGuildId = interaction.guild.id;

		if (!guildIds.includes(currentGuildId)) {
			guildIds.push(currentGuildId);
		}	

		if (!guildIds.includes(currentGuildId)) {
			guildIds.push(currentGuildId);
		}	

		const index = guildIds.indexOf(currentGuildId);
		const status = interaction.options.getString('status');
		const mode = interaction.options.getString('mode');

		if (status === null && mode === null) {
			await interaction.reply("I am a profanity filter created by Bence Lukacsy");
		}

		else if (status === null) {

			if (mode === "strict") {
				guildFilterLevel[index] = "strict";
				await interaction.reply("Filter Level: Strict");
			}

			if (mode === "lenient") {
				guildFilterLevel[index] = "obscene";
				await interaction.reply("Filter Level: Lenient");
			}

		}

		else if (status === 'on') {
			guildOnStatus[index] = true;
			const str = "Filter Status: On";
			
			if (mode === null) {
				await interaction.reply(str);
			}

			if (mode === "strict") {
				guildFilterLevel[index] = "strict";
				await interaction.reply(str+'\n'+"Filter Level: Strict");
			}

			if (mode === "lenient") {
				guildFilterLevel[index] = "obscene";
				await interaction.reply(str+'\n'+"Filter Level: Lenient");
			}

		}

		else if (status === 'off') {
			guildOnStatus[index] = false;
			const str = "Filter Status: Off";
			
			if (mode === null) {
				await interaction.reply(str);
			}

			if (mode === "strict") {
				guildFilterLevel[index] = "strict";
				await interaction.reply(str+'\n'+"Filter Level: Strict");
			}

			if (mode === "lenient") {
				guildFilterLevel[index] = "obscene";
				await interaction.reply(str+'\n'+"Filter Level: Lenient");
			}

		}
		
	},
};

function getGuildIds() {
	return guildIds;
}

function getGuildOnStatus() {
	return guildOnStatus;
}

function getGuildFilterLevel() {
	return guildFilterLevel;
}
