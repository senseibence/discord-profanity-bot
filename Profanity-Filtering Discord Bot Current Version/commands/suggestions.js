const { SlashCommandBuilder } = require('@discordjs/builders');
const nodemailer = require('nodemailer');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Send suggestion')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1)
        .addStringOption(option => option.setName('suggestion').setDescription('Send suggestion')),
        
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true }); // emailing takes a moment

		const suggestion = interaction.options.getString('suggestion');
		let reply = "Suggestion received!";

		try {
			const transport = nodemailer.createTransport({
			    service: 'hotmail', // gmail no longer works without oauth2
			    auth: {
				user: 'profanityfilter1@hotmail.com',
				pass: // your hotmail password
			    }
			})

			const mailOptions = {
			    from: '"Profanity Filter" <profanityfilter1@hotmail.com>',
			    to: 'profanityfilter1@hotmail.com',
			    subject: 'Suggestion',
			    text: suggestion
			};

			await transport.sendMail(mailOptions);

		} catch (error) {
			reply = "An error occured while replying to this command";
			console.error(error);

		} finally {
			await interaction.editReply(reply);
		}
	},
};
