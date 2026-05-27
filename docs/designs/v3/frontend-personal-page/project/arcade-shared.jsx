// ============================================================
// arcade-shared.jsx — Shared constants used across pages
// (Tweaks defaults, accent options, font sets)
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "purple",
  "difficulty": "medium",
  "fontSet": "mixed",
  "scanlines": true,
  "sound": true,
  "lang": "en",
  "showBoot": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  { key:'purple', label:'Purple', color:'#a070ff', deep:'#7a23dc' },
  { key:'green',  label:'Green',  color:'#5dd55d', deep:'#2a8a2a' },
  { key:'amber',  label:'Amber',  color:'#fcd34d', deep:'#a87800' },
  { key:'pink',   label:'Pink',   color:'#ff6b8a', deep:'#c43160' },
  { key:'cyan',   label:'Cyan',   color:'#6cb4ee', deep:'#2a6fb0' },
];

const FONT_SETS = {
  mixed:    { display:'"Press Start 2P", monospace', body:'"VT323", monospace', ui:'"Silkscreen", monospace' },
  starpress:{ display:'"Press Start 2P", monospace', body:'"Press Start 2P", monospace', ui:'"Press Start 2P", monospace' },
  vt323:    { display:'"VT323", monospace', body:'"VT323", monospace', ui:'"VT323", monospace' },
  silkscreen:{display:'"Silkscreen", monospace', body:'"VT323", monospace', ui:'"Silkscreen", monospace' },
};

// Mount helper — runs boot then mounts a component
async function arcadeBoot(Component) {
  const skip = sessionStorage.getItem('boot-done') === '1' || !TWEAK_DEFAULTS.showBoot;
  if (skip) {
    const boot = document.getElementById('boot'); if (boot) boot.classList.add('done');
  } else {
    await runBootAnimation(TWEAK_DEFAULTS.lang);
    sessionStorage.setItem('boot-done', '1');
  }
  document.body.classList.add(TWEAK_DEFAULTS.scanlines ? 'crt-on' : 'crt-off');
  ReactDOM.createRoot(document.getElementById('root')).render(<Component/>);
}

Object.assign(window, { TWEAK_DEFAULTS, ACCENT_OPTIONS, FONT_SETS, arcadeBoot });
