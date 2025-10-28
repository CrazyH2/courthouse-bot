module.exports = async (senderUUID, senderName, args, chatListener) => {
    if (args.length !== 1) return;
    const target = await chatListener.logListener.getUUID(args[0]);
    if (!chatListener.oppedSenderUUIDs.includes(target)) {
        console.log(`[${senderName}] ${args[0]} is not OP.`);
        return;
    }
    
    chatListener.oppedSenderUUIDs = chatListener.oppedSenderUUIDs.filter(uuid => uuid !== target);
    console.log(`[${senderName}] Removed OP from ${args[0]} (${target})`);
}