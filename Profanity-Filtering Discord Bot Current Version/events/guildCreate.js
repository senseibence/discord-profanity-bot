const Guild = require('../schema.js');
const lists = require('../profanityList.js');
const blacklist = lists.getBlacklist();
const whitelist = lists.getWhitelist();
const fromReadyjs = require('../events/ready.js');

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		console.log(`Joined new guild: ${guild.name}`);
        let guildProfile = new Guild({
			guildName: guild.name,
            guildId: guild.id,
            guildOnStatus: false,
            guildWordBlacklist: blacklist.slice(0),
            guildWordWhitelist: whitelist.slice(0),
            guildChannelWhitelist: new Array()
        })
        await guildProfile.save().catch(console.error);
        const guildMap = fromReadyjs.getGuildMap();
        guildMap.set(guild.id, {
            onStatus: false,
            wordBlacklist: new Set(blacklist), 
            wordWhitelist: new Set(whitelist),
            channelWhitelist: new Set()
        })
	},
};