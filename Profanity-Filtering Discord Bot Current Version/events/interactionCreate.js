let totalInteractions = 0;

module.exports = {
    getTotalInteractions,

	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            
            if (interaction.commandName === 'stats' || interaction.commandName === 'google_refresh_token') {

                if (interaction.user.id === '687324608239632405') {
                    return command.execute(interaction)
                }

                else {
                    interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
                }
            }
               
            else {
                totalInteractions++;
                return command.execute(interaction);
            }

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occured while executing this command', ephemeral: true });
        }
	},
};

function getTotalInteractions() {
    return totalInteractions;
}
