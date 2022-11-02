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
            
                if (newMsg.guild.id == '753072198801031239') { // Neon Tokyo Town
                    if (newMsg.channel.id == '1008577449992396872') {
                        fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
                    }
                }

                else {
                    fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
                }
            }
        }
         
	},
};