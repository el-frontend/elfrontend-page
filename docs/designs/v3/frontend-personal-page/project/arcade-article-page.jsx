// ============================================================
// arcade-article-page.jsx — Single blog post page
// ============================================================

// Sample body content per slug (English + Spanish snippets).
// Falls back to a generic body if slug unknown.
const ARTICLE_BODIES = {
  'build-web-video-wizard': {
    en: [
      { type:'p', text:"I edit a lot of video. For YouTube, for client work, for the occasional pitch. And for a while now I've been paying for one of the big AI video tools — you know the ones — to auto-cut, transcribe, and trim my footage. It was great. Until I checked my invoices for last quarter and realized I'd spent more on subscriptions than I had on my actual editing software." },
      { type:'p', text:"That was the trigger. I'm a developer. I should be able to build a worse version of this in a weekend, save the money, and at least learn something. Spoiler: it took me three weekends, not one, and now I use it more than the paid tool." },
      { type:'h', text:"Why I built it instead of buying" },
      { type:'p', text:"The paid tools all assume you're a creator who hates the technical side. Their interfaces are clean, beautiful, and slow. They lock the parts I actually wanted to tweak. They charge per minute of footage even when you only want a 10-second cut. None of that suits me." },
      { type:'p', text:"What I needed was simpler: drop a video, get a transcript with timestamps, click words to keep, click words to drop, hit export. That's it. No magic, no AI scenes, no auto-captions for TikTok. Just a transcript-driven trim." },
      { type:'h', text:"The stack" },
      { type:'list', items:[
        "Next.js 16 with the new compiler — the file-based routing is perfect for tiny tools",
        "FFmpeg.wasm running in the browser for the cuts (no upload, no server)",
        "OpenAI Whisper API for transcription (cheap, fast, accurate)",
        "Tailwind v4 + shadcn/ui for the UI — I wanted to ship, not design",
        "Vercel for hosting because I'm lazy and it just works"
      ]},
      { type:'code', code:"// the entire cut function, more or less\nasync function trim(video, segments) {\n  await ffmpeg.load();\n  await ffmpeg.writeFile('input.mp4', await fetchFile(video));\n  const filter = segments.map((s, i) => \n    `[0:v]trim=${s.start}:${s.end},setpts=PTS-STARTPTS[v${i}]`\n  ).join(';');\n  await ffmpeg.exec(['-i','input.mp4', '-filter_complex', filter, 'out.mp4']);\n  return ffmpeg.readFile('out.mp4');\n}" },
      { type:'h', text:"Lessons learned" },
      { type:'list', items:[
        "FFmpeg.wasm is shockingly capable. It's slow on long videos, but for under 10 minutes you don't even notice.",
        "Whisper's word-level timestamps are good enough to drive a usable editor. The 'um' detection is hit or miss but I can live with that.",
        "Shipping a tool you use yourself, every day, is the cheat code. I noticed every rough edge by day three and fixed them by day ten."
      ]},
      { type:'p', text:"Total bill so far: ~$8 in Whisper credits. Compared to ~$120/month for the paid alternative, that's a year of editing for the price of a single month. The source is on GitHub if you want to fork it or just see how bad my code is." },
      { type:'p', text:"If you've been quietly paying for a tool that you suspect you could build, this is your sign. Block off three weekends. The first one will be miserable. By the third you'll be using your own thing." },
    ],
    es: [
      { type:'p', text:"Edito mucho video. Para YouTube, para clientes, para alguna que otra presentación. Y desde hace un tiempo estaba pagando una de las grandes herramientas de IA para video — ya sabes cuáles — para cortar, transcribir y limpiar mi material. Estaba genial. Hasta que revisé las facturas del trimestre y vi que gastaba más en suscripciones que en mi propio software de edición." },
      { type:'p', text:"Ese fue el detonante. Soy developer. Debería poder construir una versión peor en un fin de semana, ahorrarme el dinero y al menos aprender algo. Spoiler: me tomó tres fines de semana, no uno, y ahora la uso más que la herramienta de pago." },
      { type:'h', text:"Por qué construir en vez de comprar" },
      { type:'p', text:"Las herramientas de pago asumen que eres un creador que odia lo técnico. Las interfaces son limpias, bonitas y lentas. Bloquean justo las partes que yo quería tocar. Cobran por minuto de video aunque solo quieras un corte de 10 segundos. Nada de eso me cuadraba." },
      { type:'p', text:"Lo que necesitaba era más simple: subes un video, obtienes una transcripción con timestamps, marcas las palabras que quieres conservar, marcas las que se van, exportas. Ya. Sin magia, sin escenas IA, sin captions para TikTok. Solo un recorte basado en el texto." },
      { type:'h', text:"El stack" },
      { type:'list', items:[
        "Next.js 16 con el nuevo compilador — el routing por archivos es perfecto para herramientas pequeñas",
        "FFmpeg.wasm corriendo en el navegador para los cortes (sin upload, sin servidor)",
        "OpenAI Whisper API para la transcripción (barata, rápida, precisa)",
        "Tailwind v4 + shadcn/ui para la UI — quería lanzar, no diseñar",
        "Vercel para el hosting porque soy vago y simplemente funciona"
      ]},
      { type:'code', code:"// la función de corte completa, más o menos\nasync function trim(video, segments) {\n  await ffmpeg.load();\n  await ffmpeg.writeFile('input.mp4', await fetchFile(video));\n  const filter = segments.map((s, i) => \n    `[0:v]trim=${s.start}:${s.end},setpts=PTS-STARTPTS[v${i}]`\n  ).join(';');\n  await ffmpeg.exec(['-i','input.mp4', '-filter_complex', filter, 'out.mp4']);\n  return ffmpeg.readFile('out.mp4');\n}" },
      { type:'h', text:"Lo que aprendí" },
      { type:'list', items:[
        "FFmpeg.wasm es sorprendentemente capaz. Es lento con videos largos, pero por debajo de 10 minutos ni se nota.",
        "Los timestamps a nivel de palabra de Whisper son lo bastante buenos como para mover un editor real. La detección de 'eh' es regular pero puedo vivir con eso.",
        "Lanzar una herramienta que tú mismo usas, cada día, es el cheat code. Detecté cada arista al tercer día y las pulí al décimo."
      ]},
      { type:'p', text:"Factura total hasta hoy: ~8 dólares en créditos de Whisper. Comparado con ~120 dólares al mes de la alternativa pagada, eso es un año de edición por el precio de un solo mes. El código está en GitHub si quieres bifurcarlo o simplemente ver lo malo que es." },
      { type:'p', text:"Si llevas tiempo pagando una herramienta que sospechas podrías construir, esta es tu señal. Bloquea tres fines de semana. El primero será miserable. Al tercero estarás usando lo tuyo." },
    ],
  },
  // Generic fallback (used for any other slug)
  '_default': {
    en: [
      { type:'p', text:"This is a sample article body — the redesign keeps prose comfortable in pixel form. Body copy is set in VT323 (a chunky monospace), with Press Start 2P reserved for the heading lockups so the headings feel like signage and the body still reads at long lengths." },
      { type:'h', text:"A small subhead" },
      { type:'p', text:"Paragraphs sit at 21px with generous leading. Links get a brand-colored 3px underline. Inline code gets a tiny pixel box around it, like {this}. Block code uses a CRT-green-on-black pane with a fake terminal bar above it." },
      { type:'list', items:[
        "Bullets get a pixel arrow as the marker",
        "Spacing is chunky enough to read at a glance",
        "Nothing autoresizes the type — your eyes are fine, the words just want to be the same size",
      ]},
      { type:'code', code:"// inline code & code blocks both ship\nfunction example() {\n  return 'pixel-perfect prose';\n}" },
      { type:'h', text:"Closing the loop" },
      { type:'p', text:"That's the template. Drop in your post body — paragraphs, headings, lists, code blocks, the occasional callout — and it just works. Click around the rest of the post page to see how related posts, prev/next, and the newsletter signup fit at the bottom." },
    ],
    es: [
      { type:'p', text:"Este es un cuerpo de artículo de ejemplo — el rediseño mantiene la lectura cómoda en píxeles. El cuerpo está en VT323 (una monospace chunky), con Press Start 2P reservado para los titulares para que se sientan como letreros y el cuerpo siga siendo legible en textos largos." },
      { type:'h', text:"Un subtítulo pequeño" },
      { type:'p', text:"Los párrafos van a 21px con un interlineado generoso. Los enlaces llevan un subrayado de 3px en color de marca. El código inline lleva una pequeña caja pixelada, así {esto}. El código en bloque usa un panel verde-CRT sobre negro con una barra falsa arriba." },
      { type:'list', items:[
        "Las viñetas usan una flecha pixelada como marcador",
        "El espaciado es lo bastante grueso para leer de un vistazo",
        "Nada redimensiona la tipografía sola — tus ojos están bien, las palabras solo quieren ser del mismo tamaño",
      ]},
      { type:'code', code:"// código inline y bloques de código, los dos\nfunction ejemplo() {\n  return 'prosa pixel-perfect';\n}" },
      { type:'h', text:"Cierre del loop" },
      { type:'p', text:"Esa es la plantilla. Suelta el cuerpo de tu post — párrafos, encabezados, listas, bloques de código, alguna que otra caja destacada — y simplemente funciona. Mira el resto de la página para ver cómo encajan posts relacionados, prev/next y la suscripción al newsletter al final." },
    ],
  },
};

// ---- Reading progress bar (pixel) ----
function ReadingProgress({accent}) {
  const [p, setP] = React.useState(0);
  React.useEffect(()=>{
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max>0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>window.removeEventListener('scroll', onScroll);
  }, []);
  // pixel "tape" — 40 chunks
  const chunks = 40;
  const filled = Math.round((p/100) * chunks);
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:6,
      background:'rgba(0,0,0,0.6)', borderBottom:'2px solid var(--ink)',
      display:'flex', zIndex:90,
    }}>
      <div style={{
        height:'100%', width:`${p}%`,
        background: `repeating-linear-gradient(90deg, ${accent} 0 8px, transparent 8px 10px)`,
        transition:'width 0.08s linear',
      }}/>
    </div>
  );
}

// ---- Article header ----
function ArticleHeader({post, lang, accent}) {
  return (
    <header style={{padding:'48px 32px 24px'}}>
      <div className="container" style={{maxWidth:880}}>
        <a href="blog.html" className="pixel-text" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          fontSize:10, color:'var(--dim)', letterSpacing:'0.15em',
          padding:'8px 12px', border:'2px solid var(--dim-2)',
          marginBottom:32,
        }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor=accent; e.currentTarget.style.color='var(--ink)'; playHover(); }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--dim-2)'; e.currentTarget.style.color='var(--dim)'; }}
          onClick={()=>playClick()}
        >
          <PxArrow scale={2} dir="left"/> {lang==='en'?'BACK TO BLOG':'VOLVER AL BLOG'}
        </a>

        <div style={{display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', marginBottom:24}}>
          <span style={{display:'inline-block', background:accent, color:'#000', padding:'5px 10px', fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.2em', border:'3px solid #000'}}>
            {post.tag.toUpperCase()}
          </span>
          <span className="pixel-text" style={{fontSize:9, color:'var(--hot-yellow)', letterSpacing:'0.2em'}}>
            {post.date[lang].toUpperCase()}
          </span>
          <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.2em'}}>·</span>
          <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.2em'}}>
            {post.read} {lang==='en'?'READ':'LECTURA'}
          </span>
        </div>

        <h1 className="pixel-text" style={{
          margin:0,
          fontSize:34, lineHeight:1.3, letterSpacing:'0.01em',
          color:'var(--ink)',
        }}>{post.title[lang]}</h1>

        <div style={{marginTop:32, display:'flex', alignItems:'center', gap:16}}>
          <div style={{border:'3px solid var(--ink)', background:'var(--paper-2)', padding:3}}>
            <PxAvatar scale={3} bg="#000" shirt={accent}/>
          </div>
          <div>
            <div className="pixel-text" style={{fontSize:11, color:'var(--ink)', letterSpacing:'0.1em', marginBottom:8}}>
              CARLOS CHAO
            </div>
            <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em'}}>
              @ELFRONTEND · MADRID
            </div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap:10}}>
            <ShareBtn icon="x" label="X" accent={accent}/>
            <ShareBtn icon="linkedin" label="LinkedIn" accent={accent}/>
            <ShareBtn icon="link" label="Copy link" accent={accent}/>
          </div>
        </div>
      </div>
    </header>
  );
}

function ShareBtn({icon, label, accent}) {
  return (
    <button title={label} onClick={()=>{ playClick(); }} style={{
      width:38, height:38, background:'transparent',
      border:'2px solid var(--dim-2)', cursor:'pointer',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      color:'var(--ink)', transition:'all 0.12s',
    }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=accent; e.currentTarget.style.color=accent; playHover(); }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--dim-2)'; e.currentTarget.style.color='var(--ink)'; }}
    >
      {icon==='link' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      ) : <PxSocial id={icon} scale={3}/>}
    </button>
  );
}

// ---- Hero image ----
function ArticleHero({post}) {
  return (
    <div style={{padding:'24px 32px 32px'}}>
      <div className="container" style={{maxWidth:1040}}>
        <div style={{
          position:'relative', aspectRatio:'21/9', overflow:'hidden',
          border:'4px solid var(--ink)', background:'#000',
          boxShadow:'8px 8px 0 var(--brand-deep)',
        }}>
          <img src={post.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.15)'}}/>
          <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)', pointerEvents:'none'}}/>
        </div>
      </div>
    </div>
  );
}

// ---- Article body ----
function ArticleBody({body, accent}) {
  return (
    <article style={{padding:'24px 32px 48px'}}>
      <div className="container" style={{maxWidth:760, display:'flex', flexDirection:'column', gap:24}}>
        {body.map((b, i)=>{
          if (b.type === 'p') return (
            <p key={i} style={{margin:0, fontFamily:'var(--font-pixel-body)', fontSize:23, lineHeight:1.6, color:'var(--ink)'}}>{b.text}</p>
          );
          if (b.type === 'h') return (
            <h2 key={i} className="pixel-text" style={{
              margin:'28px 0 0', fontSize:18, lineHeight:1.4, letterSpacing:'0.02em', color:accent,
              display:'inline-flex', alignItems:'center', gap:12,
            }}>
              <span style={{display:'inline-block', width:14, height:14, background:accent}}/>
              {b.text}
            </h2>
          );
          if (b.type === 'list') return (
            <ul key={i} style={{margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:14}}>
              {b.items.map((it, j) => (
                <li key={j} style={{display:'flex', gap:14, fontFamily:'var(--font-pixel-body)', fontSize:22, lineHeight:1.5, color:'var(--ink)'}}>
                  <span style={{flexShrink:0, marginTop:8}}><PxArrow scale={2} color={accent}/></span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
          if (b.type === 'code') return (
            <div key={i} style={{
              border:'3px solid var(--ink)', background:'#000',
              boxShadow:'5px 5px 0 var(--hot-green)',
            }}>
              <div style={{
                padding:'6px 12px', borderBottom:'2px dashed var(--dim-2)',
                background:'var(--paper-2)', display:'flex', alignItems:'center', gap:8,
              }}>
                <span style={{display:'inline-flex', gap:5}}>
                  <span style={{width:10, height:10, background:'var(--hot-red)'}}/>
                  <span style={{width:10, height:10, background:'var(--hot-yellow)'}}/>
                  <span style={{width:10, height:10, background:'var(--hot-green)'}}/>
                </span>
                <span className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.15em', marginLeft:'auto'}}>SAMPLE.JS</span>
              </div>
              <pre style={{
                margin:0, padding:'18px 20px', overflowX:'auto',
                fontFamily:'var(--font-mono)', fontSize:13, lineHeight:1.6,
                color:'var(--hot-green)',
              }}>{b.code}</pre>
            </div>
          );
          return null;
        })}
      </div>
    </article>
  );
}

// ---- Reaction bar ("did you like it?") ----
function Reactions({lang, accent}) {
  const [chosen, setChosen] = React.useState(null);
  const reactions = [
    { id:'love',  icon:<PxHeart scale={2} color="var(--hot-pink)"/>, label: lang==='en'?'LOVED IT':'ME ENCANTÓ' },
    { id:'learn', icon:<PxStar scale={2} color="var(--hot-yellow)"/>, label: lang==='en'?'LEARNED A LOT':'APRENDÍ MUCHO' },
    { id:'meh',   icon:<PxCoin scale={2}/>, label: lang==='en'?'IT WAS OK':'ESTUVO BIEN' },
  ];
  return (
    <div style={{padding:'24px 32px 8px'}}>
      <div className="container" style={{maxWidth:760}}>
        <div style={{
          padding:'24px 24px', border:'3px solid var(--ink)', background:'var(--paper-2)',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap',
        }}>
          <div>
            <div className="pixel-text" style={{fontSize:10, color:accent, letterSpacing:'0.18em', marginBottom:10}}>
              {lang==='en'?'>>> RATE THIS POST':'>>> CALIFICA ESTE POST'}
            </div>
            <div style={{fontFamily:'var(--font-pixel-body)', fontSize:20, color:'var(--dim)'}}>
              {chosen
                ? (lang==='en'?'Thanks! Saved.':'¡Gracias! Guardado.')
                : (lang==='en'?'No login. Just a tap.':'Sin login. Solo un click.')}
            </div>
          </div>
          <div style={{display:'flex', gap:10}}>
            {reactions.map(r=>(
              <button key={r.id} onClick={()=>{ setChosen(r.id); playPowerUp(); }}
                style={{
                  background: chosen===r.id ? accent : 'transparent',
                  color: chosen===r.id ? '#000' : 'var(--ink)',
                  border:`3px solid ${chosen===r.id ? accent : 'var(--dim-2)'}`,
                  padding:'12px 14px', cursor:'pointer',
                  fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.12em',
                  display:'inline-flex', alignItems:'center', gap:8,
                  transition:'all 0.12s',
                }}
                onMouseEnter={e=>{ if(chosen!==r.id) e.currentTarget.style.borderColor=accent; playHover(); }}
                onMouseLeave={e=>{ if(chosen!==r.id) e.currentTarget.style.borderColor='var(--dim-2)'; }}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Prev / Next nav ----
function PrevNext({prev, next, lang, accent}) {
  return (
    <div style={{padding:'24px 32px 24px'}}>
      <div className="container" style={{maxWidth:1040}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
          {prev ? (
            <a href={"blog-post.html?slug="+prev.slug} className="pcard"
              onClick={()=>playClick()}
              style={{padding:'20px 22px', textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', gap:10}}>
              <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.2em', display:'inline-flex', alignItems:'center', gap:8}}>
                <PxArrow scale={2} dir="left" color="var(--dim)"/> {lang==='en'?'PREVIOUS':'ANTERIOR'}
              </div>
              <div style={{fontFamily:'var(--font-pixel-body)', fontSize:20, color:'var(--ink)', lineHeight:1.3}}>{prev.title[lang]}</div>
            </a>
          ) : <div/>}
          {next ? (
            <a href={"blog-post.html?slug="+next.slug} className="pcard"
              onClick={()=>playClick()}
              style={{padding:'20px 22px', textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', gap:10, textAlign:'right'}}>
              <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.2em', display:'inline-flex', alignItems:'center', gap:8, justifyContent:'flex-end'}}>
                {lang==='en'?'NEXT':'SIGUIENTE'} <PxArrow scale={2} color="var(--dim)"/>
              </div>
              <div style={{fontFamily:'var(--font-pixel-body)', fontSize:20, color:'var(--ink)', lineHeight:1.3}}>{next.title[lang]}</div>
            </a>
          ) : <div/>}
        </div>
      </div>
    </div>
  );
}

// ---- Related posts ----
function Related({posts, lang, accent}) {
  return (
    <section style={{padding:'48px 32px 32px'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {lang==='en'?'KEEP READING':'SIGUE LEYENDO'}</div>
            <h2 className="sec-title">{lang==='en'?'Related':'Relacionados'} <em style={{color:accent}}>{lang==='en'?'posts.':'posts.'}</em></h2>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
          {posts.slice(0,3).map(b=>(
            <a key={b.id} href={"blog-post.html?slug="+b.slug} className="pcard"
              onClick={()=>playCoin()}
              style={{textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', background:'var(--paper-2)'}}>
              <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden', borderBottom:'3px solid var(--ink)'}}>
                <img src={b.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)'}}/>
                <div style={{position:'absolute', top:8, left:8, background:'#000', color:'var(--hot-yellow)', padding:'4px 7px', fontFamily:'var(--font-pixel)', fontSize:8, letterSpacing:'0.15em', border:'2px solid var(--hot-yellow)'}}>{b.tag.toUpperCase()}</div>
              </div>
              <div style={{padding:'16px 18px'}}>
                <div className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.18em', marginBottom:10}}>{b.date[lang].toUpperCase()} · {b.read}</div>
                <div style={{fontFamily:'var(--font-pixel-body)', fontSize:21, lineHeight:1.25, color:'var(--ink)'}}>{b.title[lang]}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- ArticlePage main ----
function ArticlePage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentDef = ACCENT_OPTIONS.find(a => a.key === t.accent) || ACCENT_OPTIONS[0];
  const accent = accentDef.color;
  const lang = t.lang;
  const [lives] = React.useState(3);
  const [konami, setKonami] = React.useState(false);

  // Read slug from URL
  const slug = new URLSearchParams(window.location.search).get('slug') || ALL_POSTS[0].slug;
  const post = ALL_POSTS.find(p => p.slug === slug) || ALL_POSTS[0];
  const body = (ARTICLE_BODIES[post.slug] || ARTICLE_BODIES._default)[lang] || ARTICLE_BODIES._default.en;

  // Prev/next
  const idx = ALL_POSTS.findIndex(p => p.slug === post.slug);
  const prev = idx > 0 ? ALL_POSTS[idx-1] : null;
  const next = idx < ALL_POSTS.length-1 ? ALL_POSTS[idx+1] : null;
  const related = ALL_POSTS.filter(p => p.slug !== post.slug && p.tag === post.tag).concat(ALL_POSTS.filter(p => p.slug !== post.slug)).slice(0,3);

  // Token sync
  React.useEffect(()=>{
    document.documentElement.style.setProperty('--brand', accentDef.color);
    document.documentElement.style.setProperty('--brand-deep', accentDef.deep);
  }, [accentDef]);
  React.useEffect(()=>{
    const f = FONT_SETS[t.fontSet] || FONT_SETS.mixed;
    document.documentElement.style.setProperty('--font-pixel', f.display);
    document.documentElement.style.setProperty('--font-pixel-body', f.body);
    document.documentElement.style.setProperty('--font-pixel-ui', f.ui);
  }, [t.fontSet]);
  React.useEffect(()=>{
    document.body.classList.toggle('crt-on', !!t.scanlines);
    document.body.classList.toggle('crt-off', !t.scanlines);
  }, [t.scanlines]);
  React.useEffect(()=>{ setSoundEnabled(!!t.sound); }, [t.sound]);

  // Set title
  React.useEffect(()=>{
    document.title = `${post.title[lang]} · ElFrontend`;
  }, [post, lang]);

  useKonami(() => {
    setKonami(true);
    playFanfare();
    const i = ACCENT_OPTIONS.findIndex(a=>a.key===t.accent);
    setTweak('accent', ACCENT_OPTIONS[(i+1) % ACCENT_OPTIONS.length].key);
  });

  return (
    <>
      {konami && <KonamiBanner lang={lang} onDone={()=>setKonami(false)}/>}
      <ReadingProgress accent={accent}/>
      <StatusBar
        lang={lang}
        setLang={(v)=>setTweak('lang', v)}
        sound={t.sound}
        setSound={(fn)=>setTweak('sound', typeof fn==='function'?fn(t.sound):fn)}
        crt={t.scanlines}
        setCrt={(fn)=>setTweak('scanlines', typeof fn==='function'?fn(t.scanlines):fn)}
        lives={lives}
      />
      <Nav lang={lang} setLang={(v)=>setTweak('lang', v)} active="blog"/>

      <ArticleHeader post={post} lang={lang} accent={accent}/>
      <ArticleHero post={post}/>
      <ArticleBody body={body} accent={accent}/>
      <Reactions lang={lang} accent={accent}/>
      <PrevNext prev={prev} next={next} lang={lang} accent={accent}/>
      <Related posts={related} lang={lang} accent={accent}/>
      <Newsletter lang={lang} accent={accent}/>
      <Footer lang={lang} t={COPY[lang]}/>

      <WalkingSprite accent={accent}/>

      <TweaksPanel title="Tweaks · Arcade">
        <TweakSection label="Accent"/>
        <TweakColor label="Color" value={accentDef.color} options={ACCENT_OPTIONS.map(a=>a.color)}
          onChange={(c)=>{ const f=ACCENT_OPTIONS.find(a=>a.color===c); if (f) setTweak('accent', f.key); }}/>
        <TweakSection label="Difficulty"/>
        <TweakRadio label="Mode" value={t.difficulty} options={['easy','medium','hard']} onChange={(v)=>setTweak('difficulty', v)}/>
        <TweakSection label="Typography"/>
        <TweakSelect label="Font set" value={t.fontSet}
          options={[
            {value:'mixed', label:'Mixed (Press Start + VT323)'},
            {value:'starpress', label:'All Press Start 2P'},
            {value:'vt323', label:'VT323 only'},
            {value:'silkscreen', label:'Silkscreen + VT323'},
          ]}
          onChange={(v)=>setTweak('fontSet', v)}/>
        <TweakSection label="Display"/>
        <TweakToggle label="CRT scanlines" value={t.scanlines} onChange={(v)=>setTweak('scanlines', v)}/>
        <TweakToggle label="Sound effects" value={t.sound} onChange={(v)=>setTweak('sound', v)}/>
        <TweakSection label="Language"/>
        <TweakRadio label="Lang" value={t.lang} options={['en','es']} onChange={(v)=>setTweak('lang', v)}/>
      </TweaksPanel>
    </>
  );
}

arcadeBoot(ArticlePage);
