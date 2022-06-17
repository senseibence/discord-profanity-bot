const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require("./strings.json");

const commands = [
	new SlashCommandBuilder().setName('filter').setDescription("Changes filter level"),
	new SlashCommandBuilder().setName('gum').setDescription("Replies with gum eligibility"),
	new SlashCommandBuilder().setName('name').setDescription("Replies with user's name"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
