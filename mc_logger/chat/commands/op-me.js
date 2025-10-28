module.exports = (senderUUID, senderName, args, chatListener) => {
    if (
        args.length < 1 || 
        chatListener.opCode == '' ||
        args[0].toLowerCase() !== String(chatListener.opCode)
    ) return console.log(`[${senderName}] Tried to use /op-me with arguments: ${args.join(' ')}`);

    chatListener.oppedSenderUUIDs.push(senderUUID);
    chatListener.opCode = '';
    console.log(`[${senderName}] Gave OP to ${senderName} (${senderUUID})`);
}