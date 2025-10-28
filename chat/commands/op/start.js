module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled === true) {
        console.log('Logging is already enabled!')
        return;
    }
    if (args.length !== 1) return;

    chatListener.caseName = args[0];
    chatListener.logListener.enabled = true;
}