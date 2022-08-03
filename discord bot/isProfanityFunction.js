const { clientId, guildId, token, apiKey } = require('./strings.json');
const { Client, Collection, Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const XMLHttpRequest = require('xhr2');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// this file contains a function which calls on Neutrino API, a very powerful tool that correctly identifies profanities in a given string
async function isProfanity(msg, filterLevel) { 
	let json; let obj; let res;
	
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () 
	{
		if (this.readyState === this.DONE) {
			
			json = this.responseText;
			obj = JSON.parse(json);
			res = obj["is-bad"];
			deleteMessage(res, msg);
		}
	});
	 
	// sending in a discord message
	var apiParams = "content="+msg.content+"&user-id=senseibence&api-key="+apiKey+"&catalog="+filterLevel;

	xhr.open("POST", "https://neutrinoapi.net/bad-word-filter", true);
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

	xhr.send(apiParams);

}

// this function deletes a discord message if it contains a profanity (and has the permission to do so)
function deleteMessage(result, msg) {
	if (result && msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		msg.delete();
	}

	else if (result) {
		msg.reply('This message contains a profanity but I am unable to delete it; please enable the "Manage Messages" permission');
	}
}

module.exports = {
    isProfanity,
}
