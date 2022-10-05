const { SlashCommandBuilder } = require('@discordjs/builders');
const fromFilterjs = require('./filter.js');
const GuildSettings = fromFilterjs.getGuildSettings();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Add or remove words from blacklist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1) //0 is admin
        .addStringOption(option => option.setName('add').setDescription('Adds word to blacklist'))
        .addStringOption(option => option.setName('remove').setDescription('Removes word from blacklist')),
        
	async execute(interaction) {
        const currentGuildId = interaction.guild.id;
        const guildMap = fromFilterjs.getGuildMap();

        if (!guildMap.has(currentGuildId)) {
			guildMap.set(currentGuildId, new GuildSettings());
		}

        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const newBlacklist = guildMap.get(currentGuildId).blacklist;

        if (addedWord !== null && removedWord !== null) {
            newBlacklist.add(addedWord);
            newBlacklist.delete(removedWord);
            await interaction.reply('"'+addedWord+'" was added to blacklist' +'\n'+'"'+removedWord+'" was removed from blacklist');
        }

        else if (addedWord !== null) {
            newBlacklist.add(addedWord);
            await interaction.reply('"'+addedWord+'" was added to blacklist');
        }

        else if (removedWord !== null) {
            newBlacklist.delete(removedWord);
            await interaction.reply('"'+removedWord+'" was removed from blacklist');
        }

        else {
            await interaction.reply("Nothing changed, try giving an input!");
        }
	},
};