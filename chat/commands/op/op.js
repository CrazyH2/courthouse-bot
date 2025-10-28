module.exports = async (senderUUID, senderName, args, chatListener) => {
    if (args.length !== 1) return;
    const target = await chatListener.logListener.getUUID(args[0]);
    if (chatListener.oppedSenderUUIDs.includes(target)) {
        console.log(`[${senderName}] ${args[0]} is already OP.`);
        return;
    }
    
    chatListener.oppedSenderUUIDs.push(target);
    console.log(`[${senderName}] Gave OP to ${args[0]} (${target})`);
}