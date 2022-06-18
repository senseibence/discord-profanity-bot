const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require("./strings.json");
const { Client, Intents } = require('discord.js');
const XMLHttpRequest = require('xhr2');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//const justforbenceID = "986746975334596608";
const benceId = "687324608239632405";
let channelId = "";
let username = "";
let userId = "";
let messageContent = "";
//const link = "https://neutrinoapi.net/bad-word-filter";

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
		await interaction.reply(`Hi ${interaction.user.username}`);
	}
});

//filtering profanity, base level
client.on('messageCreate', msg => {
	channelId = msg.channel.id;
	username = msg.author.username;
	userId = msg.author.id;
	msgContent = msg.content;
	let json; let obj; let res;

	const data = "content="+msg.content+"&censor-character=*";

	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			json = this.responseText;
			obj = JSON.parse(json);
			res = obj["is-bad"];
			if (res) msg.delete();
			
		}
	});

	xhr.open("POST", "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-RapidAPI-Key", "906d3acad2msh27482b09890cd39p116dd3jsn85e7a3a7e795");
	xhr.setRequestHeader("X-RapidAPI-Host", "neutrinoapi-bad-word-filter.p.rapidapi.com");

	xhr.send(data);
	
	if (userId === benceId && msgContent.includes("are you working")) {
		client.channels.cache.get(justforbenceID).send("I'm working <@"+benceID+">");
	}

})

client.login(token);
