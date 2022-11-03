const Guild = require('../schema.js')
const fromProfanityjs = require('../isProfanityFunction.js');
const fromMessageCreatejs = require('./messageCreate.js');

module.exports = {
	name: 'messageUpdate',
	async execute(oldMsg, newMsg) {
        const currentGuildId = newMsg.guild.id;

		// read from mongoDB
		const fromDatabase = (await Guild.find({ guildId: currentGuildId }))[0];
		const guildOnStatus = fromDatabase.guildOnStatus;
		const guildBlacklist = fromDatabase.guildBlacklist;
		const guildWhitelist = fromDatabase.guildWhitelist;

		if (guildOnStatus) {
		    if (newMsg.author.id !== '986412902250594324') {
                fromMessageCreatejs.incrementTotalMessages();
                fromProfanityjs.isProfanity(newMsg, guildBlacklist, guildWhitelist);
		    }
		}
	},
};