const BASIS_HZ = 442;

export default class AudioController {
  constructor(opts = {}) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.rangeOfPitch = opts.rangeOfPitch || 30;
  }

  setPitch(pitch) {
    if (!this.oscillator) return;
    this.oscillator.frequency.value = this.getHz(pitch);
  }

  play(pitch) {
    this.playHz(this.getHz(pitch));
  }

  playHz(hz) {
    console.log('play');
    this.oscillator = this.context.createOscillator();

    this.oscillator.frequency.value = hz;
    this.oscillator.connect(this.context.destination);
    this.oscillator.start = this.oscillator.start || this.oscillator.noteOn; // クロスブラウザ対応
    this.oscillator.start();
    this.isPlaying = true;
  }

  stop() {
    if (!this.oscillator) return;
    console.log('stop');
    this.oscillator.stop();
    this.oscillator = null;
    this.isPlaying = false;
  }

  getHz(pitch) {
    pitch = pitch * this.rangeOfPitch;
    const hz = BASIS_HZ * Math.pow(2, (1 / 12) * (pitch - 9));
    return hz;
  }
}
