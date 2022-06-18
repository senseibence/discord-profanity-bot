const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, apiKey } = require("./strings.json");
const { Client, Intents } = require('discord.js');
const XMLHttpRequest = require('xhr2');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//const justforbenceId = "986746975334596608";
const benceId = "687324608239632405";
/*let channelId = "";
let username = "";
let userId = "";
let messageContent = "";*/

//slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	const userId = interaction.user.id;

	if (commandName === 'filter') {

		//we can change filter aggression levels with this command

	} else if (commandName === 'gum') { //inside joke at school

		if (userId != "400097639917420548" && userId != "508801878872686592") {
			await interaction.reply('You are eligible!');
		}

		else {
			await interaction.reply('You take too much, ineligible');
		}

	} else if (commandName === 'name') {
		await interaction.reply(`Hi ${interaction.user.username}!`);
	}
});

//filtering profanity, base level
client.on('messageCreate', msg => {
	/*channelId = msg.channel.id;
	username = msg.author.username;
	userId = msg.author.id;
	msgContent = msg.content;*/
	let json; let obj; let res;

	if (msg.content.includes("cracker")) {
		msg.delete();
	}

	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			
			json = this.responseText;
			//console.log(json);
			obj = JSON.parse(json);
			//console.log(obj);
			res = obj["is-bad"];
			//console.log(res);
			if (res) msg.delete();
			
		}
	});

	var apiParams = "content="+msg.content+"&user-id=senseibence&api-key="+apiKey;

	xhr.open("POST", "https://neutrinoapi.net/bad-word-filter", true);
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

	xhr.send(apiParams);
	
	if (msg.author.id === benceId && msg.content.includes("test123")) {
		client.channels.cache.get(msg.channel.id).send("I'm working <@"+benceId+">");
	}

})

client.login(token);
