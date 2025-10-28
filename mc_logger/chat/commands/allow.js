module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled !== true) {
        console.log(`[${senderName}] Logging is disabled. Enable logging to allow users.`);
        return;
    }
    if (chatListener.approvedSenderUUIDs.includes(senderUUID)) {
        console.log(`[${senderName}] You are already allowed.`);
        return;
    }
    
    chatListener.approvedSenderUUIDs.push(senderUUID);
    console.log(`[${senderName}] Allowed ${senderName} (${senderUUID})`);
}