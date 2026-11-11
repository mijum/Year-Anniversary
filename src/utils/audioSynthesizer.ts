/**
 * Web Audio API Synthesizer & Romantic Sound FX
 * Generates an ethereal, romantic acoustic music box ambience and gentle UI sounds.
 * Fully royalty-free, requires zero external downloads, resilient to broken media links.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private volume: number = 0.5;
  private musicIntervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private externalAudio: HTMLAudioElement | null = null;
  private noteIndex: number = 0;
  private currentUrl: string = '';

  // Gentle romantic music box arpeggio frequencies (Hz) - D Major / F# Minor / G Major romantic cadence
  private readonly melodyNotes: number[] = [
    293.66, 369.99, 440.00, 587.33, // D major
    220.00, 277.18, 329.63, 440.00, // A major
    246.94, 293.66, 369.99, 493.88, // B minor
    185.00, 220.00, 277.18, 369.99, // F# minor
    196.00, 246.94, 293.66, 392.00, // G major
    220.00, 293.66, 369.99, 440.00, // D major / A
    196.00, 246.94, 293.66, 392.00, // G major
    220.00, 277.18, 329.63, 440.00, // A sus
    329.63, 369.99, 440.00, 587.33,
    440.00, 493.88, 587.33, 659.25,
    392.00, 440.00, 493.88, 587.33,
    293.66, 369.99, 440.00, 587.33,
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public async startMusic(customUrl?: string) {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    if (customUrl !== undefined) {
      this.currentUrl = customUrl;
    }

    if (this.currentUrl && this.currentUrl.trim() !== '') {
      try {
        if (!this.externalAudio) {
          this.externalAudio = new Audio(this.currentUrl);
          this.externalAudio.loop = true;
          this.externalAudio.volume = this.isMuted ? 0 : this.volume * 0.45;
        }
        await this.externalAudio.play();
        return;
      } catch (err) {
        console.warn('Audio playback fallback to synthesized music box', err);
      }
    }

    const ctx = this.getContext();
    if (!ctx) return;

    if (this.musicGain) {
      const now = ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.setValueAtTime(0.001, now);
      this.musicGain.gain.exponentialRampToValueAtTime(
        this.isMuted ? 0.0001 : 0.16,
        now + 1.2
      );
    }

    // Play synthesized warm music box notes
    this.noteIndex = 0;
    this.playNextMusicNote();
    if (this.musicIntervalId) clearInterval(this.musicIntervalId);
    this.musicIntervalId = window.setInterval(() => {
      this.playNextMusicNote();
    }, 520);
  }

  private playNextMusicNote() {
    if (!this.isMusicPlaying || this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.musicGain) return;

    const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
    this.noteIndex++;

    const now = ctx.currentTime;

    // Primary bell tone
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1450, now);

    // Warm sine wave with subtle triangle harmonic
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope: quick gentle attack, soft ringing decay
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 1.8);

    // Music box acoustic shimmer overtone on certain beats
    if (this.noteIndex % 3 === 0) {
      const harmOsc = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(freq * 2, now);

      harmGain.gain.setValueAtTime(0, now);
      harmGain.gain.linearRampToValueAtTime(0.035, now + 0.02);
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      harmOsc.connect(harmGain);
      harmGain.connect(this.musicGain);

      harmOsc.start(now);
      harmOsc.stop(now + 1.3);
    }
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
  }

  public stopMusic() {
    this.pauseMusic();
  }

  public togglePlayPause(): boolean {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    const ctx = this.getContext();

    if (this.masterGain && ctx) {
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.volume, now + 0.15);
    }

    if (this.externalAudio) {
      this.externalAudio.volume = this.isMuted ? 0 : this.volume * 0.45;
    }

    return this.isMuted;
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    const ctx = this.getContext();

    if (this.masterGain && ctx && !this.isMuted) {
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.05);
    }

    if (this.externalAudio && !this.isMuted) {
      this.externalAudio.volume = this.volume * 0.45;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playEnvelopeOpenSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;

    // Soft paper rustle via filtered noise
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.3);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);

    // Warm subtle glockenspiel ping
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now + 0.05); // C5
    oscGain.gain.setValueAtTime(0.06, now + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now + 0.05);
    osc.stop(now + 0.65);
  }

  public playSparkleSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      noteGain.gain.setValueAtTime(0.05, now + idx * 0.06);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);

      osc.connect(noteGain);
      noteGain.connect(this.sfxGain!);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.55);
    });
  }

  public playHeartNoteSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6 gentle arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      noteGain.gain.setValueAtTime(0.06, now + idx * 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

      osc.connect(noteGain);
      noteGain.connect(this.sfxGain!);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.65);
    });
  }

  public playFlowerBloomSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      noteGain.gain.setValueAtTime(0.05, now + idx * 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.5);

      osc.connect(noteGain);
      noteGain.connect(this.sfxGain!);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.55);
    });
  }

  public playCelebrationChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C Major 9 celebratory harp chord

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.08, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.05);
      osc.stop(now + 1.5);
    });
  }

  public playDistantFireworkPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

    oscGain.gain.setValueAtTime(0.08, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain!);
    osc.start(now);
    osc.stop(now + 0.4);
  }
}

export const romanticAudio = new RomanticAudioEngine();
