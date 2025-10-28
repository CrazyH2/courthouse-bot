const fs = require('fs');

class logListener {
    constructor(parent, path) {
        this.parent = parent;
        this.enabled = false;
        this.chatPatterns = [
            /\[(\d{2}:\d{2}:\d{2})\] \[.*?\/INFO\]: (?:\[System\] \[CHAT\] |\[CHAT\] )?(.*?): (.*)/,
            /\[(\d{2}:\d{2}:\d{2})\] \[(.*?)\/INFO\]: (?:\[SYSTEM\] )?\[CHAT\] <([^>]+)> (.*)/
        ];
        this.cachedUUIDS = {};
        this.lastSender = null;
        this.lastMessage = null;

        console.log("[SERVER] Log Listener initialized.");
        this.watchFile(path);
    }

    enable() {
        this.enabled = true;
        this.parent.opCode = Math.floor(Math.random() * 899 + 100);

        console.log("[SERVER] Log Listener enabled.");
        console.log(`[SERVER] Generated OP code: ${this.opCode}`);
    }

    disable() {
        this.enabled = false;
        this.parent.opCode = '';

        console.log("[SERVER] Log Listener disabled.");
    }

    async getUUID(username) {
        if (Object.keys(this.cachedUUIDS).includes(username)) {
            return this.cachedUUIDS[username];
        }

        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

        if (response.status === 204) {
            console.log(`[SERVER] UUID not found for player [${username}]. Defaulting to username!`)
            return username;
        }

        const data = await response.json();
        const uuid = data.id || username;

        this.cachedUUIDS[username] = uuid;
        return uuid;
    }

    matchChat(line) {
        for (const regex of this.chatPatterns) {
            const match = line.match(regex);
            if (match) {
                if (regex === this.chatPatterns[0]) {
                    return {
                        time: match[1],
                        sender: match[2],
                        message: match[3]
                    };
                } else if (regex === this.chatPatterns[1]) {
                    return {
                        time: match[1],
                        sender: match[3],
                        message: match[4]
                    };
                }
            }
        }
        return null;
    }

    async onLine(text) {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
            const match = this.matchChat(line);
            if (match) {
                let { time, sender, message } = match;
                sender = sender.split(' ').at(-1) || sender;

                const uuid = await this.getUUID(sender);
                this.parent.onMessage(uuid, sender, message);
            }
        }
    }

    watchFile(path) {
        var onLine = this.onLine.bind(this);
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

        console.log(`[SERVER] Watching file changes: ${path}`);
    }
}

module.exports = logListener;