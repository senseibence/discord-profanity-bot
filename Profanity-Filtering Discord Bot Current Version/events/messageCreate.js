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
        let isOn;

        if (!guildMap.get(currentGuildId).channelWhitelist.has(currentChannel)) {

            if (guildMap.has(currentGuildId)) {
                isOn = guildMap.get(currentGuildId).onStatus;
            }
            
            if (isOn) {
                if (msg.author.id !== '986412902250594324') {
                    if (!msg.content.includes('https://')) {
                        totalMessages++;
                        fromProfanityjs.isProfanity(msg, guildMap, currentGuildId);
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