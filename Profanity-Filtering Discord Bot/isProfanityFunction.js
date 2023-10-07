// The profanity-detection algorithm in this file is extremely redundant; don't overanalyze 
//
//

const { Permissions } = require('discord.js');
let totalDeleted = 0;

async function isProfanity(msg, guildMap) { 
	let bool = false; 
	let input = msg.content;
	const currentGuildId = msg.guild.id;
	const authorID = msg.author.id;
	const wordBlacklist = guildMap.get(currentGuildId).wordBlacklist;
	const wordWhitelist = guildMap.get(currentGuildId).wordWhitelist;
    const removeRepeats = (str) => [...new Set(str)].join('');

	// remove element if it matches to whitelist element
	const iterator = wordWhitelist.values();
	for (let i = 0; i < wordWhitelist.size; i++) {
		const whitelist_word = iterator.next().value;
		if (input.includes(whitelist_word)) {
			input = input.replaceAll(whitelist_word,"");
		}
	}

	const arrayOfInput = input.split(" ");

	// check if element matches to blacklist element
	for (let i = 0; i < arrayOfInput.length; i++) {
		let currentWord = arrayOfInput[i];

		if (wordBlacklist.has(currentWord)) {
			bool = true;
			break;
		}

		currentWord = currentWord.toLowerCase();
		
		// too many english words containing these, so they are excluded from blacklist and being manually checked
		const leetRemoved = removeLeet(currentWord);
		const leetRemovedReplaced = removeLeet(currentWord).replace(/[^a-zA-Z]/g, '');
		const wordReplaced = currentWord.replace(/[^a-zA-Z]/g, '');

		if 

		(
			(currentWord === "ass" || currentWord === "tit" || currentWord === "dic" || currentWord === "cum" || currentWord === "nig" || currentWord === "spic" || currentWord === "fuc") || 
			(leetRemoved === "ass" || leetRemoved === "tit" || leetRemoved === "dic" || leetRemoved === "cum" || leetRemoved === "nig" || leetRemoved === "spic" || leetRemoved === "fuc") ||
			(wordReplaced === "ass" || wordReplaced === "tit" || wordReplaced === "dic" || wordReplaced === "cum" || wordReplaced === "nig" || wordReplaced === "spic" || wordReplaced === "fuc") ||
			(leetRemovedReplaced === "ass" || leetRemovedReplaced === "tit" || leetRemovedReplaced === "dic" || leetRemovedReplaced === "cum" || leetRemovedReplaced === "nig" || leetRemovedReplaced === "spic" || leetRemovedReplaced === "fuc")
		) 
		
		{
			bool = true;
			break;
		}

		if 
		
		(
			wordBlacklist.has(currentWord) ||
			wordBlacklist.has(removeLeet(currentWord)) ||
			wordBlacklist.has(currentWord.replace(/[^a-zA-Z]/g, '')) ||
			wordBlacklist.has(removeRepeats(currentWord)) ||
			wordBlacklist.has(removeRepeats(currentWord.replace(/[^a-zA-Z]/g, ''))) ||
			wordBlacklist.has(removeLeet(currentWord).replace(/[^a-zA-Z]/g, '')) ||
			wordBlacklist.has(removeRepeats(removeLeet(currentWord).replace(/[^a-zA-Z]/g, '')))
		) 
		
		{
			bool = true;
			break;
		}
	}

	if (!bool) {

		// turn array back to string
		let stringOfInput = arrayOfInput.toString();
		stringOfInput = stringOfInput.replace(/,/g, '');
		const arrayOfBlacklist = Array.from(wordBlacklist);

		// final checks
		for (let i = 0; i < arrayOfBlacklist.length; i++) {
			let currentWord = arrayOfBlacklist[i];

			if (stringOfInput.includes(currentWord)) {
				bool = true; 
				break;
			}

			stringOfInput = stringOfInput.toLowerCase();

			if
				
			(
				stringOfInput.includes(currentWord) ||
				removeLeet(stringOfInput).includes(currentWord) ||
				stringOfInput.replace(/[^a-zA-Z]/g, '').includes(currentWord) ||
				removeRepeats(stringOfInput).includes(currentWord) ||
				removeRepeats(stringOfInput).replace(/[^a-zA-Z]/g, '').includes(currentWord) ||
				removeLeet(stringOfInput).replace(/[^a-zA-Z]/g, '').includes(currentWord) ||
				removeRepeats(removeLeet(stringOfInput).replace(/[^a-zA-Z]/g, '')).includes(currentWord)
			) 
			
			{
				bool = true;
				break;
			}

		}
		
	}
        
	if (bool) {
		deleteMessage(msg, authorID);
	}
	
}

function removeLeet(input) {

    const leet = {
        "0": "o",
        "1": "i",
        "2": "r",
        "3": "e",
        "4": "a",
        "5": "s",
        "7": "t",
        "8": "b",
        "9": "p",
        "@": "a",
        "$": "s",
        "(": "c",
        "!": "i"
    };

    // get rid of leetspeak
    for (let num in leet) {
        input = input.replaceAll(num, leet[num]);
    }

    return input;
}

// algorithm over! below is to actually delete the message
function deleteMessage(msg, authorID) {
	let permissions = msg.guild.me.permissionsIn(msg.channel);

	if (permissions !== null) {

		if (permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			msg.delete().catch(error => {});
			if (authorID !== '687324608239632405') {
				totalDeleted++;
			}
		}

		else if (permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
			msg.reply('This message contains a profanity but I am unable to delete it; please enable the "Manage Messages" permission').catch(error => {});
		}
	}
}

module.exports = {
    isProfanity,
	getTotalDeleted,
}

function getTotalDeleted() {
	return totalDeleted;
}
