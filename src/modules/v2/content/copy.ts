export type Lang = "en" | "es";
export type Difficulty = "easy" | "medium" | "hard";

export type CopyByLang = {
  appTag: string;
  stages: Record<
    "home" | "about" | "skills" | "projects" | "talks" | "videos" | "blog" | "terminal" | "contact",
    string
  >;
  nav: Record<"home" | "about" | "skills" | "projects" | "videos" | "blog" | "contact", string>;
  greeting: string;
  name: string;
  handle: string;
  typeLine: string;
  typeAccent: string;
  intro: Record<Difficulty, string>;
  pressStart: string;
  askPlaceholder: string;
  startBtn: string;
  chips: string[];
  aboutTitle: string;
  aboutTitleEm: string;
  aboutSub: string;
  aboutBody: Record<Difficulty, string>;
  workingOnNow: string;
  facts: Array<{ k: string; v: string; color: string }>;
  nowList: Record<Difficulty, string[]>;
  statsLabels: Record<"subs" | "videos" | "posts" | "years", string>;
  skillsTitle: string;
  skillsTitleEm: string;
  skillsSub: string;
  skillsLegend: Record<"mastered" | "strong" | "learning", string>;
  projectsTitle: string;
  projectsTitleEm: string;
  projectsSub: string;
  projectsVisit: string;
  talksTitle: string;
  talksTitleEm: string;
  talksSub: string;
  videosTitle: string;
  videosTitleEm: string;
  videoCta: string;
  videosNew: string;
  blogTitle: string;
  blogTitleEm: string;
  blogSub: string;
  blogCta: string;
  blogRead: string;
  terminalTitle: string;
  terminalTitleEm: string;
  terminalSub: string;
  contactTitle: string;
  contactTitleEm: string;
  contactSub: string;
  contactName: string;
  contactEmail: string;
  contactKind: string;
  contactKinds: string[];
  contactMessage: string;
  contactPlaceholder: string;
  contactNoSpam: string;
  contactSend: string;
  contactSent: string;
  contactReply: string;
  contactPlayAgain: string;
  footerLeft: string;
  footerRight: string;
  footerBuilt: string;
  cheatLabel: string;
  cheatHint: string;
  konami: string;
  soundLabel: string;
  crtLabel: string;
  onOff: { on: string; off: string };
};

export const COPY: Record<Lang, CopyByLang> = {
  en: {
    appTag: "v2.0 · ARCADE EDITION",
    stages: {
      home: "STAGE 01 · HOME",
      about: "STAGE 02 · ABOUT",
      skills: "STAGE 03 · SKILLS",
      projects: "STAGE 04 · PROJECTS",
      talks: "STAGE 05 · TALKS",
      videos: "STAGE 06 · VIDEOS",
      blog: "STAGE 07 · WRITING",
      terminal: "STAGE 08 · TERMINAL",
      contact: "STAGE 09 · CONTACT",
    },
    nav: {
      home: "HOME",
      about: "ABOUT",
      skills: "SKILLS",
      projects: "PROJECTS",
      videos: "VIDEOS",
      blog: "BLOG",
      contact: "CONTACT",
    },
    greeting: "Hello there!",
    name: "Carlos Chao Cortes",
    handle: "@ElFrontend",
    typeLine: "What can I do for",
    typeAccent: "you?",
    intro: {
      easy: "I'm Carlos — I make React and Next.js videos on YouTube, and I love teaching the web. Type a question below or play around in the terminal — both work!",
      medium:
        "Software architect · React & Next.js educator · running the ElFrontend community. Talk to my AI twin, play in the terminal, or just browse around.",
      hard: "S.A. // React.js / Next.js. Talk to the AI or run /help in the term. No corp slop. Cuban → La Habana.",
    },
    pressStart: "PRESS START TO TALK TO CARLOS",
    askPlaceholder: "Type a question…",
    startBtn: "START",
    chips: ["Who is Carlos?", "Latest videos", "What's your stack?", "Hire for consulting"],
    aboutTitle: "About",
    aboutTitleEm: "me.",
    aboutSub: "The boring stuff, in pixel form.",
    aboutBody: {
      easy: "Cuban software architect based in La Habana, Cuba. I've been building things on the web for more than 10 years — for startups, agencies, and big companies. These days I mostly teach React and Next.js on YouTube, mentor engineers one-on-one, and run the ElFrontend community where Spanish-speaking devs help each other level up. I believe great teachers are great students first, so I'm always learning out loud.",
      medium:
        "Cuban software architect in La Habana. 10+ years shipping web apps. I teach React/Next.js on YouTube, mentor engineers, and run the ElFrontend community for Spanish-speaking developers.",
      hard: "HABANA-BASED. CUBAN. 10Y+ ON THE FRONTEND. SHIPS. TEACHES. MENTORS. NOT INTERESTED IN HYPE.",
    },
    workingOnNow: "WORKING ON RIGHT NOW",
    facts: [
      { k: "LOCATION", v: "La Habana, Cuba", color: "hot-pink" },
      { k: "FROM", v: "Cuba 🇨🇺", color: "hot-yellow" },
      { k: "YEARS XP", v: "10+ years", color: "hot-green" },
      { k: "FAVORITE STACK", v: "React + Next.js + TS", color: "brand" },
      { k: "FAVORITE COFFEE", v: "Strong Cuban coffee", color: "hot-orange" },
      { k: "PET PROJECT", v: "ElFrontend.com", color: "hot-blue" },
    ],
    nowList: {
      easy: [
        "Recording a 4-part series on React 19 SSR for beginners",
        "Writing about Tailwind v4 — what actually changed",
        "Mentoring 8 engineers one-on-one this quarter",
        "Building a new AI tool: Web Video Wizard",
        "Open to one new consulting client",
      ],
      medium: [
        "Recording React 19 SSR series",
        "Writing about Tailwind v4 migration patterns",
        "Mentoring 8 engineers this quarter",
        "Shipping Web Video Wizard",
        "Open for consulting",
      ],
      hard: ["RSC SSR S04", "TW4 MIGRATE", "8X MENTOR", "VIDEO WIZ", "CONSULT OPEN"],
    },
    statsLabels: { subs: "FOLLOWERS", videos: "VIDEOS", posts: "POSTS", years: "YEARS" },
    skillsTitle: "Skill",
    skillsTitleEm: "tree.",
    skillsSub: "Stuff I've leveled up over the years. Hover for details.",
    skillsLegend: { mastered: "MASTERED", strong: "STRONG", learning: "LEARNING" },
    projectsTitle: "Pet",
    projectsTitleEm: "projects.",
    projectsSub: "Things I've shipped on nights and weekends.",
    projectsVisit: "VISIT",
    talksTitle: "Talks &",
    talksTitleEm: "courses.",
    talksSub: "Live talks, workshops and recorded courses.",
    videosTitle: "Recent",
    videosTitleEm: "videos.",
    videoCta: "SEE ALL ON YOUTUBE",
    videosNew: "NEW",
    blogTitle: "Field",
    blogTitleEm: "notes.",
    blogSub: "Mostly Spanish · sometimes English.",
    blogCta: "READ THE BLOG",
    blogRead: "READ",
    terminalTitle: "Terminal",
    terminalTitleEm: "playground.",
    terminalSub: "Type 'help' to see what's available. about · skills · projects · clear.",
    contactTitle: "Press start to say",
    contactTitleEm: "hi.",
    contactSub: "Will reply in 1–2 days. I read every message.",
    contactName: "YOUR NAME",
    contactEmail: "YOUR EMAIL",
    contactKind: "WHAT'S THIS ABOUT?",
    contactKinds: ["Just saying hi", "Consulting", "Mentoring", "Speaking", "Collaboration", "Other"],
    contactMessage: "YOUR MESSAGE",
    contactPlaceholder: "Tell Carlos a little about it…",
    contactNoSpam: "NO SPAM · NEVER",
    contactSend: "SEND MESSAGE",
    contactSent: "MESSAGE SENT · +500 XP",
    contactReply: "Carlos will reply within 1–2 days. Thanks for playing! 🎮",
    contactPlayAgain: "PLAY AGAIN",
    footerLeft: "© 2026 CARLOS CHAO · LA HABANA",
    footerRight: "INSERT COIN",
    footerBuilt: "BUILT WITH NEXT · REACT · TAILWIND · ♥",
    cheatLabel: "CHEAT CODE",
    cheatHint: "↑ ↑ ↓ ↓ ← → ← → B A · TRY IT",
    konami: "★ CHEAT UNLOCKED ★",
    soundLabel: "SOUND",
    crtLabel: "CRT",
    onOff: { on: "ON", off: "OFF" },
  },
  es: {
    appTag: "v2.0 · EDICIÓN ARCADE",
    stages: {
      home: "NIVEL 01 · INICIO",
      about: "NIVEL 02 · SOBRE MÍ",
      skills: "NIVEL 03 · SKILLS",
      projects: "NIVEL 04 · PROYECTOS",
      talks: "NIVEL 05 · CHARLAS",
      videos: "NIVEL 06 · VIDEOS",
      blog: "NIVEL 07 · BLOG",
      terminal: "NIVEL 08 · TERMINAL",
      contact: "NIVEL 09 · CONTACTO",
    },
    nav: {
      home: "INICIO",
      about: "SOBRE MÍ",
      skills: "SKILLS",
      projects: "PROYECTOS",
      videos: "VIDEOS",
      blog: "BLOG",
      contact: "CONTACTO",
    },
    greeting: "¡Hola!",
    name: "Carlos Chao Cortes",
    handle: "@ElFrontend",
    typeLine: "¿Qué puedo hacer por",
    typeAccent: "ti?",
    intro: {
      easy: "Soy Carlos — hago videos de React y Next.js en YouTube y me encanta enseñar la web. Escribe una pregunta abajo o juega con la terminal — ¡las dos cosas funcionan!",
      medium:
        "Arquitecto de software · educador de React y Next.js · dirijo la comunidad ElFrontend. Habla con mi gemelo IA, juega en la terminal, o explora.",
      hard: "S.A. // React.js / Next.js. Habla con la IA o /help en el term. Sin slop corp. Cubano → La Habana.",
    },
    pressStart: "PULSA START PARA HABLAR CON CARLOS",
    askPlaceholder: "Escribe una pregunta…",
    startBtn: "START",
    chips: ["¿Quién es Carlos?", "Últimos videos", "¿Cuál es tu stack?", "Contratar consultoría"],
    aboutTitle: "Sobre",
    aboutTitleEm: "mí.",
    aboutSub: "Lo aburrido, en píxeles.",
    aboutBody: {
      easy: "Arquitecto de software cubano radicado en La Habana. Llevo más de 10 años construyendo cosas en la web — para startups, agencias y grandes empresas. Hoy enseño React y Next.js en YouTube, mentorizo ingenieros uno a uno y dirijo la comunidad ElFrontend, donde devs hispanohablantes se ayudan a crecer. Los buenos profesores son primero buenos estudiantes — sigo aprendiendo en voz alta.",
      medium:
        "Arquitecto de software cubano en La Habana. 10+ años lanzando apps web. Enseño React/Next.js en YouTube, mentorizo ingenieros y dirijo la comunidad ElFrontend.",
      hard: "BASE: LA HABANA. CUBANO. 10A+ EN FRONTEND. ENVÍA. ENSEÑA. MENTORIZA. SIN HYPE.",
    },
    workingOnNow: "EN ESTO ESTOY AHORA",
    facts: [
      { k: "UBICACIÓN", v: "La Habana, Cuba", color: "hot-pink" },
      { k: "ORIGEN", v: "Cuba 🇨🇺", color: "hot-yellow" },
      { k: "AÑOS XP", v: "10+ años", color: "hot-green" },
      { k: "STACK FAVORITO", v: "React + Next.js + TS", color: "brand" },
      { k: "CAFÉ FAVORITO", v: "Café fuerte cubano", color: "hot-orange" },
      { k: "PROYECTO PERSONAL", v: "ElFrontend.com", color: "hot-blue" },
    ],
    nowList: {
      easy: [
        "Grabando serie de 4 partes sobre React 19 SSR para principiantes",
        "Escribiendo sobre Tailwind v4 — qué cambió de verdad",
        "Mentorizando a 8 ingenieros uno a uno este trimestre",
        "Construyendo Web Video Wizard, una herramienta de IA",
        "Abierto a un nuevo cliente de consultoría",
      ],
      medium: [
        "Grabando serie React 19 SSR",
        "Escribiendo sobre Tailwind v4",
        "Mentorizando a 8 ingenieros este trimestre",
        "Lanzando Web Video Wizard",
        "Abierto a consultoría",
      ],
      hard: ["RSC SSR S04", "MIGRAR TW4", "8X MENTOR", "VIDEO WIZ", "CONSULT ABIERTO"],
    },
    statsLabels: { subs: "SEGUIDORES", videos: "VIDEOS", posts: "POSTS", years: "AÑOS" },
    skillsTitle: "Árbol de",
    skillsTitleEm: "skills.",
    skillsSub: "Lo que he subido de nivel. Pasa el cursor por encima.",
    skillsLegend: { mastered: "MAESTRÍA", strong: "FUERTE", learning: "APRENDIENDO" },
    projectsTitle: "Proyectos",
    projectsTitleEm: "personales.",
    projectsSub: "Cosas que he construido en noches y fines de semana.",
    projectsVisit: "IR",
    talksTitle: "Charlas y",
    talksTitleEm: "cursos.",
    talksSub: "Charlas en vivo, talleres y cursos grabados.",
    videosTitle: "Videos",
    videosTitleEm: "recientes.",
    videoCta: "VER TODO EN YOUTUBE",
    videosNew: "NUEVO",
    blogTitle: "Notas de",
    blogTitleEm: "campo.",
    blogSub: "Mayormente en español · a veces inglés.",
    blogCta: "LEER EL BLOG",
    blogRead: "LEER",
    terminalTitle: "Terminal",
    terminalTitleEm: "playground.",
    terminalSub: "Escribe 'help' para ver los comandos. about · skills · projects · clear.",
    contactTitle: "Pulsa start para decir",
    contactTitleEm: "hola.",
    contactSub: "Respondo en 1–2 días. Leo cada mensaje.",
    contactName: "TU NOMBRE",
    contactEmail: "TU EMAIL",
    contactKind: "¿DE QUÉ VA ESTO?",
    contactKinds: ["Solo saludar", "Consultoría", "Mentoring", "Charlas", "Colaboración", "Otro"],
    contactMessage: "TU MENSAJE",
    contactPlaceholder: "Cuéntale a Carlos un poco…",
    contactNoSpam: "SIN SPAM · NUNCA",
    contactSend: "ENVIAR MENSAJE",
    contactSent: "MENSAJE ENVIADO · +500 XP",
    contactReply: "Carlos te responderá en 1–2 días. ¡Gracias por jugar! 🎮",
    contactPlayAgain: "JUGAR DE NUEVO",
    footerLeft: "© 2026 CARLOS CHAO · LA HABANA",
    footerRight: "INSERTA UNA MONEDA",
    footerBuilt: "HECHO CON NEXT · REACT · TAILWIND · ♥",
    cheatLabel: "TRUCO",
    cheatHint: "↑ ↑ ↓ ↓ ← → ← → B A · PRUÉBALO",
    konami: "★ TRUCO DESBLOQUEADO ★",
    soundLabel: "SONIDO",
    crtLabel: "CRT",
    onOff: { on: "ON", off: "OFF" },
  },
};

export const ACCENT_OPTIONS = [
  { key: "purple", label: "Purple", color: "#a070ff", deep: "#7a23dc" },
  { key: "green", label: "Green", color: "#5dd55d", deep: "#2a8a2a" },
  { key: "amber", label: "Amber", color: "#fcd34d", deep: "#a87800" },
  { key: "pink", label: "Pink", color: "#ff6b8a", deep: "#c43160" },
  { key: "cyan", label: "Cyan", color: "#6cb4ee", deep: "#2a6fb0" },
] as const;

export type AccentKey = (typeof ACCENT_OPTIONS)[number]["key"];
