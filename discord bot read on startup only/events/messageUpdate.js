const fromProfanityjs = require('../isProfanityFunction.js');
const fromReadyjs = require('../events/ready.js');
const fromMessageCreatejs = require('./messageCreate.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        const currentGuildId = newMsg.guild.id;
        const guildMap = fromReadyjs.getGuildMap();
        let isOn;

        if (guildMap.has(currentGuildId)) {
            isOn = guildMap.get(currentGuildId).onStatus;
        }

        if (isOn) {
            if (newMsg.author.id !== '986412902250594324') {
                fromMessageCreatejs.incrementTotalMessages();
                fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
            }
        }
	},
};