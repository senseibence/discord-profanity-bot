module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {

            if (interaction.commandName === 'stats') {
                if (interaction.user.id === '687324608239632405') {
                    return command.execute(interaction)
                }

                else {
                    interaction.reply("You do not have permission to use this command!");
                }
            }

            else if (interaction.guild.id === '1017315963990966274') { // Computer Club Server
                if (interaction.channel.id === '1017316657087119421') {
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