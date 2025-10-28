module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled !== true) {
        console.log(`Logging is disabled. Enable logging to allow users.`);
        return;
    }
    if (!chatListener.approvedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is not allowed.`);
        return;
    }
    
    chatListener.approvedSenderUUIDs = chatListener.approvedSenderUUIDs.filter(uuid => uuid !== senderUUID);
    console.log(`Denied ${senderName} (${senderUUID})`);
}