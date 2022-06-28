const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageCreate',
	execute(msg) {

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