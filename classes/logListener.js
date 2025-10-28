const fs = require('fs');

class logListener {
    constructor(parent, path) {
        this.parent = parent;
        this.enabled = false;
        this.chatPatterns = [
            /\[(\d{2}:\d{2}:\d{2})\] \[.*?\/INFO\]: (?:\[CHAT\]|\[Not Secure\]) <(.*?)> (.*)/,
            /\[(\d{2}:\d{2}:\d{2})\] \[.*?\/INFO\]: (?:\[System\] \[CHAT\] |\[CHAT\] )?(.*?): (.*)/,
            /\[(\d{2}:\d{2}:\d{2})\] \[.*?\/INFO\]: (?:\[System\] \[CHAT\] )?\[(.*?)\] (.*)/
        ];
        this.cachedUUIDS = {};

        console.log("Log Listener initialized.");
        this.watchFile(path);
    }

    enable() {
        this.enabled = true;
        this.parent.opCode = Math.floor(Math.random() * 899 + 100);

        console.log("Log Listener enabled.");
        console.log(`Generated OP code: ${this.opCode}`);
    }
    
    disable() {
        this.enabled = false;
        this.parent.opCode = '';

        console.log("Log Listener disabled.");
    }

    async getUUID(username) {
        if (this.cachedUUIDS.includes(username)) {
            return this.cachedUUIDS[username];
        }

        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

        if (response.status === 204) {
            console.log(`UUID not found for player [${username}]. Defaulting to username!`)
            return username;
        }

        const data = await response.json();
        const uuid = data.id || username;

        this.cachedUUIDS[username] = uuid;
        return uuid;
    }

    matchChat(line) {
        for (const regex of chatPatterns) {
            const match = line.match(regex);
            if (match) return match;
        }
        return null;
    }

    async onLine(text) {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
            const match = this.matchChat(line);
            if (match) {
                const [ , time, sender, message ] = match;

                const uuid = await this.getUUID(sender);
                this.parent.onMessage(uuid, sender, message);
            }
        }
    }

    watchFile(path) {
        var onLine = this.onLine;
        fs.watchFile(path, { interval: 100 }, (curr, prev) => {
            if (curr.size > prev.size) {
                const stream = fs.createReadStream(path, {
                    start: prev.size,
                    end: curr.size,
                });

                let newData = '';
                stream.on('data', chunk => newData += chunk);
                stream.on('end', () => onLine(newData));
            }
        });

        console.log(`Watching file changes: ${path}`);
    }
}

module.exports = logListener;