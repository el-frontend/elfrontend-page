// 8-bit blips via Web Audio. The AudioContext is created lazily on the
// first play call; browsers block construction until a user gesture and
// suspend the context anyway, so we always try to resume() before scheduling.

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let ctx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  try {
    const Ctor =
      window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  } catch {
    ctx = null;
  }
  return ctx;
}

export function setSoundEnabled(on: boolean) {
  enabled = !!on;
}

type Wave = OscillatorType;

function blip(freq = 440, dur = 0.08, type: Wave = "square", vol = 0.08, slide = 0) {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  try {
    if (c.state === "suspended") void c.resume();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    if (slide) {
      o.frequency.exponentialRampToValueAtTime(
        Math.max(60, freq + slide),
        c.currentTime + dur,
      );
    }
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + dur + 0.01);
  } catch {
    // ignore — context may have been closed
  }
}

export function playClick() {
  blip(660, 0.04, "square", 0.04);
}

export function playHover() {
  blip(1320, 0.02, "triangle", 0.02);
}

export function playType() {
  blip(880 + Math.random() * 120, 0.018, "square", 0.025);
}

export function playSend() {
  blip(523, 0.06, "square", 0.06);
  setTimeout(() => blip(880, 0.08, "square", 0.06), 50);
}

export function playCoin() {
  if (!enabled) return;
  blip(988, 0.08, "square", 0.08);
  setTimeout(() => blip(1319, 0.18, "square", 0.08), 70);
}

export function playPowerUp() {
  if (!enabled) return;
  const notes = [523, 659, 784, 1047, 1319, 1568];
  notes.forEach((f, i) => setTimeout(() => blip(f, 0.08, "square", 0.07), i * 60));
}

export function playFanfare() {
  if (!enabled) return;
  const notes = [523, 659, 784, 1047, 880, 1047, 1319, 1568];
  notes.forEach((f, i) => setTimeout(() => blip(f, 0.14, "square", 0.08), i * 100));
}
