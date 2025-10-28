const { logPath } = require('./config.json');
const chatListener = require("./classes/chatListener");

new chatListener(logPath);