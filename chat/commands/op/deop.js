module.exports = async (senderUUID, senderName, args, chatListener) => {
    if (!chatListener.oppedSenderUUIDs.includes(senderUUID)) {
        console.log(`${senderName} (${senderUUID}) is not opped.`);
        return;
    }
    if (args.length !== 1) return;
    const target = await chatListener.logListener.getUUID(args[0]);
    
    chatListener.oppedSenderUUIDs = chatListener.oppedSenderUUIDs.filter(uuid => uuid !== target);
    console.log(`Removed OP from ${args[0]} (${target})`);
}