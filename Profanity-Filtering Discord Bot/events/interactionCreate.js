let totalInteractions = 0;

module.exports = {
    getTotalInteractions,

	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

        try {
            await interaction.deferReply({ ephemeral: true });
        } catch (error) {
            // console.error(error);
            return;
        }

        const commandName = interaction.commandName;
        const command = interaction.client.commands.get(commandName);

        if (!command) return;

        const userID = interaction.user.id;

        try {

            if (commandName === 'stats') {
                if (userID === '687324608239632405') {
                    await command.execute(interaction);
                }
                else {
                    await interaction.editReply('You do not have permission to use this command');
                }
            }

            else {
                if (userID !== '687324608239632405') {
                    totalInteractions++;
                }   await command.execute(interaction);
            }

        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error while executing this command');
        }
	},
};

function getTotalInteractions() {
    return totalInteractions;
}
