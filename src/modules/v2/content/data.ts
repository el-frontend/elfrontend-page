import type { Lang } from "./copy";

export type LocalizedString = Record<Lang, string>;

export type SkillGroup = {
  id: string;
  name: LocalizedString;
  color: string;
  skills: Array<{ name: string; level: 1 | 2 | 3; years: string }>;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "lang",
    name: { en: "LANGUAGES", es: "LENGUAJES" },
    color: "brand",
    skills: [
      { name: "JavaScript", level: 3, years: "10+y" },
      { name: "TypeScript", level: 3, years: "7y" },
      { name: "Python", level: 2, years: "5y" },
      { name: "Java", level: 2, years: "4y" },
      { name: "Rust", level: 1, years: "1y" },
    ],
  },
  {
    id: "fw",
    name: { en: "FRAMEWORKS", es: "FRAMEWORKS" },
    color: "hot-pink",
    skills: [
      { name: "React", level: 3, years: "9y" },
      { name: "Next.js", level: 3, years: "6y" },
      { name: "Vue", level: 2, years: "3y" },
      { name: "Express", level: 3, years: "8y" },
      { name: "Django", level: 2, years: "3y" },
      { name: "Astro", level: 1, years: "1y" },
    ],
  },
  {
    id: "tools",
    name: { en: "TOOLS & CLOUD", es: "HERRAMIENTAS" },
    color: "hot-green",
    skills: [
      { name: "Git", level: 3, years: "10y" },
      { name: "Docker", level: 3, years: "6y" },
      { name: "AWS", level: 2, years: "5y" },
      { name: "Vercel", level: 3, years: "4y" },
      { name: "Postgres", level: 2, years: "6y" },
      { name: "Redis", level: 2, years: "4y" },
    ],
  },
  {
    id: "soft",
    name: { en: "SOFT SKILLS", es: "HABILIDADES BLANDAS" },
    color: "hot-yellow",
    skills: [
      { name: "Teaching", level: 3, years: "10y" },
      { name: "Mentoring", level: 3, years: "7y" },
      { name: "Public Speaking", level: 2, years: "5y" },
      { name: "Writing", level: 2, years: "4y" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  year: string;
  color: string;
  tag: LocalizedString;
  desc: LocalizedString;
  stack: string[];
  href: string;
};

export const PROJECTS: Project[] = [
  {
    id: "resuelve",
    name: "Resuelve",
    year: "2026",
    color: "hot-orange",
    tag: { en: "SERVICE PLATFORM", es: "PLATAFORMA DE SERVICIOS" },
    desc: {
      en: "Building the #1 service platform in Cuba — connecting customers with trusted local providers across every category.",
      es: "Construyendo la plataforma de servicios #1 en Cuba — conectando clientes con proveedores locales de confianza en todas las categorías.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Postgres"],
    href: "https://resuelvecuba.com",
  },
  {
    id: "synclat",
    name: "Synclat",
    year: "2026",
    color: "hot-blue",
    tag: { en: "MUSIC SYNC", es: "SYNC MUSICAL" },
    desc: {
      en: "The first Latin Music sync platform — licensing Latin tracks for film, TV and ads in a few clicks.",
      es: "La primera plataforma de sync de música latina — licenciando tracks latinos para cine, TV y publicidad en pocos clics.",
    },
    stack: ["Next.js", "TypeScript", "AI", "Tailwind"],
    href: "https://synclat.ai",
  },
  {
    id: "p1",
    name: "Web Video Wizard",
    year: "2026",
    color: "hot-pink",
    tag: { en: "AI VIDEO TRIMMING", es: "RECORTE IA" },
    desc: {
      en: "My own AI-powered video trimming tool. Built because paid alternatives were ridiculously expensive.",
      es: "Mi propia herramienta de recorte de video con IA. La construí porque las alternativas pagas eran ridículamente caras.",
    },
    stack: ["Next.js", "FFmpeg", "OpenAI", "Tailwind"],
    href: "https://elfrontend.com/blog/build-web-video-wizard",
  },
  {
    id: "p2",
    name: "ElFrontend.com",
    year: "2024-26",
    color: "brand",
    tag: { en: "PERSONAL SITE", es: "SITIO PERSONAL" },
    desc: {
      en: "This site! AI chat hero, working terminal with Snake & Wordle, switchable backgrounds, MDX blog.",
      es: "¡Este sitio! Hero con chat IA, terminal con Snake y Wordle, fondos cambiables, blog en MDX.",
    },
    stack: ["Next.js 16", "Tailwind v4", "shadcn/ui", "Motion"],
    href: "https://elfrontend.com",
  },
  {
    id: "p3",
    name: "ElFrontend Community",
    year: "2023+",
    color: "hot-yellow",
    tag: { en: "DEV COMMUNITY", es: "COMUNIDAD DEV" },
    desc: {
      en: "Spanish-speaking community of frontend developers helping each other level up. YouTube + Discord + meetups.",
      es: "Comunidad hispana de devs frontend que se ayudan a crecer. YouTube + Discord + meetups.",
    },
    stack: ["YouTube", "Discord", "Twitch"],
    href: "https://youtube.com/@ElFrontend",
  },
  {
    id: "p4",
    name: "OSS Contributions",
    year: "ongoing",
    color: "hot-green",
    tag: { en: "OPEN SOURCE", es: "CÓDIGO ABIERTO" },
    desc: {
      en: "Random contributions to React ecosystem libraries, dev tooling, and small utility packages.",
      es: "Contribuciones varias al ecosistema React, herramientas de desarrollo y paquetes utilitarios pequeños.",
    },
    stack: ["TypeScript", "GitHub"],
    href: "https://github.com/el-frontend",
  },
];

export type Talk = {
  id: string;
  kind: "TALK" | "COURSE" | "WORKSHOP";
  date: LocalizedString;
  where: string;
  title: LocalizedString;
  meta: LocalizedString;
  color: string;
  href: string;
};

export const TALKS: Talk[] = [
  {
    id: "t1",
    kind: "TALK",
    date: { en: "Apr 2026", es: "Abr 2026" },
    where: "ElFrontend",
    title: {
      en: "Mi Framework de Desarrollo con IA (2026)",
      es: "Mi Framework de Desarrollo con IA (2026)",
    },
    meta: { en: "65 min · Spanish", es: "65 min · Español" },
    color: "hot-pink",
    href: "https://www.youtube.com/watch?v=mmt24cot0vg",
  },
  {
    id: "t2",
    kind: "TALK",
    date: { en: "Dec 2025", es: "Dic 2025" },
    where: "ElFrontend",
    title: {
      en: "10 years of software engineering experience in 30 minutes",
      es: "10 años de experiencia como ingeniero de software en 30 minutos",
    },
    meta: { en: "44 min · Spanish", es: "44 min · Español" },
    color: "hot-green",
    href: "https://www.youtube.com/watch?v=wqnJ_bo6JZo",
  },
  {
    id: "t3",
    kind: "TALK",
    date: { en: "Mar 2025", es: "Mar 2025" },
    where: "Avangenio",
    title: {
      en: "Frontend best practices for Avangenio devs",
      es: "Buenas prácticas en el desarrollo frontend (Avangenio)",
    },
    meta: { en: "72 min · Spanish", es: "72 min · Español" },
    color: "hot-yellow",
    href: "https://www.youtube.com/watch?v=cWvfuAUp1Co",
  },
  {
    id: "t4",
    kind: "TALK",
    date: { en: "Nov 2024", es: "Nov 2024" },
    where: "ElFrontend",
    title: {
      en: "Generative AI in the software development process",
      es: "Uso de la IA Generativa en el proceso de desarrollo de software",
    },
    meta: { en: "56 min · Spanish", es: "56 min · Español" },
    color: "hot-blue",
    href: "https://www.youtube.com/watch?v=fiVQPw0QdTg",
  },
  {
    id: "c1",
    kind: "COURSE",
    date: { en: "Oct 2025", es: "Oct 2025" },
    where: "YouTube",
    title: {
      en: "React from scratch for beginners",
      es: "Curso de React desde cero para principiantes",
    },
    meta: { en: "6 lessons · Spanish", es: "6 lecciones · Español" },
    color: "brand",
    href: "https://www.youtube.com/playlist?list=PL570_LBEbhmPiUrq9TEs8ajH6RW8ArV_A",
  },
  {
    id: "c2",
    kind: "COURSE",
    date: { en: "Jul 2025", es: "Jul 2025" },
    where: "YouTube",
    title: {
      en: "Building applications with AI",
      es: "Curso de creación de aplicaciones con Inteligencia Artificial",
    },
    meta: { en: "2 lessons · Spanish", es: "2 lecciones · Español" },
    color: "hot-pink",
    href: "https://www.youtube.com/playlist?list=PL570_LBEbhmPo98VvkowkH4P_XXcUwlly",
  },
  {
    id: "c3",
    kind: "COURSE",
    date: { en: "Sep 2024", es: "Sep 2024" },
    where: "YouTube",
    title: {
      en: "React for beginners 2024",
      es: "Curso de React para principiantes 2024",
    },
    meta: { en: "8 lessons · Spanish", es: "8 lecciones · Español" },
    color: "hot-green",
    href: "https://www.youtube.com/playlist?list=PL570_LBEbhmP0CL4ncG9rqHI9NN46MLP5",
  },
  {
    id: "c4",
    kind: "COURSE",
    date: { en: "May 2024", es: "May 2024" },
    where: "YouTube",
    title: {
      en: "Next.js from scratch: learning the fundamentals",
      es: "Next.js desde Cero: Aprendiendo desde los Fundamentos",
    },
    meta: { en: "5 lessons · Spanish", es: "5 lecciones · Español" },
    color: "hot-yellow",
    href: "https://www.youtube.com/playlist?list=PL570_LBEbhmPzg1In2Un99MQy7-SK8EZi",
  },
];

export type Stat = { key: "subs" | "videos" | "posts" | "years"; val: string; color: string };

export const STATS: Stat[] = [
  { key: "subs", val: "5K+", color: "hot-pink" },
  { key: "videos", val: "100+", color: "hot-yellow" },
  { key: "posts", val: "100+", color: "hot-green" },
  { key: "years", val: "10+", color: "brand" },
];

export type Social = {
  id: "youtube" | "github" | "linkedin" | "twitch" | "instagram" | "x";
  label: string;
  href: string;
  color: string;
};

export const SOCIALS: Social[] = [
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@ElFrontend", color: "hot-red" },
  { id: "github", label: "GitHub", href: "https://github.com/el-frontend", color: "ink" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/carlos-chao",
    color: "hot-blue",
  },
  { id: "twitch", label: "Twitch", href: "https://twitch.tv/elfrontend", color: "brand" },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/elfrontend",
    color: "hot-pink",
  },
  { id: "x", label: "X", href: "https://x.com/elfrontend", color: "ink" },
];
