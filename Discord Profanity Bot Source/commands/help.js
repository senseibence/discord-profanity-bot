const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Bot help')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1),
        
	async execute(interaction) {

        const embed = new MessageEmbed()
            .setColor('#dfc281')
            .setTitle("Profanity Filter Help")
            .setDescription("Hello! This is Profanity Filter's official help command! Please refer back to this if you are ever confused or would just like to check for any recent updates. If you recently submitted a suggestion, changes will be reflected here")
            .setThumbnail('https://i.postimg.cc/63T3VzKP/discordbotprofilepic.png')
            .addFields(
                { name: 'Getting Started', value: 'Type /filter to turn Profanity Filter either on or off' },
                { name: 'Command Permissions', value: 'All commands except for "help" and "suggestion" are reserved for users with the "Manage Messages" permission' },
		{ name: 'New Feature', value: 'Unfortunately, due to internal issues, the message replace feature will be indefinitely delayed. Profanity Filter will continue to operate but will not see a major update for some time' },
                { name: 'Channel Whitelist', value: "This command will prevent Profanity Filter from deleting messages in a specific channel. The command will only work if you enter a channel's ID, because multiple channels may share the same name" },
                { name: 'Word Lists', value: "The default lists are too large to send through Discord, and can be found by visiting the link in Profanity Filter's profile. When adding to the word lists, you must add words one by one. For the blacklist, lowercase is recommended" },
                { name: 'Suggestions', value: 'If you would like a feature added, please use the suggestion command! It may take a few days for your changes to be implemented' }
            )
	        .setTimestamp()
        
        try {
			await interaction.editReply({ embeds: [embed] })
		} catch (error) {
			console.error(error);
			await interaction.editReply('There was an error while replying to this command');
		}
	},
};
