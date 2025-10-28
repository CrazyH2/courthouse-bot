module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.oppedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is already opped.`);
        return;
    }
    
    chatListener.oppedSenderUUIDs.push(senderUUID);
    console.log(`Gave OP to ${senderName} (${senderUUID})`);
}