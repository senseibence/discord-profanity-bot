// command that replies with your discord username

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('name')
		.setDescription('Replies with your name'),
	async execute(interaction) {
		await interaction.reply(`Hi ${interaction.user.username}!`);
	},
};
