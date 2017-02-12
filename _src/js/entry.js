import AudioController from './modules/AudioController';

const winH = window.innerHeight;
const audioController = new AudioController({
  rangeOfPitch: 30,
});

document.addEventListener('mousedown', evt => {
  const pitch = evt.clientY / winH;
  console.log(evt.clientY, pitch);
  audioController.play(pitch);
});
document.addEventListener('mousemove', evt => {
  if (!audioController.isPlaying) return;
  const pitch = evt.clientY / winH;
  console.log(evt.clientY, pitch);
  audioController.setPitch(pitch);
});
document.addEventListener('mouseup', () => {
  console.log('mouseup');
  audioController.stop();
});
document.addEventListener('mouseleave', () => {
  console.log('mouseleave');
  audioController.stop();
});
