const { SlashCommandBuilder } = require('@discordjs/builders');
let google_refresh_token = "";

module.exports = {
    getGoogleRefreshToken,

	data: new SlashCommandBuilder()
		.setName('google_refresh_token')
		.setDescription('Update google refresh token')
        .setDMPermission(true)
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('update').setDescription('Update google refresh token')),
        
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); 
        google_refresh_token = interaction.options.getString('update');
        const reply = "Google refresh token updated";
        await interaction.editReply(reply);
	},
};

function getGoogleRefreshToken() { 
    return google_refresh_token;
}