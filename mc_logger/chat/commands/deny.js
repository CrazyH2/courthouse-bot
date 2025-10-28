module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled !== true) {
        console.log(`[${senderName}] Logging is disabled. Enable logging to allow users.`);
        return;
    }
    if (!chatListener.approvedSenderUUIDs.includes(senderUUID)) {
        console.log(`[${senderName}] You are not currently allowed.`);
        return;
    }
    
    chatListener.approvedSenderUUIDs = chatListener.approvedSenderUUIDs.filter(uuid => uuid !== senderUUID);
    console.log(`[${senderName}] Denied ${senderName} (${senderUUID})`);
}