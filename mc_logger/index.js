const { logPath, outFolder } = require('./mc_config.json');
const chatListener = require("./classes/chatListener");

new chatListener(logPath, outFolder);