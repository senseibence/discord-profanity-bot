const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    guildId: String,
    guildOnStatus: Boolean,
    guildBlacklist: Array,
    guildWhitelist: Array
});

module.exports = model("Guild", guildSchema, "guildVariables");
