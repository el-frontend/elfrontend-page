import type { CSSProperties } from "react";

type PixSpriteProps = {
  rows: string[];
  color?: string;
  scale?: number;
  palette?: Record<string, string>;
  style?: CSSProperties;
};

export function PixSprite({ rows, color, scale = 4, palette, style }: PixSpriteProps) {
  const h = rows.length;
  const w = rows[0]?.length ?? 0;
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated", ...style }}
      aria-hidden
    >
      {rows.flatMap((row, y) =>
        Array.from(row).map((c, x) => {
          if (c === "." || c === " ") return null;
          const fill = palette ? palette[c] : color;
          if (!fill || fill === "transparent") return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />;
        }),
      )}
    </svg>
  );
}

// ---- Heart ----
const HEART = [
  ".##.##.",
  "#######",
  "#######",
  ".#####.",
  "..###..",
  "...#...",
];
export function PxHeart({ scale = 4, color = "var(--hot-pink)" }: { scale?: number; color?: string }) {
  return <PixSprite rows={HEART} color={color} scale={scale} />;
}

// ---- Star ----
const STAR = ["..#..", ".###.", "#####", ".###.", "..#.."];
export function PxStar({ scale = 4, color = "var(--hot-yellow)" }: { scale?: number; color?: string }) {
  return <PixSprite rows={STAR} color={color} scale={scale} />;
}

// ---- Arrow (right by default) ----
const ARROW_RIGHT = ["#....", "##...", "###..", "####.", "###..", "##...", "#...."];
const ARROW_UP = ["..#..", ".###.", ".###.", "#####"];
const ARROW_DOWN = ["#####", ".###.", ".###.", "..#.."];

export function PxArrow({
  scale = 3,
  color = "currentColor",
  dir = "right",
}: {
  scale?: number;
  color?: string;
  dir?: "left" | "right" | "up" | "down";
}) {
  let rows = ARROW_RIGHT;
  if (dir === "left") rows = ARROW_RIGHT.map((s) => s.split("").reverse().join(""));
  if (dir === "up") rows = ARROW_UP;
  if (dir === "down") rows = ARROW_DOWN;
  return <PixSprite rows={rows} color={color} scale={scale} />;
}

// ---- Coin ----
const COIN = [
  "..###..",
  ".#####.",
  "#######",
  "#######",
  "#######",
  ".#####.",
  "..###..",
];
export function PxCoin({ scale = 4, color = "var(--hot-yellow)" }: { scale?: number; color?: string }) {
  return <PixSprite rows={COIN} color={color} scale={scale} />;
}

// ---- Avatar (Carlos pixel portrait) ----
const AVATAR_PIX = [
  "''''#####'''''''",
  "'''########'''''",
  "''#########_''''",
  "'#####.....#''''",
  "'####.o..o..''''",
  "'###........''''",
  "'###..__...._'''",
  "''##..====..''''",
  "'''#.======.''''",
  "''''========''''",
  "'''::::::::::'''",
  "''::::::::::::''",
  "':::::::::::::''",
  "::::::::::::::::",
  "::::::::::::::::",
  "::::::::::::::::",
];

export function PxAvatar({
  scale = 8,
  bg = "#1d1438",
  shirt = "var(--brand)",
}: {
  scale?: number;
  bg?: string;
  shirt?: string;
}) {
  const palette: Record<string, string> = {
    ".": "#f4cba1",
    "#": "#1a1a1a",
    o: shirt,
    _: "#c99a78",
    "=": "#2a2a2a",
    ":": shirt,
    "'": bg,
  };
  return <PixSprite rows={AVATAR_PIX} palette={palette} scale={scale} />;
}

// ---- Walking sprite (2 frames swap) ----
const WALK_FRAME_1 = [
  "..####..",
  ".#oooo#.",
  ".#oOOo#.",
  ".######.",
  "##.##.##",
  "##.##.##",
  "##.##.##",
  "##.##.##",
  "#......#",
  ".#....#.",
];
const WALK_FRAME_2 = [
  "..####..",
  ".#oooo#.",
  ".#oOOo#.",
  ".######.",
  ".##.##..",
  ".##.##..",
  "##.##.##",
  "##.##.##",
  "#......#",
  "#......#",
];
export function PxWalker({
  scale = 4,
  frame = 0,
  accent = "var(--brand)",
  hair = "#1a1a1a",
  skin = "#f4cba1",
}: {
  scale?: number;
  frame?: number;
  accent?: string;
  hair?: string;
  skin?: string;
}) {
  const palette: Record<string, string> = {
    "#": hair,
    o: skin,
    O: accent,
    ".": "transparent",
  };
  return (
    <PixSprite
      rows={frame % 2 === 0 ? WALK_FRAME_1 : WALK_FRAME_2}
      palette={palette}
      scale={scale}
    />
  );
}

// ---- Mushroom ----
const MUSHROOM = [
  "..#####..",
  ".#RRRRR#.",
  "#RWWRRWW#",
  "#WWWRRWWW",
  "#RWWWWWWR",
  "#RRRRRRRR",
  ".#SSSSS#.",
  ".#S###S#.",
  "..#####..",
];
export function PxMushroom({ scale = 4 }: { scale?: number }) {
  const palette: Record<string, string> = {
    "#": "#000",
    R: "var(--hot-red)",
    W: "#fff",
    S: "#f4cba1",
  };
  return <PixSprite rows={MUSHROOM} palette={palette} scale={scale} />;
}

// ---- Floppy ----
const FLOPPY = [
  "#########",
  "#......##",
  "#......##",
  "#......##",
  "#.######.",
  "#........",
  "#.######.",
  "#.#....#.",
  "#.#....#.",
  "#########",
];
export function PxFloppy({ scale = 3, color = "var(--ink)" }: { scale?: number; color?: string }) {
  return <PixSprite rows={FLOPPY} color={color} scale={scale} />;
}

// ---- Controller ----
const CONTROLLER = [
  "...#######.....",
  "..#.......#####",
  ".#..###....OO.#",
  "#..#####.OOOO.#",
  "#..#####.OOOO.#",
  ".#..###....OO.#",
  "..#.......#####",
  "...#######.....",
];
export function PxController({
  scale = 3,
  color = "var(--ink)",
}: {
  scale?: number;
  color?: string;
}) {
  const palette: Record<string, string> = {
    "#": color,
    O: "var(--hot-red)",
    ".": "transparent",
  };
  return <PixSprite rows={CONTROLLER} palette={palette} scale={scale} />;
}

// ---- Trophy ----
const TROPHY = [
  "..#####..",
  "#.#####.#",
  "#.#####.#",
  ".#####.#.",
  "..###....",
  "..###....",
  ".#####...",
  "#######..",
];
export function PxTrophy({
  scale = 3,
  color = "var(--hot-yellow)",
}: {
  scale?: number;
  color?: string;
}) {
  return <PixSprite rows={TROPHY} color={color} scale={scale} />;
}

// ---- Logo ----
const LOGO = [
  "########..PPPP..",
  "########..PPPP..",
  "###.....PPP....P",
  "###....PPP....PP",
  "######PPPPPPPP..",
  "######PPPPPPPP..",
  "###...PPP....PP.",
  "###...PPP....PP.",
  "########PPPPPP..",
  "########PPPPPP..",
];
export function PxLogo({ scale = 4 }: { scale?: number }) {
  const palette: Record<string, string> = {
    "#": "var(--brand)",
    P: "var(--hot-yellow)",
    ".": "transparent",
  };
  return <PixSprite rows={LOGO} palette={palette} scale={scale} />;
}

// ---- Socials ----
const SOCIAL_GLYPHS: Record<string, string[]> = {
  youtube: [
    "..#####..",
    ".#######.",
    "#####....",
    "#####.###",
    "#####....",
    ".#######.",
    "..#####..",
  ],
  github: [
    "..#####..",
    ".##...##.",
    "#..#.#..#",
    "##.....##",
    "#.#####.#",
    "##..#..##",
    ".##...##.",
    "..#####..",
  ],
  linkedin: [
    "########",
    "#......#",
    "#.##.#.#",
    "#......#",
    "#.####.#",
    "#.#..#.#",
    "#.#..#.#",
    "########",
  ],
  twitch: [
    "########",
    "#......#",
    "#.##.#.#",
    "#.##.#.#",
    "########",
    "...#....",
    "..##....",
    ".##.....",
  ],
  instagram: [
    "########",
    "#......#",
    "#.####.#",
    "#.#..#.#",
    "#.####.#",
    "#......#",
    "########",
    "........",
  ],
  x: [
    "#.....#",
    ".#...#.",
    "..#.#..",
    "...#...",
    "..#.#..",
    ".#...#.",
    "#.....#",
  ],
};

export function PxSocial({
  id,
  scale = 3,
  color = "currentColor",
}: {
  id: keyof typeof SOCIAL_GLYPHS | string;
  scale?: number;
  color?: string;
}) {
  const rows = SOCIAL_GLYPHS[id] ?? SOCIAL_GLYPHS.github;
  return <PixSprite rows={rows} color={color} scale={scale} />;
}
