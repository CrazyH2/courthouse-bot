module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.oppedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is already opped.`);
        return;
    }
    if (args.length !== 1) return;
    const target = await chatListener.logListener.getUUID(args[0]);
    
    chatListener.oppedSenderUUIDs.push(target);
    console.log(`Gave OP to ${args[0]} (${target})`);
}