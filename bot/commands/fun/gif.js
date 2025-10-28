const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const gifs = {
    gif_funny: [
        'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
        'https://media.giphy.com/media/l0HlQ7LRal8hQKQ3K/giphy.gif',
        'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    ],
    gif_meme: [
        'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
        'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
        'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
    ],
    gif_movie: [
        'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
        'https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif',
        'https://media.giphy.com/media/3oEjHP8ELRNNlnlLGM/giphy.gif',
    ],
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Sends a random gif!')
        .addStringOption(option =>
            option
                .setName('category')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoices(
                    { name: 'Funny', value: 'gif_funny' },
                    { name: 'Meme', value: 'gif_meme' },
                    { name: 'Movie', value: 'gif_movie' },
                ),
        ),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const list = gifs[category] ?? [];

        if (list.length === 0) {
            return interaction.reply({ content: 'No GIFs found for that category.', ephemeral: true });
        }

        const url = list[Math.floor(Math.random() * list.length)];
        const embed = new EmbedBuilder()
            .setImage(url)
            .setColor('#5865F2');

        await interaction.reply({ embeds: [embed] });
    },
};