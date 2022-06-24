const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gum')
		.setDescription('Replies with your gum eligibility'),
	async execute(interaction) {
		const userId = interaction.user.id;

		if (userId != "400097639917420548" && userId != "508801878872686592") {
			await interaction.reply('You are eligible!');
		}

		else {
			await interaction.reply('You take too much, ineligible');
		}

	},
};