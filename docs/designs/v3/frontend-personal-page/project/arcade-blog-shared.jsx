// ============================================================
// arcade-blog-shared.jsx — Blog content + shared blog components
// (Newsletter card, blog copy, full post list)
// ============================================================

const BLOG_TAGS_EN = ["ALL", "REACT", "CSS", "AI", "THEORY", "PROCESS", "WORKFLOW"];
const BLOG_TAGS_ES = ["TODO", "REACT", "CSS", "AI", "TEORÍA", "PROCESO", "WORKFLOW"];

// Extra blog posts so the page feels full
const BLOG_EXTRA = [
  { id:'b7', slug:'new-cookie-api',
    title:{ en:"The new Cookie API everyone slept on", es:"La nueva Cookie API que todos pasaron por alto" },
    date:{ en:"Oct 2025", es:"Oct 2025" }, read:"5 min", tag:"Web", thumb:"assets/blog/new-cookie-api.webp" },
  { id:'b8', slug:'web-3-article',
    title:{ en:"Why I still bet on web3 (a little)", es:"Por qué sigo apostando por web3 (un poco)" },
    date:{ en:"Sep 2025", es:"Sep 2025" }, read:"10 min", tag:"Opinion", thumb:"assets/blog/web3.webp" },
  { id:'b9', slug:'react-server-components-patterns',
    title:{ en:"3 React Server Components patterns I use in every project", es:"3 patrones de React Server Components que uso en cada proyecto" },
    date:{ en:"Aug 2025", es:"Ago 2025" }, read:"11 min", tag:"React", thumb:"assets/blog/react19-ssr.webp" },
];
const ALL_POSTS = [...BLOG, ...BLOG_EXTRA];

const BLOG_COPY = {
  en: {
    pageTitle: "Field", pageTitleEm: "notes.",
    pageSub: "Things I've written down so I don't forget them. Mostly Spanish, sometimes English.",
    featured: "FEATURED",
    readingTime: "READ",
    filterPlaceholder: "Search posts…",
    tagsLabel: "FILTER BY",
    postsCount: "POSTS",
    sortLabel: "SORT",
    sortNewest: "NEWEST",
    sortPopular: "POPULAR",
    loadMore: "LOAD MORE POSTS",
    newsletterTag: "NEW NEWSLETTER",
    newsletterTitle: "Get notes in your inbox.",
    newsletterSub: "One post per month-ish. No spam, no AI-generated filler. Just whatever I've been figuring out.",
    newsletterPlaceholder: "your.email@here",
    newsletterCta: "SUBSCRIBE",
    newsletterFoot: "JOIN 2,400+ DEVS",
    noResults: "NO POSTS FOUND",
    noResultsHint: "TRY ANOTHER TAG OR SEARCH TERM",
    statPosts: "TOTAL POSTS",
    statWords: "WORDS WRITTEN",
    statReaders: "MONTHLY READERS",
    statSubs: "SUBSCRIBERS",
    backHome: "BACK TO HOME",
  },
  es: {
    pageTitle: "Notas de", pageTitleEm: "campo.",
    pageSub: "Cosas que apunto para no olvidarlas. Mayormente en español, a veces en inglés.",
    featured: "DESTACADO",
    readingTime: "LEER",
    filterPlaceholder: "Buscar posts…",
    tagsLabel: "FILTRAR POR",
    postsCount: "POSTS",
    sortLabel: "ORDEN",
    sortNewest: "RECIENTES",
    sortPopular: "POPULARES",
    loadMore: "CARGAR MÁS POSTS",
    newsletterTag: "NUEVO NEWSLETTER",
    newsletterTitle: "Recibe las notas en tu inbox.",
    newsletterSub: "Un post al mes-ish. Sin spam, sin relleno IA. Solo lo que voy descubriendo.",
    newsletterPlaceholder: "tu.email@aquí",
    newsletterCta: "SUSCRIBIRME",
    newsletterFoot: "+2,400 DEVS YA SUSCRITOS",
    noResults: "NO HAY POSTS",
    noResultsHint: "PRUEBA OTRO TAG O TÉRMINO",
    statPosts: "POSTS TOTALES",
    statWords: "PALABRAS ESCRITAS",
    statReaders: "LECTORES / MES",
    statSubs: "SUSCRIPTORES",
    backHome: "VOLVER A INICIO",
  },
};

const BLOG_STATS = [
  { key:'statPosts', val:'64', color:'hot-yellow' },
  { key:'statWords', val:'92K', color:'hot-green' },
  { key:'statReaders', val:'8.2K', color:'hot-pink' },
  { key:'statSubs', val:'2.4K', color:'brand' },
];

// Newsletter card — shared between blog index & article pages
function Newsletter({lang, accent}) {
  const t = BLOG_COPY[lang];
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    playPowerUp();
    setDone(true);
  };
  return (
    <section style={{padding:'40px 32px 80px'}}>
      <div className="container">
        <div style={{
          position:'relative',
          padding:'40px 36px',
          border:'4px solid var(--ink)',
          background:`linear-gradient(135deg, ${accent}22 0%, transparent 60%), var(--paper-2)`,
          boxShadow:`8px 8px 0 ${accent}`,
          display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:36, alignItems:'center',
        }}>
          <div style={{position:'absolute', top:14, right:14, display:'flex', gap:6}}>
            <PxStar scale={2} color={accent}/>
            <PxStar scale={2} color="var(--hot-yellow)"/>
            <PxStar scale={2} color={accent}/>
          </div>
          <div>
            <div className="pixel-text" style={{
              display:'inline-block',
              fontSize:9, color:'#000', letterSpacing:'0.2em',
              background:'var(--hot-yellow)', padding:'5px 10px', border:'3px solid #000',
              marginBottom:18,
            }}>★ {t.newsletterTag}</div>
            <h2 className="pixel-text" style={{margin:0, fontSize:22, color:'var(--ink)', lineHeight:1.4, letterSpacing:'0.02em'}}>{t.newsletterTitle}</h2>
            <p style={{margin:'16px 0 0', fontFamily:'var(--font-pixel-body)', fontSize:21, lineHeight:1.4, color:'var(--dim)'}}>{t.newsletterSub}</p>
            <div className="pixel-text" style={{fontSize:9, color:accent, letterSpacing:'0.18em', marginTop:18, display:'inline-flex', alignItems:'center', gap:10}}>
              <PxHeart scale={2}/> {t.newsletterFoot}
            </div>
          </div>
          {done ? (
            <div style={{padding:'24px', border:'3px solid var(--hot-green)', background:'#000', textAlign:'center'}}>
              <div style={{display:'inline-flex', gap:8, marginBottom:14}}>
                <PxStar scale={3}/><PxStar scale={3}/><PxStar scale={3}/>
              </div>
              <div className="pixel-text" style={{fontSize:13, color:'var(--hot-green)', letterSpacing:'0.1em', marginBottom:10}}>
                {lang==='en'?'+100 XP · YOU\'RE IN':'+100 XP · ESTÁS DENTRO'}
              </div>
              <p style={{margin:0, fontFamily:'var(--font-pixel-body)', fontSize:19, color:'var(--ink)'}}>
                {lang==='en'?"See you in your inbox.":"Nos vemos en tu inbox."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{display:'flex', flexDirection:'column', gap:14}}>
              <input
                type="email"
                value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key.length===1 && playType()}
                placeholder={t.newsletterPlaceholder}
                style={{
                  background:'#000', color:'var(--ink)',
                  border:'4px solid var(--ink)', padding:'14px 16px',
                  fontFamily:'var(--font-pixel-body)', fontSize:22, outline:'none',
                  caretColor: accent, width:'100%',
                }}/>
              <button type="submit" style={{
                background:accent, color:'#000', border:'4px solid var(--ink)',
                padding:'14px 26px', fontFamily:'var(--font-pixel)', fontSize:11, letterSpacing:'0.15em',
                cursor:'pointer', boxShadow:'4px 4px 0 var(--brand-deep)',
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
              }}>
                <PxArrow scale={2} color="#000"/> {t.newsletterCta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  BLOG_TAGS_EN, BLOG_TAGS_ES, ALL_POSTS, BLOG_COPY, BLOG_STATS, Newsletter,
});
