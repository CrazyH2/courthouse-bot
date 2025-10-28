module.exports = (senderUUID, senderName, args, chatListener) => {
    if (!chatListener.oppedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is not opped.`);
        return;
    }
    
    chatListener.oppedSenderUUIDs = chatListener.oppedSenderUUIDs.filter(uuid => uuid !== senderUUID);
    console.log(`Removed OP from ${senderName} (${senderUUID})`);
}