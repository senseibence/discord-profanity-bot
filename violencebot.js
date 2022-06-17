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

/*const justforbenceID = "986746975334596608";
const benceID = "687324608239632405";
let channelID = "";
let username = "";
let userID = "";
let messageContent = "";
const link = "https://neutrinoapi.net/bad-word-filter";*/

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


/*
client.on('messageCreate', msg => {
	channelID = msg.channel.id;
	username = msg.author.username;
	userID = msg.author.id;
	msgContent = msg.content;

	/*if (msgContent.indexOf("give me gum") > -1){
		client.channels.cache.get(channelID).send("you don't have permission for gum");
	}*/
	/*let xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open("POST", link, true); // true for asynchronous 
	xmlHttpReq.onreadystatechange = function () {
		console.log(xmlHttpReq.readyState + ":" + xmlHttpReq.status);
	  if (xmlHttpReq.readyState 
	  = 4 && xmlHttpReq.status == 200)
	  {
		console.log("foo");
		console.log(xmlHttpReq.responseText);
	  }
		
	}
	
	xmlHttpReq.send(msgContent);

	
	console.log(username+" "+userID);

	if (msgContent.indexOf("what's my name?") > -1) {
		client.channels.cache.get(channelID).send("You are <@"+userID+">");
		//msg.reply("You are "+msg.author.username);
	}

	if (channelID === justforbenceID && msgContent.indexOf("are you working") > -1) {
		client.channels.cache.get(justforbenceID).send("I'm working <@"+benceID+">");
	}

	if (msgContent.indexOf("shit") > -1) 

	{
		msg.delete();
	}

})

*/





client.login(token);
