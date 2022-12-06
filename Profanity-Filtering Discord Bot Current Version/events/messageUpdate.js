const fromProfanityjs = require('../isProfanityFunction.js');
const fromReadyjs = require('../events/ready.js');
const fromMessageCreatejs = require('./messageCreate.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        const currentGuildId = newMsg.guild.id;
        const currentChannel = newMsg.channel.id;
        const guildMap = fromReadyjs.getGuildMap();
        let isOn;

        if (!guildMap.get(currentGuildId).channelWhitelist.has(currentChannel)) {

            if (guildMap.has(currentGuildId)) {
                isOn = guildMap.get(currentGuildId).onStatus;
            }
    
            if (isOn) {
                if (newMsg.author.id !== '986412902250594324') {
                    if (!newMsg.content.includes('https://')) {
                        fromMessageCreatejs.incrementTotalMessages();
                        fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
                    }
                }
            }
        }
	},
};