const readline = require('readline');
const chatListener = require("./classes/chatListener");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter latest.log full path: ', (logPath) => {
    new chatListener(logPath);
});