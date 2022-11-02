const Guild = require('../schema.js');
const lists = require('../profanityList.js');
const blacklist = lists.getBlacklist();
const whitelist = lists.getWhitelist();

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		let guildProfile = await new Guild({
		    guildId: guild.id,
		    guildOnStatus: false,
		    guildBlacklist: blacklist.slice(0),
		    guildWhitelist: whitelist.slice(0)
		})
		await guildProfile.save().catch(console.error);
	},
};
