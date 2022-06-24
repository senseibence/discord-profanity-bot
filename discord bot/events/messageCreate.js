const fromFilterjs = require('../commands/filter.js');
const fromProfanityjs = require('../isProfanityFunction.js');

module.exports = {
	name: 'messageCreate',
	execute(msg) {

        if (fromFilterjs.getFilterStatus()) {
            fromProfanityjs.isProfanity(msg, fromFilterjs);
        }
    
	},
};