module.exports = (senderUUID, senderName, args, chatListener) => {
    if (args.length < 1 || args[0].toLowerCase() !== String(chatListener.opCode)) return console.log(`[${senderName}] Tried to use /op-me with arguments: ${args.join(' ')}`);

    chatListener.oppedSenderUUIDs.push(senderUUID);
    console.log(`Gave OP to ${senderName} (${senderUUID})`);
}