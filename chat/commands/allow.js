module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.approvedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is already allowed.`);
        return;
    }
    
    chatListener.approvedSenderUUIDs.push(senderUUID);
    console.log(`Allowed ${senderName} (${senderUUID})`);
}