const Guild = require('../schema.js');
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
			const guildWordBlacklist = fromDatabase.guildWordBlacklist;
			const guildWordWhitelist = fromDatabase.guildWordWhitelist;
			const guildChannelWhitelist = fromDatabase.guildChannelWhitelist;

			guildMap.set(currentGuildId, {
				onStatus: guildOnStatus,
				wordBlacklist: new Set(guildWordBlacklist), 
				wordWhitelist: new Set(guildWordWhitelist),
				channelWhitelist: new Set(guildChannelWhitelist)
			});
		})

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

function getGuildMap() {
	return guildMap;
}