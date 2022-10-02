const { SlashCommandBuilder } = require('@discordjs/builders');
const fromProfLibjs = require('../profanityLibrary.js');
const fromFilterjs = require('./filter.js');

const originalLibrary = fromProfLibjs.getProfanityLibrary();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('library')
		.setDescription('Add or remove words from profanity library')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1) //0 is admin
        .addStringOption(option => option.setName('add').setDescription('Adds word to library'))
        .addStringOption(option => option.setName('remove').setDescription('Removes word from library')),
        
	async execute(interaction) {
        const currentGuildId = interaction.guild.id;

		if (!fromFilterjs.getGuildIds().includes(currentGuildId)) {
			fromFilterjs.getGuildIds().push(currentGuildId);
		}

        const index = fromFilterjs.getGuildIds().indexOf(currentGuildId);

        if (fromFilterjs.getAllLibraries()[index] === undefined) {
			fromFilterjs.getAllLibraries()[index] = originalLibrary.slice(0);
		}

        const addedWord = interaction.options.getString('add');
        const removedWord = interaction.options.getString('remove');
        const newServerLibrary = fromFilterjs.getAllLibraries()[index];

        if (addedWord !== null) {
            const indexOfAddedWord = newServerLibrary.indexOf(addedWord);
            if (indexOfAddedWord === -1) {
                newServerLibrary.push(addedWord);
            }
        }

        if (removedWord !== null) {
            const indexOfRemovedWord = newServerLibrary.indexOf(removedWord);
            if (indexOfRemovedWord > -1) {
                newServerLibrary.splice(indexOfRemovedWord, 1);
            }
        }

        await interaction.reply('Action Done');
	},
};