module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled !== true) {
        console.log(`Logging is disabled. Enable logging to allow users.`);
        return;
    }
    if (args.length < 1 || args[0].toLowerCase() !== String(chatListener.opCode)) return console.log(`[${senderName}] Tried to use /op-me with arguments: ${args.join(' ')}`);

    chatListener.oppedSenderUUIDs.push(senderUUID);
    console.log(`Gave OP to ${senderName} (${senderUUID})`);
}