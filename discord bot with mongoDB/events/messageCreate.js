const Guild = require('../schema.js')
const fromProfanityjs = require('../isProfanityFunction.js');
let totalMessages = 0;

module.exports = {
    getTotalMessages,
    incrementTotalMessages,

	name: 'messageCreate',
	async execute(msg) {
		const currentGuildId = msg.guild.id;

		// read from mongoDB
		const fromDatabase = (await Guild.find({ guildId: currentGuildId }))[0];
		const guildOnStatus = fromDatabase.guildOnStatus;
		const guildBlacklist = fromDatabase.guildBlacklist;
		const guildWhitelist = fromDatabase.guildWhitelist;

		if (guildOnStatus) {
		    if (msg.author.id !== '986412902250594324') {
			    if (!msg.content.includes('https://')) {
				    totalMessages++;
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
