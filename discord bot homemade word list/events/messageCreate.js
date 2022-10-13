const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');
let totalMessages = 0;

module.exports = {
    getTotalMessages,
    incrementTotalMessages,

	name: 'messageCreate',
	execute(msg) {

        const currentGuildId = msg.guild.id;
        const guildMap = fromFilterjs.getGuildMap();
        let isOn;

        if (guildMap.has(currentGuildId)) {
            isOn = guildMap.get(currentGuildId).guildOnStatus;
        }
        
        if (isOn) {

            if (msg.author.id !== '986412902250594324') {
                totalMessages++;

                if (msg.guild.id == '753072198801031239') { // Neon Tokyo Town
                    if (msg.channel.id == '1008577449992396872') {
                        fromProfanityjs.isProfanity(msg, guildMap, currentGuildId);
                    }
                }
    
                else {
                    fromProfanityjs.isProfanity(msg, guildMap, currentGuildId);
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