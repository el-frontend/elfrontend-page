import type { Lang } from "../content/copy";

export type BlogCopy = {
  pageTitle: string;
  pageTitleEm: string;
  pageSub: string;
  featured: string;
  readingTime: string;
  filterPlaceholder: string;
  tagsLabel: string;
  postsCount: string;
  sortNewest: string;
  sortPopular: string;
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
  statReaders: string;
  statSubs: string;
  backHome: string;
  // Article page
  backToBlog: string;
  readLabel: string;
  ratePost: string;
  rateNoLogin: string;
  rateThanks: string;
  rateLoved: string;
  rateLearned: string;
  rateOk: string;
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
    sortNewest: "NEWEST",
    sortPopular: "POPULAR",
    newsletterTag: "NEW NEWSLETTER",
    newsletterTitle: "Get notes in your inbox.",
    newsletterSub:
      "One post per month-ish. No spam, no AI-generated filler. Just whatever I've been figuring out.",
    newsletterPlaceholder: "your.email@here",
    newsletterCta: "SUBSCRIBE",
    newsletterFoot: "JOIN 2,400+ DEVS",
    newsletterDoneTag: "+100 XP · YOU'RE IN",
    newsletterDoneMsg: "See you in your inbox.",
    noResults: "NO POSTS FOUND",
    noResultsHint: "TRY ANOTHER TAG OR SEARCH TERM",
    statPosts: "TOTAL POSTS",
    statWords: "WORDS WRITTEN",
    statReaders: "MONTHLY READERS",
    statSubs: "SUBSCRIBERS",
    backHome: "BACK TO HOME",
    backToBlog: "BACK TO BLOG",
    readLabel: "READ",
    ratePost: ">>> RATE THIS POST",
    rateNoLogin: "No login. Just a tap.",
    rateThanks: "Thanks! Saved.",
    rateLoved: "LOVED IT",
    rateLearned: "LEARNED A LOT",
    rateOk: "IT WAS OK",
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
    sortNewest: "RECIENTES",
    sortPopular: "POPULARES",
    newsletterTag: "NUEVO NEWSLETTER",
    newsletterTitle: "Recibe las notas en tu inbox.",
    newsletterSub:
      "Un post al mes-ish. Sin spam, sin relleno IA. Solo lo que voy descubriendo.",
    newsletterPlaceholder: "tu.email@aquí",
    newsletterCta: "SUSCRIBIRME",
    newsletterFoot: "+2,400 DEVS YA SUSCRITOS",
    newsletterDoneTag: "+100 XP · ESTÁS DENTRO",
    newsletterDoneMsg: "Nos vemos en tu inbox.",
    noResults: "NO HAY POSTS",
    noResultsHint: "PRUEBA OTRO TAG O TÉRMINO",
    statPosts: "POSTS TOTALES",
    statWords: "PALABRAS ESCRITAS",
    statReaders: "LECTORES / MES",
    statSubs: "SUSCRIPTORES",
    backHome: "VOLVER A INICIO",
    backToBlog: "VOLVER AL BLOG",
    readLabel: "LECTURA",
    ratePost: ">>> CALIFICA ESTE POST",
    rateNoLogin: "Sin login. Solo un click.",
    rateThanks: "¡Gracias! Guardado.",
    rateLoved: "ME ENCANTÓ",
    rateLearned: "APRENDÍ MUCHO",
    rateOk: "ESTUVO BIEN",
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
export const BLOG_TAGS_EN = ["ALL", "REACT", "CSS", "AI", "THEORY", "PROCESS", "WORKFLOW"] as const;
export const BLOG_TAGS_ES = ["TODO", "REACT", "CSS", "AI", "TEORÍA", "PROCESO", "WORKFLOW"] as const;

export type BlogStat = { key: "statPosts" | "statWords" | "statReaders" | "statSubs"; val: string; color: string };
export const BLOG_STATS: BlogStat[] = [
  { key: "statPosts", val: "100+", color: "hot-yellow" },
  { key: "statWords", val: "92K", color: "hot-green" },
  { key: "statReaders", val: "8.2K", color: "hot-pink" },
  { key: "statSubs", val: "2.4K", color: "brand" },
];
