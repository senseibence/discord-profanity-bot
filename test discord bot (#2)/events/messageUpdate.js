const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        const currentGuildId = newMsg.guild.id;
        const guildIdsArray = fromFilterjs.getGuildIds();
        const guildStatusArray = fromFilterjs.getGuildOnStatus();
        const index = guildIdsArray.indexOf(currentGuildId);
        const serverLibrary = fromFilterjs.getAllLibraries()[index];
        let isOn = guildStatusArray[index];

        if (isOn) {
            fromProfanityjs.isProfanity(newMsg, serverLibrary);
        }
	},
};