module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            if (interaction.guild.id === desiredserver) {
                if (interaction.channel.id === desiredchannel) {
                    return command.execute(interaction);
                }

                else {
                    interaction.reply("You do not have permission to use this command!");
                }
            }

            else {
                return command.execute(interaction);
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};
