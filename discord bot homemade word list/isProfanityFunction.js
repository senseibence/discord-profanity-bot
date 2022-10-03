const { clientId, guildId, token } = require('./strings.json');
const { Client, Collection, Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

async function isProfanity(msg, object) { 
	let bool = false; 
	let input = msg.content;
	const blacklist = object.blacklist;
	const whitelist = object.whitelist;

	if (msg.author.id !== '1008619741897834546') {

		if (blacklist.indexOf(input) > -1) {
			bool = true;
		}

		/*const arrayOfInput = input.split(" ");
		for (let i = 0; i < blacklist.length; i++) {
			const index = arrayOfInput.indexOf(blacklist[i]);
			if (index > -1) {
				arrayOfInput.splice(index,1);
			}
		}*/

		else {

			// removes special characters and numbers, but not spaces
			input = input.replace(/[^a-zA-Z ]/g, '');

			// string to array
			const arrayOfInput = input.split(" ");
			
			// remove element if it directly matches to whitelist element
			for (let i = 0; i < whitelist.length; i++) {
				const index = arrayOfInput.indexOf(whitelist[i]);
				if (index > -1) {
					arrayOfInput.splice(index,1);
				}
			}

			// check if element directly matches to blacklist element

			loop1:
			for (let i = 0; i < arrayOfInput.length; i++) {
				for (let j = 0; j < blacklist.length; j++) {
					if (arrayOfInput[i].toLowerCase().includes(blacklist[j]) || arrayOfInput[i].includes(blacklist[j])) {
						bool = true;
						break loop1;
					}
				}
			}

			if (!bool) {

				// turn array back to string
				let stringOfInput = arrayOfInput.toString();
				stringOfInput = stringOfInput.replace(/[^a-zA-Z]/g, '');
				const removeRepeats = (str) => [...new Set(str)].join('');

				// final checks
				for (let i = 0; i < blacklist.length; i++) {

					if (stringOfInput.toLowerCase().includes(blacklist[i])) {
						bool = true;
						break;
					}

					else if (removeRepeats(stringOfInput).includes(blacklist[i])) {
						bool = true;
						break;
					}

					else if (stringOfInput.includes(blacklist[i])) {
						bool = true;
						break;
					}
					
				}

			}
			
		}
		
	}

	if (bool) {
		deleteMessage(msg);
	}

}

function deleteMessage(msg) {
	if (msg.guild.id == '753072198801031239') { //Neon Tokyo Town
		if (msg.channel.id == '1008577449992396872' && msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			msg.delete();
		}
	}
	
	else if (msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		msg.delete();
	}

	else {
		msg.reply('This message contains a profanity but I am unable to delete it; please enable the "Manage Messages" permission');
	}

}

module.exports = {
    isProfanity,
}
