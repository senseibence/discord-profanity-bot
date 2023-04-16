const fromProfanityjs = require('../isProfanityFunction.js');
const fromReadyjs = require('../events/ready.js');
const fromMessageCreatejs = require('./messageCreate.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        const currentGuildId = newMsg.guild.id;
        const currentChannel = newMsg.channel.id;
        const guildMap = fromReadyjs.getGuildMap();
        const authorID = newMsg.author.id;
        let isOn;

        if (guildMap.get(currentGuildId) !== undefined) {

            if (!guildMap.get(currentGuildId).channelWhitelist.has(currentChannel)) {

                if (guildMap.has(currentGuildId)) {
                    isOn = guildMap.get(currentGuildId).onStatus;
                }
        
                if (isOn) {
                    if (authorID !== '986412902250594324') {
                        if (!newMsg.content.includes('https://')) {
                            if (authorID !== '687324608239632405') { 
                                fromMessageCreatejs.incrementTotalMessages();
                            }   fromProfanityjs.isProfanity(newMsg, guildMap);
                        }
                    }
                }
            }
        }
	},
};