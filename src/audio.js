// Synthesized Audio Controller using the Web Audio API

class AudioController {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientInterval = null;
    this.chordIndex = 0;

    // Soft ambient chords: [Cmaj9, Fmaj9, G6/9, Am9]
    this.chords = [
      [130.81, 164.81, 196.00, 246.94, 293.66], // C3, E3, G3, B3, D4
      [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4
      [196.00, 246.94, 293.66, 329.63, 440.00], // G3, B3, D4, E4, A4
      [220.00, 261.63, 329.63, 392.00, 493.88]  // A3, C4, E4, G4, B4
    ];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.", e);
    }
  }

  setMute(mute) {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = mute;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  toggleMute() {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  // Play a simple retro button click sound
  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Play a happy arpeggio sound for correct answers
  playCorrect() {
    if (this.isMuted || !this.ctx) return;
    this.init();

    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  }

  // Play a low, brief buzz for incorrect answers
  playIncorrect() {
    if (this.isMuted || !this.ctx) return;
    this.init();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Play a victory fanfare for quiz completion
  playVictory() {
    if (this.isMuted || !this.ctx) return;
    this.init();

    const now = this.ctx.currentTime;
    const notes = [
      { f: 261.63, d: 0.1, t: 0 },   // C4
      { f: 329.63, d: 0.1, t: 0.1 }, // E4
      { f: 392.00, d: 0.1, t: 0.2 }, // G4
      { f: 523.25, d: 0.15, t: 0.3 },// C5
      { f: 392.00, d: 0.1, t: 0.45 },// G4
      { f: 523.25, d: 0.4, t: 0.55 } // C5
    ];

    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.05, now + note.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.02);
    });
  }

  // Start the soft ambient music pad
  startAmbient() {
    this.stopAmbient();
    if (this.isMuted || !this.ctx) return;

    const playAmbientChord = () => {
      if (this.isMuted || !this.ctx) return;
      
      const now = this.ctx.currentTime;
      const chord = this.chords[this.chordIndex];
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;

      // Create filter to make the chords soft and warm
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);
      filter.Q.setValueAtTime(1, now);

      const delay = this.ctx.createDelay();
      delay.delayTime.setValueAtTime(0.4, now);
      const delayGain = this.ctx.createGain();
      delayGain.gain.setValueAtTime(0.3, now);

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Stagger note trigger slightly for organic arpeggio strum
        const noteStart = now + idx * 0.15;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        // Slow attack and long release envelope for ambient feel
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.015, noteStart + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 5.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        // Connect a bit of delay for richness
        gain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 5.5);
      });
    };

    // Trigger immediately and then on interval
    playAmbientChord();
    this.ambientInterval = setInterval(playAmbientChord, 6000);
  }

  stopAmbient() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const audio = new AudioController();
