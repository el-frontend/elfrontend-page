// ============================================================
// arcade-sprites.jsx — Pixel SVG sprites & icons
// ============================================================

// Resolve color tokens (string keys → CSS var)
const tokenColor = (name) => {
  if (!name) return 'var(--ink)';
  if (name.startsWith('#') || name.startsWith('rgb')) return name;
  const map = {
    ink: 'var(--ink)', dim: 'var(--dim)', dim2: 'var(--dim-2)',
    brand: 'var(--brand)', 'brand-deep':'var(--brand-deep)',
    'hot-yellow':'var(--hot-yellow)','hot-green':'var(--hot-green)',
    'hot-pink':'var(--hot-pink)','hot-blue':'var(--hot-blue)',
    'hot-orange':'var(--hot-orange)','hot-red':'var(--hot-red)',
  };
  return map[name] || name;
};

// Make a 1-color pixel sprite SVG from a string grid
const makePixSprite = (rows, fg, scale=4, palette=null) => {
  const w = rows[0].length, h = rows.length;
  return (
    <svg width={w*scale} height={h*scale} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" style={{display:'block', imageRendering:'pixelated'}}>
      {rows.map((row,y)=>[...row].map((c,x)=>{
        if (c === '.' || c === ' ') return null;
        const color = palette ? palette[c] : fg;
        if (!color) return null;
        return <rect key={x+'-'+y} x={x} y={y} width="1" height="1" fill={color}/>;
      }))}
    </svg>
  );
};

// --- Heart ---
const PxHeart = ({scale=4, color='var(--hot-pink)'}) => makePixSprite([
  '.##.##.',
  '#######',
  '#######',
  '.#####.',
  '..###..',
  '...#...',
], color, scale);

// --- Star ---
const PxStar = ({scale=4, color='var(--hot-yellow)'}) => makePixSprite([
  '..#..',
  '.###.',
  '#####',
  '.###.',
  '..#..',
], color, scale);

// --- Arrow (right-pointing) ---
const PxArrow = ({scale=3, color='currentColor', dir='right'}) => {
  const rows = ['#....','##...','###..','####.','###..','##...','#....'];
  let r = rows;
  if (dir==='left') r = rows.map(s=>[...s].reverse().join(''));
  if (dir==='down') r = ['#####','.###.','.###.','..#..'];
  if (dir==='up')   r = ['..#..','.###.','.###.','#####'];
  return makePixSprite(r, color, scale);
};

// --- Coin spinning frames (4) ---
const COIN_FRAMES = [
  ['..###..','.#####.','#######','#######','#######','.#####.','..###..'],
  ['..###..','.#.#.#.','#.#.#.#','#.#.#.#','#.#.#.#','.#.#.#.','..###..'],
  ['..###..','.#...#.','#.....#','#.....#','#.....#','.#...#.','..###..'],
  ['..###..','.#...#.','#.....#','#.....#','#.....#','.#...#.','..###..'].map(s=>[...s].reverse().join('')),
];
const PxCoin = ({scale=4, frame=0, color='var(--hot-yellow)'}) => makePixSprite(COIN_FRAMES[frame%4], color, scale);

// --- Carlos avatar (16x16) ---
const AVATAR_PIX = [
  '\'\'\'\'#####\'\'\'\'\'\'\'\'',
  '\'\'\'########\'\'\'\'\'\'',
  '\'\'#########_\'\'\'\'\'',
  '\'#####.....#\'\'\'\'\'',
  '\'####.o..o..\'\'\'\'\'',
  '\'###........\'\'\'\'\'',
  '\'###..__..._\'\'\'\'\'',
  '\'\'##..====..\'\'\'\'\'',
  '\'\'\'#.======.\'\'\'\'\'',
  '\'\'\'\'========\'\'\'\'\'',
  '\'\'\'::::::::::\'\'\'\'',
  '\'\':::::::::::\'\'\'\'',
  '\':::::::::::::\'\'\'',
  '::::::::::::::::',
  '::::::::::::::::',
  '::::::::::::::::',
];

const PxAvatar = ({scale=8, bg='#1d1438', shirt='var(--brand)'}) => {
  const palette = {
    '.': '#f4cba1',
    '#': '#1a1a1a',
    'o': shirt,
    '_': '#c99a78',
    '=': '#2a2a2a',
    ':': shirt,
    '\'': bg,
  };
  return makePixSprite(AVATAR_PIX, null, scale, palette);
};

// --- Walking sprite (Carlos walking, simple 4-frame mini-Carlos) ---
// 8x10 sprite, 2 frames swap
const WALK_FRAME_1 = [
  '..####..',
  '.#oooo#.',
  '.#oOOo#.',
  '.######.',
  '##.##.##',
  '##.##.##',
  '##.##.##',
  '##.##.##',
  '#......#',
  '.#....#.',
];
const WALK_FRAME_2 = [
  '..####..',
  '.#oooo#.',
  '.#oOOo#.',
  '.######.',
  '.##.##..',
  '.##.##..',
  '##.##.##',
  '##.##.##',
  '#......#',
  '#......#',
];
const PxWalker = ({scale=4, frame=0, accent='var(--brand)', hair='#1a1a1a', skin='#f4cba1'}) => {
  const palette = { '#':hair, 'o':skin, 'O':accent, '.':'transparent' };
  return makePixSprite(frame%2===0 ? WALK_FRAME_1 : WALK_FRAME_2, null, scale, palette);
};

// --- Mushroom (power-up) ---
const PxMushroom = ({scale=4}) => {
  const palette = { '#':'#000', 'R':'var(--hot-red)','W':'#fff','S':'#f4cba1' };
  return makePixSprite([
    '..#####..',
    '.#RRRRR#.',
    '#RWWRRWW#',
    '#WWWRRWWW',
    '#RWWWWWWR',
    '#RRRRRRRR',
    '.#SSSSS#.',
    '.#S###S#.',
    '..#####..',
  ], null, scale, palette);
};

// --- Floppy disk icon ---
const PxFloppy = ({scale=3, color='var(--ink)'}) => makePixSprite([
  '#########',
  '#......##',
  '#......##',
  '#......##',
  '#.######.',
  '#........',
  '#.######.',
  '#.#....#.',
  '#.#....#.',
  '#########',
], color, scale);

// --- Controller D-pad ---
const PxController = ({scale=3, color='var(--ink)'}) => makePixSprite([
  '...#######.....',
  '..#.......#####',
  '.#..###....OO.#',
  '#..#####.OOOO.#',
  '#..#####.OOOO.#',
  '.#..###....OO.#',
  '..#.......#####',
  '...#######.....',
], null, scale, { '#':color, 'O':'var(--hot-red)','.':'transparent' });

// --- Trophy ---
const PxTrophy = ({scale=3, color='var(--hot-yellow)'}) => makePixSprite([
  '..#####..',
  '#.#####.#',
  '#.#####.#',
  '.#####.#.',
  '..###....',
  '..###....',
  '.#####...',
  '#######..',
], color, scale);

// --- Lucide-ish icons (line) for ones we need outside pixel space ---
const Ic = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
      <rect width="20" height="16" x="2" y="4"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  rss: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
      <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>
    </svg>
  ),
};

// --- Social pixel glyphs ---
const SOCIAL_GLYPHS = {
  youtube: ['..#####..','.#######.','#####....','#####.####','#####....','.#######.','..#####..'],
  github: ['..#####..','.##...##.','#..#.#..#','##.....##','#.#####.#','##..#..##','.##...##.','..#####..'],
  linkedin: ['########','#......#','#.##.#.#','#......#','#.####.#','#.#..#.#','#.#..#.#','########'],
  twitch: ['########','#......#','#.##.#.#','#.##.#.#','########','...#....','..##....','.##.....'],
  instagram: ['########','#......#','#.####.#','#.#..#.#','#.####.#','#......#','########','.......'],
  x: ['#.....#','.#...#.','..#.#..','...#...','..#.#..','.#...#.','#.....#'],
};

const PxSocial = ({id, scale=3, color='currentColor'}) => makePixSprite(SOCIAL_GLYPHS[id] || SOCIAL_GLYPHS.github, color, scale);

// --- Pixel logo "EF" mark ---
const PxLogo = ({scale=4}) => {
  const palette = { '#':'var(--brand)', 'P':'var(--hot-yellow)', '.':'transparent' };
  return makePixSprite([
    '########..PPPP..',
    '########..PPPP..',
    '###.....PPP....P',
    '###....PPP....PP',
    '######PPPPPPPP..',
    '######PPPPPPPP..',
    '###...PPP....PP.',
    '###...PPP....PP.',
    '########PPPPPP..',
    '########PPPPPP..',
  ], null, scale, palette);
};

// --- Simple "block 8x8 letter" pixel font for big titles (optional)---
// (skipped — Press Start 2P handles it)

// --- "Coin flying up" floating animation ---
const FloatingCoin = ({left, top}) => (
  <div style={{position:'absolute', left, top, pointerEvents:'none', animation:'float-up 0.8s ease-out forwards'}}>
    <PxCoin scale={3}/>
  </div>
);

Object.assign(window, {
  tokenColor, makePixSprite,
  PxHeart, PxStar, PxArrow, PxCoin, PxAvatar, PxWalker, PxMushroom, PxFloppy, PxController, PxTrophy,
  PxSocial, PxLogo, Ic, FloatingCoin,
});
