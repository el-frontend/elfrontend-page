// ============================================================
// arcade-audio.jsx — Web Audio 8-bit blips & coin sounds
// ============================================================

let _audioCtx = null;
const getCtx = () => {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
  }
  return _audioCtx;
};

const _SOUND_ON = { current: true };
const setSoundEnabled = (on) => { _SOUND_ON.current = !!on; };

// Generic blip
const blip = (freq=440, dur=0.08, type='square', vol=0.08, slide=0) => {
  if (!_SOUND_ON.current) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(60, freq+slide), ctx.currentTime+dur);
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime+dur+0.01);
  } catch(e) {}
};

// Coin sound — Mario-like 2-tone (B5 → E6)
const playCoin = () => {
  if (!_SOUND_ON.current) return;
  blip(988, 0.08, 'square', 0.08);
  setTimeout(()=>blip(1319, 0.18, 'square', 0.08), 70);
};

// 1-up / power-up
const playPowerUp = () => {
  if (!_SOUND_ON.current) return;
  const notes = [523, 659, 784, 1047, 1319, 1568];
  notes.forEach((f,i)=>setTimeout(()=>blip(f, 0.08, 'square', 0.07), i*60));
};

// Small click
const playClick = () => blip(660, 0.04, 'square', 0.04);

// Type sound (terminal)
const playType = () => blip(880+Math.random()*120, 0.018, 'square', 0.025);

// Send
const playSend = () => {
  blip(523, 0.06, 'square', 0.06);
  setTimeout(()=>blip(880, 0.08, 'square', 0.06), 50);
};

// Hover swoosh
const playHover = () => blip(1320, 0.02, 'triangle', 0.02);

// Konami fanfare
const playFanfare = () => {
  const notes = [523, 659, 784, 1047, 880, 1047, 1319, 1568];
  notes.forEach((f,i)=>setTimeout(()=>blip(f, 0.14, 'square', 0.08), i*100));
};

Object.assign(window, { setSoundEnabled, blip, playCoin, playPowerUp, playClick, playType, playSend, playHover, playFanfare });
