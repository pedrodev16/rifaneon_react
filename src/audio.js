class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.soundBuffers = new Map();
    }

    async loadSound(name, url) {
        if (this.soundBuffers.has(name)) {
            return;
        }
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.soundBuffers.set(name, buffer);
        } catch (e) {
            console.error(`Error loading sound: ${name}`, e);
        }
    }

    playSound(name) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        const buffer = this.soundBuffers.get(name);
        if (buffer) {
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(0);
        } else {
            console.warn(`Sound not found: ${name}`);
        }
    }
}

export const audioManager = new AudioManager();

