const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Bot help')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1),
        
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed = new MessageEmbed()
            .setColor('#dfc281')
            .setTitle("Profanity Filter Help")
            .setDescription("Hello! This is Profanity Filter's official help command! Please refer back to this if you are ever confused or would just like to check for any recent updates")
            .setThumbnail('https://i.postimg.cc/63T3VzKP/discordbotprofilepic.png')
            .addFields(
                { name: 'Getting Started', value: 'Type /filter to turn the bot either on or off' },
                { name: 'Command Permissions', value: 'All commands except for "help" and "suggestion" have been restricted to users with the "Manage Messages" permission' },
                { name: 'Channel Whitelist', value: "This new command will only work if you enter a channel's ID, because multiple channels may share the same name" },
                { name: 'List Resetting', value: "You may now reset your lists in addition to removing from and adding to them" },
                { name: 'Viewing Blacklist & Whitelist', value: "The bot is unable to print the profanity lists because they are too large. However, the baseline lists are available via [this GitHub link](https://github.com/senseibence/discord-profanity-bot/blob/main/discord%20bot%20read%20on%20startup%20only/profanityList.js)" },
                { name: 'Suggestions', value: 'If you would like a feature added please use the suggestion command!' }
            )
	        .setTimestamp()
        
        try {
			await interaction.editReply({ embeds: [embed] })
		} catch (error) {
			console.error(error);
			await interaction.editReply('An error occured while replying to this command');
		}
	},
};