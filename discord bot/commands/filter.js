const { SlashCommandBuilder } = require('@discordjs/builders');

let filterStatus = true; 
let filterLevel = "strict";

module.exports = {
	getFilterStatus,
	getFilterLevel,
	
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Filter options')
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
	
		const status = interaction.options.getString('status');
		if (status === 'on') {
			filterStatus = true;
			
			await interaction.reply("Filter Status: On");
		}
		else if (status === 'off') {
			filterStatus = false;
			
			await interaction.reply("Filter Status: Off");
		}
		

		const mode = interaction.options.getString('mode');
		if (mode === 'strict') {
			filterLevel = 'strict';
			
			await interaction.reply("Filter Level: Strict");
		}
		else if (mode === 'lenient') {
			filterLevel = 'obscene';
			
			await interaction.reply("Filter Level: Lenient");
		}

		if (status === null && mode === null){
			await interaction.reply("I am a profanity filter created by Bence Lukacsy");
		}
		
	},
};

function getFilterStatus() {
	return filterStatus;
}

function getFilterLevel() {
	return filterLevel;
}
