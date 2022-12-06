const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    guildName: String,
    guildId: String,
    guildOnStatus: Boolean,
    guildWordBlacklist: Array,
    guildWordWhitelist: Array,
    guildChannelWhitelist: Array
});

module.exports = model("Guild", guildSchema, "guildVariables");