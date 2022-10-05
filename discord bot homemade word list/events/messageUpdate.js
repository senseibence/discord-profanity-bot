const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        const currentGuildId = newMsg.guild.id;
        const guildMap = fromFilterjs.getGuildMap();
        let isOn;

        if (guildMap.has(currentGuildId)) {
            isOn = guildMap.get(currentGuildId).guildOnStatus;
        }

        if (isOn) {

            if (newMsg.guild.id == '753072198801031239') { // Neon Tokyo Town
                if (newMsg.channel.id == '1008577449992396872') {
                    fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
                }
            }

            else {
                fromProfanityjs.isProfanity(newMsg, guildMap, currentGuildId);
            }
        }
	},
};