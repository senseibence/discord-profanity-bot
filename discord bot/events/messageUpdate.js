const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        
        if (fromFilterjs.getFilterStatus()) {
            fromProfanityjs.isProfanity(newMsg, fromFilterjs);
        }
	},
};