const { SlashCommandBuilder } = require('discord.js');
const { ChannelType, ThreadAutoArchiveDuration } = require('discord.js');

const commandData = new SlashCommandBuilder()
    .setName('threads')
    .setDescription('Creates threads for different court cases')
    .addChannelOption((option) => 
        option.setName('case')
        .setDescription('Which case to create in')
    );

module.exports = {
    data: commandData,
    async execute(interaction) {
        // Your thread creation logic will go here
        await interaction.reply('Creating thread...'); 
    },
};