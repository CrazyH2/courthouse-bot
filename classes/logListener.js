class logListener {
    constructor(parent) {
        this.parent = parent;
        this.enabled = false;

        console.log("Log Listener initialized.");
    }

    enable() {
        this.enabled = true;
        console.log("Log Listener enabled.");

        this.parent.opCode = Math.floor(Math.random() * 899 + 100);
        console.log(`Generated OP code: ${this.opCode}`);
    }
    
    disable() {
        this.enabled = false;
        this.parent.opCode = '';
        console.log("Log Listener disabled.");
    }
}

module.exports = logListener;