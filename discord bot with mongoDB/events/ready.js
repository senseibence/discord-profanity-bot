const Guild = require('../schema.js')
const guildMap = new Map();

module.exports = {
	name: 'ready',
	once: true,
	getGuildMap,

	execute(client) {
		client.guilds.cache.forEach(async guild => {
			const currentGuildId = guild.id;
			
			// read from mongoDB
			const fromDatabase = (await Guild.find({ guildId: currentGuildId }))[0];
			const guildOnStatus = fromDatabase.guildOnStatus;
			const guildBlacklist = fromDatabase.guildBlacklist;
			const guildWhitelist = fromDatabase.guildWhitelist;
			
			guildMap.set(currentGuildId, {
				onStatus: guildOnStatus,
				blacklist: new Set(guildBlacklist), 
				whitelist: new Set(guildWhitelist),
			});
		})

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

function getGuildMap() {
	return guildMap
}