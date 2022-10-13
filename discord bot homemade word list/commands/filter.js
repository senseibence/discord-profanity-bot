const { SlashCommandBuilder } = require('@discordjs/builders');
const fromProfListjs = require('../profanityList.js');
const blacklist = fromProfListjs.getBlacklist();
const whitelist = fromProfListjs.getWhitelist();
const guildMap = new Map();

class GuildSettings {
	constructor() {
		this.guildOnStatus = false;
		this.blacklist = new Set(blacklist);
		this.whitelist = new Set(whitelist);
	}
}

module.exports = {
	getGuildMap,
	getGuildSettings,
	
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

		if (!guildMap.has(currentGuildId)) {
			guildMap.set(currentGuildId, new GuildSettings());
		}

		const status = interaction.options.getString('status');

		if (status === 'on') {
			guildMap.get(currentGuildId).guildOnStatus = true;
			const reply = "Filter Status: On";
			await interaction.reply(reply);
		}

		else if (status === 'off') {
			guildMap.get(currentGuildId).guildOnStatus = false;
			const reply = "Filter Status: Off";
			await interaction.reply(reply);
		}
	},
};

function getGuildMap() {
	return guildMap;
}

function getGuildSettings() {
	return GuildSettings;
}