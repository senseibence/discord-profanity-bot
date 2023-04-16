const fromProfanityjs = require('../isProfanityFunction.js');
const fromReadyjs = require('../events/ready.js');
let totalMessages = 0;

module.exports = {
    getTotalMessages,
    incrementTotalMessages,

	name: 'messageCreate',
	execute(msg) {
        
        const currentGuildId = msg.guild.id;
        const currentChannel = msg.channel.id;
        const guildMap = fromReadyjs.getGuildMap();
        const authorID = msg.author.id;
        let isOn;

        if (guildMap.get(currentGuildId) !== undefined) {
            
            if (!guildMap.get(currentGuildId).channelWhitelist.has(currentChannel)) {

                if (guildMap.has(currentGuildId)) {
                    isOn = guildMap.get(currentGuildId).onStatus;
                }
                
                if (isOn) {
                    if (authorID !== '986412902250594324') { // bot
                        if (!msg.content.includes('https://')) {
                            if (authorID !== '687324608239632405') { // myself
                                totalMessages++;
                            }   fromProfanityjs.isProfanity(msg, guildMap);
                        }
                    }
                }
            }
        }
	},
};

function getTotalMessages() {
    return totalMessages;
}

function incrementTotalMessages() {
    totalMessages++;
}