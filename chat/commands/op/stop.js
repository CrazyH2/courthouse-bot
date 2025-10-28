module.exports = (senderUUID, senderName, args, chatListener) => {
    if (chatListener.logListener.enabled === false) {
        console.log('Logging is already disabled!')
        return;
    }

    chatListener.caseName = '';
    chatListener.logListener.enabled = false;
}