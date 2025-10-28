module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.oppedSenderUUIDs.length > 1) {
        console.log('No one is opped.');
        return;
    }

    console.log(`Opped users: \n - ${chatListener.oppedSenderUUIDs.join('\n - ')}`);
}