const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('The message to echo back')
                .setRequired(true),
        ),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(message);
    },
};