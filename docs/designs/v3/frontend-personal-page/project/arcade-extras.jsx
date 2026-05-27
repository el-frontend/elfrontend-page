// ============================================================
// arcade-extras.jsx — Walking sprite, Konami code, CRT boot
// ============================================================

// ---- Walking sprite that loops across the bottom ----
function WalkingSprite({accent='var(--brand)'}) {
  const [frame, setFrame] = React.useState(0);
  React.useEffect(()=>{
    const t = setInterval(()=>setFrame(f=>f+1), 180);
    return ()=>clearInterval(t);
  }, []);
  return (
    <div style={{
      position:'fixed', bottom:8, left:-80, zIndex:50,
      animation: 'walk-x 28s linear infinite',
      pointerEvents:'none',
    }}>
      <PxWalker scale={4} frame={frame} accent={accent}/>
    </div>
  );
}

// ---- Konami code listener (↑↑↓↓←→←→BA) ----
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function useKonami(onTrigger) {
  React.useEffect(()=>{
    let buf = [];
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(k);
      if (buf.length > KONAMI.length) buf = buf.slice(-KONAMI.length);
      if (buf.length === KONAMI.length && buf.every((v,i)=>v===KONAMI[i])) {
        buf = []; onTrigger();
      }
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  }, [onTrigger]);
}

// ---- Konami banner element ----
function KonamiBanner({lang, onDone}) {
  React.useEffect(()=>{
    const t = setTimeout(onDone, 2500);
    return ()=>clearTimeout(t);
  }, [onDone]);
  return (
    <div className="konami">
      {COPY[lang].konami}
    </div>
  );
}

// ---- CRT boot animation ----
function runBootAnimation(lang) {
  const lines = [
    'ELFRONTEND BIOS v2.0',
    'Copyright (C) 2026, Carlos Chao.',
    '',
    'Memory Test...... 65536 KB OK',
    'CPU: M68K @ 7.83 MHz',
    'GPU: NES Pixel Engine',
    'Sound: 2A03 8-bit chiptune',
    '',
    'Loading kernel.....',
    'Mounting /home/carlos.....',
    'Starting ElFrontend services.....',
    'Loading youtube channel.....',
    'Loading blog posts.....',
    'Loading skill tree.....',
    'AI twin status: ONLINE',
    '',
    lang==='en' ? 'READY.' : 'LISTO.',
    lang==='en' ? '>>> press any key to continue <<<' : '>>> pulsa una tecla para continuar <<<',
  ];
  const boot = document.getElementById('boot');
  const text = document.getElementById('boot-text');
  if (!boot || !text) return Promise.resolve();
  text.textContent = '';
  let i = 0;
  let cancelled = false;

  return new Promise((resolve) => {
    const finishBoot = () => {
      if (cancelled) return;
      cancelled = true;
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
      boot.style.transition = 'opacity 0.4s ease';
      boot.style.opacity = '0';
      setTimeout(()=>{ boot.classList.add('done'); resolve(); }, 420);
    };
    const tick = () => {
      if (cancelled) return;
      if (i < lines.length) {
        text.textContent += lines[i] + '\n';
        i++;
        setTimeout(tick, lines[i-1]==='' ? 60 : 90 + Math.random()*60);
      } else {
        // wait a beat
        setTimeout(finishBoot, 1100);
      }
    };
    const skip = () => finishBoot();
    window.addEventListener('keydown', skip, { once:false });
    window.addEventListener('click', skip, { once:false });
    setTimeout(tick, 200);
  });
}

Object.assign(window, { WalkingSprite, useKonami, KonamiBanner, runBootAnimation });
