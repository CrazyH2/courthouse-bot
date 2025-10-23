const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const chat_log_channel_id = '1420475821289767012';

const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099ff)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

module.exports = {
	data: new SlashCommandBuilder().setName('embed').setDescription('Replies with an example embed!'),
	async execute(interaction) {
        const channel = await interaction.client.channels.fetch(chat_log_channel_id);

        
        channel.send({ embeds: [exampleEmbed] });
        interaction.reply({ content: 'Embed sent to chat log channel!', ephemeral: false });
	},
};