// Web Audio API Krump Drum & Synth Loop Generator
class KrumpAudioBeat {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private step = 0;
  private isPlaying = false;

  public start() {
    if (this.isPlaying) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.isPlaying = true;
    this.step = 0;

    // 120 BPM street beat (250ms per 16th note)
    this.intervalId = window.setInterval(() => {
      this.playStep();
      this.step = (this.step + 1) % 16;
    }, 125);
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  private playStep() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Heavy Kick on 0, 4, 8, 10, 12
    if ([0, 4, 8, 10, 12].includes(this.step)) {
      this.playKick(now);
    }

    // Heavy Snare / Stomp on 4, 12
    if ([4, 12].includes(this.step)) {
      this.playSnare(now);
    }

    // Hi-hat on every odd step
    if (this.step % 2 === 1) {
      this.playHiHat(now);
    }

    // Sub Bass Stabs on 0, 8
    if ([0, 8].includes(this.step)) {
      this.playBassLine(now);
    }
  }

  private playKick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  private playSnare(time: number) {
    if (!this.ctx) return;
    
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.1);
  }

  private playHiHat(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.value = 8000;

    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playBassLine(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, time); // A1
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.2);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.25);
  }
}

export const krumpBeatPlayer = new KrumpAudioBeat();
