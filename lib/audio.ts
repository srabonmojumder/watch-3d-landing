// Web Audio API synthesizer for luxury acoustic feedback and concierge bell chime

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Authentic Parisian concierge desk bell chime
  public playConciergeBell() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Harmonic frequencies typical of a high-quality solid brass counter bell (approx C7 / D7 fundamental)
    const partials = [
      { freq: 2093.0, gain: 0.35, decay: 2.8 }, // Fundamental C7
      { freq: 3135.96, gain: 0.22, decay: 2.2 }, // G7 (fifth)
      { freq: 4186.01, gain: 0.15, decay: 1.6 }, // C8 (octave)
      { freq: 5274.04, gain: 0.08, decay: 1.2 }, // E8 (third)
      { freq: 6271.93, gain: 0.05, decay: 0.9 }, // G8
      { freq: 8372.02, gain: 0.03, decay: 0.5 }, // Strike transients
    ];

    partials.forEach(({ freq, gain: targetGain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Strike transient with exponential decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(targetGain, now + 0.004);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  // Delicate watch winding mechanical click
  public playWindingClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.025);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(4.0, now);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Soft tactile haptic switch sound for dial/strap selections
  public playSoftClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.03);

    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  // Calibre V-101 balance wheel escapement tick
  public playEscapementTick(high: boolean = false) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(high ? 3200 : 2800, now);

    filter.type = "highpass";
    filter.frequency.setValueAtTime(1800, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  }
}

export const soundManager = new AudioEngine();

