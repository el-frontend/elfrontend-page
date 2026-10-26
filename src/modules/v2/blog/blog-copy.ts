import type { Lang } from "../content/copy";
import type { BlogStats } from "./types";

export type BlogCopy = {
  pageTitle: string;
  pageTitleEm: string;
  pageSub: string;
  featured: string;
  readingTime: string;
  filterPlaceholder: string;
  tagsLabel: string;
  postsCount: string;
  newsletterTag: string;
  newsletterTitle: string;
  newsletterSub: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  newsletterFoot: string;
  newsletterDoneTag: string;
  newsletterDoneMsg: string;
  noResults: string;
  noResultsHint: string;
  statPosts: string;
  statWords: string;
  statMinutes: string;
  statTopics: string;
  backHome: string;
  // Article page
  backToBlog: string;
  readLabel: string;
  prev: string;
  next: string;
  keepReading: string;
  relatedTitle: string;
  relatedTitleEm: string;
  byAuthor: string;
  authorLocation: string;
  shareCopy: string;
  shareCopied: string;
};

export const BLOG_COPY: Record<Lang, BlogCopy> = {
  en: {
    pageTitle: "Field",
    pageTitleEm: "notes.",
    pageSub:
      "Things I've written down so I don't forget them. Mostly Spanish, sometimes English.",
    featured: "FEATURED",
    readingTime: "READ",
    filterPlaceholder: "Search posts…",
    tagsLabel: "FILTER BY",
    postsCount: "POSTS",
    newsletterTag: "NEW NEWSLETTER",
    newsletterTitle: "Get notes in your inbox.",
    newsletterSub:
      "One post per month-ish. No spam, no AI-generated filler. Just whatever I've been figuring out.",
    newsletterPlaceholder: "your.email@here",
    newsletterCta: "SUBSCRIBE",
    newsletterFoot: "NO SPAM · UNSUBSCRIBE ANYTIME",
    newsletterDoneTag: "+100 XP · YOU'RE IN",
    newsletterDoneMsg: "See you in your inbox.",
    noResults: "NO POSTS FOUND",
    noResultsHint: "TRY ANOTHER TAG OR SEARCH TERM",
    statPosts: "TOTAL POSTS",
    statWords: "WORDS WRITTEN",
    statMinutes: "MINUTES OF READING",
    statTopics: "TOPICS",
    backHome: "BACK TO HOME",
    backToBlog: "BACK TO BLOG",
    readLabel: "READ",
    prev: "PREVIOUS",
    next: "NEXT",
    keepReading: "KEEP READING",
    relatedTitle: "Related",
    relatedTitleEm: "posts.",
    byAuthor: "CARLOS CHAO",
    authorLocation: "@ELFRONTEND · LA HABANA",
    shareCopy: "Copy link",
    shareCopied: "Copied!",
  },
  es: {
    pageTitle: "Notas de",
    pageTitleEm: "campo.",
    pageSub: "Cosas que apunto para no olvidarlas. Mayormente en español, a veces en inglés.",
    featured: "DESTACADO",
    readingTime: "LEER",
    filterPlaceholder: "Buscar posts…",
    tagsLabel: "FILTRAR POR",
    postsCount: "POSTS",
    newsletterTag: "NUEVO NEWSLETTER",
    newsletterTitle: "Recibe las notas en tu inbox.",
    newsletterSub:
      "Un post al mes-ish. Sin spam, sin relleno IA. Solo lo que voy descubriendo.",
    newsletterPlaceholder: "tu.email@aquí",
    newsletterCta: "SUSCRIBIRME",
    newsletterFoot: "SIN SPAM · TE DAS DE BAJA CUANDO QUIERAS",
    newsletterDoneTag: "+100 XP · ESTÁS DENTRO",
    newsletterDoneMsg: "Nos vemos en tu inbox.",
    noResults: "NO HAY POSTS",
    noResultsHint: "PRUEBA OTRO TAG O TÉRMINO",
    statPosts: "POSTS TOTALES",
    statWords: "PALABRAS ESCRITAS",
    statMinutes: "MINUTOS DE LECTURA",
    statTopics: "TEMAS",
    backHome: "VOLVER A INICIO",
    backToBlog: "VOLVER AL BLOG",
    readLabel: "LECTURA",
    prev: "ANTERIOR",
    next: "SIGUIENTE",
    keepReading: "SIGUE LEYENDO",
    relatedTitle: "Posts",
    relatedTitleEm: "relacionados.",
    byAuthor: "CARLOS CHAO",
    authorLocation: "@ELFRONTEND · LA HABANA",
    shareCopy: "Copiar link",
    shareCopied: "¡Copiado!",
  },
};

// Tag pills (first item = "all" sentinel; engine treats "ALL"/"TODO" as no filter).
export const BLOG_TAGS_EN = ["ALL", "REACT", "CSS", "AI", "WEB", "THEORY", "PROCESS", "WORKFLOW"] as const;
export const BLOG_TAGS_ES = ["TODO", "REACT", "CSS", "AI", "WEB", "TEORÍA", "PROCESO", "WORKFLOW"] as const;

export type BlogStatTile = {
  key: "statPosts" | "statWords" | "statMinutes" | "statTopics";
  stat: keyof BlogStats;
  color: string;
};
export const BLOG_STAT_TILES: BlogStatTile[] = [
  { key: "statPosts", stat: "posts", color: "hot-yellow" },
  { key: "statWords", stat: "words", color: "hot-green" },
  { key: "statMinutes", stat: "minutes", color: "hot-pink" },
  { key: "statTopics", stat: "topics", color: "brand" },
];
