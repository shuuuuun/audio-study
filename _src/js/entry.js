
// Init
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let audioBuffer = null;

const container = document.querySelector('.container');
const winH = window.innerHeight;
const pitchRange = 30;
let oscillator;
document.addEventListener('mousedown', evt => {
  const pitch = pitchRange * evt.clientY / winH;
  console.log(evt.clientY, pitch);
  oscillator = playSoundHz(getHz(pitch));
});
document.addEventListener('mousemove', evt => {
  if (!oscillator) return;
  const pitch = pitchRange * evt.clientY / winH;
  const hz = getHz(pitch);
  console.log(evt.clientY, pitch);
  oscillator.frequency.value = hz;
});
document.addEventListener('mouseup', () => {
  console.log('mouseup');
  oscillator.stop();
  oscillator = null;
});
document.addEventListener('mouseleave', () => {
  console.log('mouseleave');
  oscillator.stop();
  oscillator = null;
});


// Function
function getHz(pitch) {
  const basisHz = 442;
  const hz = basisHz * Math.pow(2, (1 / 12) * (pitch - 9));
  return hz;
}

function playSoundHz(hz, duration) {
  console.log('playSoundHz');
  const oscillator = context.createOscillator();
  const audioDestination = context.destination;

  oscillator.frequency.value = hz;
  oscillator.connect(audioDestination);
  oscillator.start = oscillator.start || oscillator.noteOn; // クロスブラウザ対応
  oscillator.start();

  return oscillator;
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     oscillator.stop();
  //     resolve();
  //   }, duration);
  // });
}

function playSound(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  return source;
}

function getAudioBuffer(url, fn) {
  const req = new XMLHttpRequest();
  req.responseType = 'arraybuffer';

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        context.decodeAudioData(req.response, buffer => fn(buffer));
      }
    }
  };

  req.open('GET', url, true);
  req.send('');
}

function sleep(duration) {
  return () => new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
