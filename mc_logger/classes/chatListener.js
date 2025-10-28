const fs = require("fs");
const path = require('path');

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
    constructor(logPath, outFolder) {
        logPath = path.resolve(logPath);
        outFolder = path.resolve(outFolder);

        console.log("\n\n\n[SERVER] Chat Listener initialized.");

        this.logListener = new logListener(this, logPath);

        this.caseName = '';
        this.opCode = Math.floor(Math.random() * 899 + 100);
        this.oppedSenderUUIDs = [];
        this.approvedSenderUUIDs = [];
        this.loggedMessages = [];

        console.log(`[SERVER] Generated OP code: ${this.opCode}\n\n`);
    }

    updateOutput() {
        if (!this.caseName) return;

        const filename = this.caseName.replace(/[^a-zA-Z0-9]/g, '');
        const dir = this.outFolder;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, `${filename}.json`);
        fs.writeFileSync(filePath, JSON.stringify(this.loggedMessages, null, 4));
    }

    onMessage(senderUUID, senderName, message) {
        if ( message.startsWith(".") ) return this.onCommand(senderUUID, senderName, message.substring(1));
        if ( !this.approvedSenderUUIDs.includes(senderUUID) ) return;

        if ( this.logListener.enabled == false ) return;

        this.loggedMessages.push({
            timestamp: new Date().toISOString(),
            senderUUID: senderUUID,
            senderName: senderName,
            message: message
        });

        console.log(`[${new Date().toISOString()}] [${senderName}] (${senderUUID}): ${message}`);

        this.updateOutput();
    }

    onCommand(senderUUID, senderName, baseCommand) {
        let command = baseCommand.split(" ")[0];
        const args = baseCommand.replace(command, "").split(" ").map(e => e.trim()).filter(e => e.length > 0);
        command = command.toLowerCase();

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
                console.log(`[${senderName}] Unknown command: ${command}`); // whoever sent this is goofy
                break;
        }
    }
}

module.exports = chatListener;