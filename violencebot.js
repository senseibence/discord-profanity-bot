const { REST } = require('@discordjs/rest');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = require("./token.js");

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

const justforbence = "986746975334596608";
const benceid = "687324608239632405";

client.on('messageCreate', msg => {
	//console.log(msg.author.id+" "+msg.author.username);

	if (msg.channel.id === justforbence && msg.content.indexOf("are you working?") > -1) {
		client.channels.cache.get(justforbence).send("I'm working <@${687324608239632405}>");
	}

	if (msg.content === "shit") 
	
  {
		msg.delete();
	}

})

/*const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

const rest = new REST({ version: '10' }).setToken('token');

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

*/

client.login(token);
