module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.oppedSenderUUIDs.length > 1) {
        console.log('No one is opped.');
        return;
    }


    const oppedUsernames = [];
    chatListener.oppedSenderUUIDs.map(e => (e) => {
        const cachedOps = chatListener.logListener.cachedUUIDS;
        const oppedUsername = Object.keys(cachedOps).find(key => cachedOps[key] === e);
        oppedUsernames.push(oppedUsername);
    });

    console.log(`Opped users: \n - ${oppedUsernames.join('\n - ')}`);
}