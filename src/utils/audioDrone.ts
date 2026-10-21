// Synthesizes a deep cinematic ambient soundscape using Web Audio API
class AmbientDroneAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Low drone base frequencies (A1 = 55Hz, E2 = 82.4Hz, A2 = 110Hz, C#3 = 138.6Hz)
      const frequencies = [55, 82.4, 110, 164.8];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Subtle slow detune modulation
        osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280 + idx * 40, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.15 / (idx + 1), this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        this.oscs.push(osc);
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;

    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      setTimeout(() => {
        this.oscs.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        this.oscs = [];
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambientDrone = new AmbientDroneAudio();
