const { SlashCommandBuilder } = require('@discordjs/builders');

//arrays to split variables (bot states) among servers
const guildIds = [];
const guildOnStatus = [false];
const guildFilterLevel = ["strict"];

module.exports = {
	getGuildIds,
	getGuildOnStatus,
	getGuildFilterLevel,
	
	//creating the slash commands
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
		.setDMPermission(false)
	
		//for testing, this is set to 1. 0 gives only admins permission to interact with slash commands
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
	
	// execute function which was called in "interactionCreate", code: "command.execute(interaction)"
	async execute(interaction) {
		const currentGuildId = interaction.guild.id;
		
		//adds new server (guild) Id if we don't have it yet
		if (!guildIds.includes(currentGuildId)) {
			guildIds.push(currentGuildId);
		}	

		const index = guildIds.indexOf(currentGuildId);
		const status = interaction.options.getString('status');
		const mode = interaction.options.getString('mode');

		if (status === null && mode === null) {
			await interaction.reply("I am a profanity filter created by Bence Lukacsy");
		}
		
		// the following if conditions reply to the user and correctly set our bot state variables, on/off and strict/lenient
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

// getter methods so that we can export arrays with bot variables

function getGuildIds() {
	return guildIds;
}

function getGuildOnStatus() {
	return guildOnStatus;
}

function getGuildFilterLevel() {
	return guildFilterLevel;
}
