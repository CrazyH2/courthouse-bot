module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled === false) {
        console.log(`[${senderName}] Logging is already disabled!`);
        return;
    }

    chatListener.caseName = '';
    chatListener.logListener.enabled = false;
    console.log(`[${senderName}] Stopped logging chat.`);
}