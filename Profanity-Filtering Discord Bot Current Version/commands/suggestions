const { SlashCommandBuilder } = require('@discordjs/builders');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const fromGoogleRefreshToken = require('./googleRefreshToken.js');

const CLIENT_ID = ''; // use your own client ID
const CLIENT_SECRET = ''; // use your own client secret
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Send suggestion')
        .setDMPermission(false)
        .setDefaultMemberPermissions(1)
        .addStringOption(option => option.setName('suggestion').setDescription('Send suggestion')),
        
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); // emailing takes a moment
        let REFRESH_TOKEN; let oAuth2Client;

        try {
            REFRESH_TOKEN = fromGoogleRefreshToken.getGoogleRefreshToken();
            oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
            oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        } catch (error) {
            console.error(error)
        }
        
        const suggestion = interaction.options.getString('suggestion');
        let reply = "Suggestion received!";
        sendMail().catch(error => console.error(error.message));

        async function sendMail() {

            try {
                const accessToken = await oAuth2Client.getAccessToken();
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAUTH2',
                        user: 'bence.lukacsy@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                })

                const mailOptions = {
                    from: 'bence.lukacsy@gmail.com',
                    to: 'bence.lukacsy@gmail.com',
                    subject: 'Profanity Filter Suggestion',
                    text: suggestion
                };

                const result = await transport.sendMail(mailOptions);
                return result;

            } catch (error) {
                reply = "An error occured while replying to this command";
                return error;
            } finally {
                await interaction.editReply(reply);
            }
        }
	},
};
