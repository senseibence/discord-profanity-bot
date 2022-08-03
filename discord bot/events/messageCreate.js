// this file checks if a new message was created and then calls on our profanity function if there was 

const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageCreate',
	execute(msg) {
	
	/*

	these arrays and variables are used to split each discord server's bot settings
	for example, server#1 might want the bot turned on whilst server#2 might want it off
	without this setup, there would only be one global boolean for whether the bot was on or off
	(we also need to do this for bot modes, strict and lenient)
	
	*/
		
        const currentGuildId = msg.guild.id;
        const guildIdsArray = fromFilterjs.getGuildIds();
        const guildStatusArray = fromFilterjs.getGuildOnStatus();
        const guildLevelArray = fromFilterjs.getGuildFilterLevel();
        const index = guildIdsArray.indexOf(currentGuildId);
        let isOn; let filterLevel;
        isOn = guildStatusArray[index];
        filterLevel = guildLevelArray[index];

        if (isOn) {
            fromProfanityjs.isProfanity(msg, filterLevel);
        }
	},
};
