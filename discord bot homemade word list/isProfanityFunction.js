const { Permissions } = require('discord.js');
let totalDeleted = 0;

async function isProfanity(msg, guildMap, currentGuildId) { 
	let bool = false; 
	let input = msg.content;
	const blacklist = guildMap.get(currentGuildId).blacklist;
	const whitelist = guildMap.get(currentGuildId).whitelist;
    const removeRepeats = (str) => [...new Set(str)].join('');

	const arrayOfInput = input.split(" ");

	// remove element if it directly matches to whitelist element
	for (let i = 0; i < arrayOfInput.length; i++) {
		if (whitelist.has(arrayOfInput[i])) {
			arrayOfInput.splice(i,1);
		}
	}

	// check if element directly matches to blacklist element
	for (let i = 0; i < arrayOfInput.length; i++) {
		let currentWord = arrayOfInput[i];

		if (blacklist.has(currentWord)) {
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
			(currentWord === "ass" || currentWord === "tit" || currentWord === "hell" || currentWord === "cum" || currentWord === "nig" || currentWord === "spic") ||
			(leetRemoved === "ass" || leetRemoved === "tit" || leetRemoved === "hell" || leetRemoved === "cum" || leetRemoved === "nig" || leetRemoved === "spic") ||
			(wordReplaced === "ass" || wordReplaced === "tit" || wordReplaced === "hell" || wordReplaced === "cum" || wordReplaced === "nig" || wordReplaced === "spic") ||
			(leetRemovedReplaced === "ass" || leetRemovedReplaced === "tit" || leetRemovedReplaced === "hell" || leetRemovedReplaced === "cum" || leetRemovedReplaced === "nig" || leetRemovedReplaced === "spic")
		) 
		
		{
			bool = true;
			break;
		}

		if 
		
		(
			blacklist.has(currentWord) ||
			blacklist.has(removeLeet(currentWord)) ||
			blacklist.has(currentWord.replace(/[^a-zA-Z]/g, '')) ||
			blacklist.has(removeRepeats(currentWord)) ||
			blacklist.has(removeRepeats(currentWord.replace(/[^a-zA-Z]/g, ''))) ||
			blacklist.has(removeLeet(currentWord).replace(/[^a-zA-Z]/g, '')) ||
			blacklist.has(removeRepeats(removeLeet(currentWord).replace(/[^a-zA-Z]/g, '')))
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
		const arrayOfBlacklist = Array.from(blacklist);

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
		deleteMessage(msg);
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
function deleteMessage(msg) {
	if (msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		msg.delete();
		totalDeleted++;
	}

	else {
		msg.reply('This message contains a profanity but I am unable to delete it; please enable the "Manage Messages" permission');
	}
}

module.exports = {
    isProfanity,
	getTotalDeleted,
}

function getTotalDeleted() {
	return totalDeleted;
}