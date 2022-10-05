const { SlashCommandBuilder } = require('@discordjs/builders');
const fromFilterjs = require('./filter.js');
const GuildSettings = fromFilterjs.getGuildSettings();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Add or remove words from whitelist')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1) //0 is admin
        .addStringOption(option => option.setName('add').setDescription('Adds word to whitelist'))
        .addStringOption(option => option.setName('remove').setDescription('Removes word from whitelist')),
        
	async execute(interaction) {
        const currentGuildId = interaction.guild.id;
        const guildMap = fromFilterjs.getGuildMap();

        if (!guildMap.has(currentGuildId)) {
			guildMap.set(currentGuildId, new GuildSettings());
		}

        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const newWhitelist = guildMap.get(currentGuildId).whitelist;

        if (addedWord !== null && removedWord !== null) {
            newWhitelist.add(addedWord);
            newWhitelist.delete(removedWord);
            await interaction.reply('"'+addedWord+'" was added to whitelist' +'\n'+'"'+removedWord+'" was removed from whitelist');
        }

        else if (addedWord !== null) {
            newWhitelist.add(addedWord);
            await interaction.reply('"'+addedWord+'" was added to whitelist');
        }

        else if (removedWord !== null) {
            newWhitelist.delete(removedWord);
            await interaction.reply('"'+removedWord+'" was removed from whitelist');
        }

        else {
            await interaction.reply("Nothing changed, try giving an input!");
        }
	},
};