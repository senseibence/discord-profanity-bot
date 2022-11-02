const Guild = require('../schema.js');
const lists = require('../profanityList.js');
const blacklist = lists.getBlacklist();
const whitelist = lists.getWhitelist();
const fromReadyjs = require('../events/ready.js');

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		// console.log(`Joined new guild: ${guild.name}`);
        let guildProfile = await new Guild({
            guildId: guild.id,
            guildOnStatus: false,
            guildBlacklist: blacklist.slice(0),
            guildWhitelist: whitelist.slice(0)
        })
        await guildProfile.save().catch(console.error);
        const guildMap = fromReadyjs.getGuildMap();
        guildMap.set(guild.id, {
            onStatus: false,
            blacklist: new Set(blacklist), 
            whitelist: new Set(whitelist),
        })
	},
};