const fs = require("fs");
const logListener = require("./logListener.js");

// commands import
// user commands
const allowCommand = require("../chat/commands/allow.js");
const denyCommand = require("../chat/commands/deny.js");
const opMeCommand = require("../chat/commands/op-me.js");

// op commands
const startCommand = require("../chat/commands/op/start.js");
const stopCommand = require("../chat/commands/op/stop.js");
const opCommand = require("../chat/commands/op/op.js");
const deopCommand = require("../chat/commands/op/deop.js");
const opsCommand = require("../chat/commands/op/ops.js");



// main class
class chatListener {
    constructor(logPath) {
        console.log("Chat Listener initialized.");

        this.logListener = new logListener(this, logPath);

        this.caseName = '';
        this.opCode = Math.floor(Math.random() * 899 + 100);
        this.oppedSenderUUIDs = [];
        this.approvedSenderUUIDs = [];
        this.loggedMessages = [];

        console.log(`Generated OP code: ${this.opCode}`);
    }

    updateOutput() {
        if (!this.caseName) return;

        var filename = this.caseName.replace(/[^a-zA-Z0-9]/g, '');
        fs.writeFileSync(`../data/${filename}.json`, JSON.stringify(this.loggedMessages));
    }

    onMessage(senderUUID, senderName, message) {
        if ( text.startsWith(".") ) return onCommand(senderUUID, senderName, text.substring(1));
        if ( !approvedSenderUUIDs.includes(senderUUID) ) return;

        if ( !this.logListener.enable !== true ) return;

        this.loggedMessages.push({
            timestamp: new Date().toISOString(),
            senderUUID: senderUUID,
            senderName: senderName,
            message: message
        });

        console.log(`[${new Date().toISOString()}] ${senderName} (${senderUUID}): ${message}`);

        this.updateOutput();
    }

    onCommand(senderUUID, senderName, baseCommand) {
        const command = baseCommand.split(" ")[0].toLowerCase();
        const args = baseCommand.replace(command, "").split(" ").map(e => e.trim());
        
        switch(command) {
            case "allow":
                allowCommand(senderUUID, senderName, args, this);
                break;
            case "deny":
                denyCommand(senderUUID, senderName, args, this);
                break;
            case "op-me":
                opMeCommand(senderUUID, senderName, args, this);
                break;
            
            // only ops can do
            case "start":
                if ( !this.oppedSenderUUIDs.includes(senderUUID) ) return console.log(`[${senderName}] tried to use op command [${command}] but is not opped.`);
                startCommand(senderUUID, senderName, args, this);
                break;
            case "stop":
                if ( !this.oppedSenderUUIDs.includes(senderUUID) ) return console.log(`[${senderName}] tried to use op command [${command}] but is not opped.`);
                stopCommand(senderUUID, senderName, args, this);
                break; 
            case "op":
                if ( !this.oppedSenderUUIDs.includes(senderUUID) ) return console.log(`[${senderName}] tried to use op command [${command}] but is not opped.`);
                opCommand(senderUUID, senderName, args, this);
                break;
            case "deop":
                if ( !this.oppedSenderUUIDs.includes(senderUUID) ) return console.log(`[${senderName}] tried to use op command [${command}] but is not opped.`);
                deopCommand(senderUUID, senderName, args, this);
                break;
            case "ops":
                if ( !this.oppedSenderUUIDs.includes(senderUUID) ) return console.log(`[${senderName}] tried to use op command [${command}] but is not opped.`);
                opsCommand(senderUUID, senderName, args, this);
                break;
                
            default:
                console.log(`Unknown command: [${senderName}] .${command}`); // whoever sent this is goofy
                break;
        }
    }
}

module.exports = chatListener;