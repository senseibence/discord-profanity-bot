const { SlashCommandBuilder } = require('@discordjs/builders');
const nodemailer = require('nodemailer');
const { gmail_app_pass } = require('../strings.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Send suggestion')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1)
        .addStringOption(option => option.setName('suggestion').setDescription('Send suggestion').setRequired(true)),
        
	async execute(interaction) {
        
        const suggestion = interaction.options.getString('suggestion');
        let reply = "Suggestion received!";

        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'profanityfilter0@gmail.com',
                    pass: gmail_app_pass
                }
            })

            const mailOptions = {
                from: '"Profanity Filter" <profanityfilter0@gmail.com>',
                to: 'profanityfilter0@gmail.com',
                subject: 'Suggestion',
                text: suggestion
            };

            await transport.sendMail(mailOptions);

        } catch (error) {
            reply = 'There was an error while replying to this command';
            console.error(error);
            
        } finally {
            await interaction.editReply(reply);
        }
	},
};
