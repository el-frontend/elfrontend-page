// ============================================================
// arcade-blog-page.jsx — Blog INDEX page (mounts BlogPage)
// Shared constants/components live in arcade-blog-shared.jsx
// ============================================================

function BlogHeader({lang, accent, count}) {
  const t = BLOG_COPY[lang];
  return (
    <section style={{padding:'56px 32px 24px'}}>
      <div className="container">
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18}}>
          <a href="index.html" className="pixel-text" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontSize:10, color:'var(--dim)', letterSpacing:'0.15em',
            padding:'8px 12px', border:'2px solid var(--dim-2)',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=accent; e.currentTarget.style.color='var(--ink)'; playHover(); }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--dim-2)'; e.currentTarget.style.color='var(--dim)'; }}
            onClick={()=>playClick()}
          >
            <PxArrow scale={2} dir="left"/> {t.backHome}
          </a>
          <span className="pixel-text" style={{fontSize:9, color:'var(--hot-yellow)', letterSpacing:'0.25em', display:'inline-flex', alignItems:'center', gap:8}}>
            <PxArrow scale={2} color="var(--hot-yellow)"/> {COPY[lang].stage7}
          </span>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'end', marginBottom:48, marginTop:32}}>
          <div>
            <h1 className="pixel-text" style={{margin:0, fontSize:48, lineHeight:1.15, color:'var(--ink)', letterSpacing:'0.02em'}}>
              {t.pageTitle} <em style={{fontStyle:'normal', color:accent}}>{t.pageTitleEm}</em>
            </h1>
            <p style={{margin:'22px 0 0', fontFamily:'var(--font-pixel-body)', fontSize:24, color:'var(--dim)', lineHeight:1.4, maxWidth:560}}>
              {t.pageSub}
            </p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {BLOG_STATS.map(s=>(
              <div key={s.key} style={{padding:'14px 16px', border:'3px solid var(--ink)', background:'var(--paper-2)'}}>
                <div className="pixel-text" style={{fontSize:18, color:`var(--${s.color})`, letterSpacing:'0.04em'}}>{s.val}</div>
                <div className="pixel-text" style={{fontSize:7, color:'var(--dim)', letterSpacing:'0.2em', marginTop:8}}>{t[s.key]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({post, lang, accent}) {
  const t = BLOG_COPY[lang];
  return (
    <section style={{padding:'0 32px 56px'}}>
      <div className="container">
        <a href={"blog-post.html?slug="+post.slug}
          onClick={()=>playCoin()}
          className="pcard"
          style={{
            display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:0,
            textDecoration:'none', color:'inherit',
            background:'var(--paper-2)',
            boxShadow:'8px 8px 0 0 ' + accent,
          }}>
          <div style={{position:'relative', borderRight:'3px solid var(--ink)', overflow:'hidden', minHeight:340}}>
            <img src={post.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.15)', display:'block'}}/>
            <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px)'}}/>
            <div style={{position:'absolute', top:14, left:14, background:accent, color:'#000', padding:'6px 10px', fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.2em', border:'3px solid #000'}}>
              ★ {t.featured}
            </div>
          </div>
          <div style={{padding:'32px 32px 28px', display:'flex', flexDirection:'column', gap:14}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <span style={{display:'inline-block', background:'#000', color:'var(--hot-yellow)', padding:'5px 9px', fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.15em', border:'2px solid var(--hot-yellow)'}}>{post.tag.toUpperCase()}</span>
              <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em'}}>{post.date[lang].toUpperCase()} · {post.read}</span>
            </div>
            <h2 style={{margin:'14px 0 8px', fontFamily:'var(--font-pixel-body)', fontSize:36, lineHeight:1.2, color:'var(--ink)'}}>{post.title[lang]}</h2>
            <p style={{margin:0, fontFamily:'var(--font-pixel-body)', fontSize:21, color:'var(--dim)', lineHeight:1.5, flex:1}}>
              {lang==='en'
                ? "I tried every paid AI video editor on the market, hated the pricing, and ended up building my own. Here's the full story — what I learned, the tools I used, and why FFmpeg is still magic."
                : "Probé todos los editores de video con IA del mercado, odié los precios y acabé construyendo el mío. La historia completa — qué aprendí, qué usé y por qué FFmpeg sigue siendo magia."}
            </p>
            <div style={{marginTop:14, paddingTop:14, borderTop:'3px dashed var(--dim-2)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{border:'2px solid var(--ink)', background:'var(--paper)', padding:2}}>
                  <PxAvatar scale={1} bg="#000" shirt={accent}/>
                </div>
                <span className="pixel-text" style={{fontSize:9, color:'var(--ink)', letterSpacing:'0.1em'}}>CARLOS · @ELFRONTEND</span>
              </div>
              <span className="pixel-text" style={{fontSize:10, color:accent, letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:8}}>
                {t.readingTime} <PxArrow scale={2} color={accent}/>
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function BlogToolbar({lang, accent, query, setQuery, tag, setTag, sort, setSort, count}) {
  const t = BLOG_COPY[lang];
  const tags = lang==='en' ? BLOG_TAGS_EN : BLOG_TAGS_ES;
  return (
    <section style={{padding:'0 32px 28px'}}>
      <div className="container">
        <div style={{display:'flex', alignItems:'center', gap:18, flexWrap:'wrap', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:0, border:'3px solid var(--ink)', background:'#000', padding:'4px 4px 4px 14px', minWidth:280, flex:'1 1 280px', maxWidth:420}}>
            <span style={{color:accent, marginRight:10, display:'inline-flex'}}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              onKeyDown={e=>e.key.length===1 && playType()}
              placeholder={t.filterPlaceholder}
              style={{flex:1, background:'transparent', border:0, outline:'none', color:'var(--ink)', fontFamily:'var(--font-pixel-body)', fontSize:21, padding:'10px 0', caretColor:accent}}/>
            {query && <button onClick={()=>{ setQuery(''); playClick(); }} style={{background:'transparent', border:0, color:'var(--dim)', padding:'8px 12px', fontFamily:'var(--font-pixel)', fontSize:10}}>×</button>}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:18}}>
            <span className="pixel-text" style={{fontSize:10, color:'var(--dim)', letterSpacing:'0.18em'}}>
              <span style={{color:accent}}>{count.toString().padStart(2,'0')}</span> {t.postsCount}
            </span>
            <div style={{display:'inline-flex', border:'3px solid var(--dim-2)'}}>
              {['newest','popular'].map(s=>(
                <button key={s} onClick={()=>{ setSort(s); playClick(); }} style={{
                  background: sort===s ? accent : 'transparent',
                  color: sort===s ? '#000' : 'var(--dim)',
                  border:0, padding:'8px 14px',
                  fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.12em',
                  cursor:'pointer',
                }}>{s==='newest'?t.sortNewest:t.sortPopular}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginTop:18}}>
          <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.2em', marginRight:8}}>{t.tagsLabel}:</span>
          {tags.map((tg,i)=>{
            const active = tag === tg || (i===0 && tag==='ALL');
            return (
              <button key={tg} onClick={()=>{ setTag(tg); playClick(); }}
                style={{
                  background: active ? accent : 'transparent',
                  color: active ? '#000' : 'var(--ink)',
                  border:`2px solid ${active ? accent : 'var(--dim-2)'}`,
                  padding:'7px 12px',
                  fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.12em',
                  cursor:'pointer', transition:'all 0.12s',
                }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.borderColor=accent; playHover(); }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.borderColor='var(--dim-2)'; }}
              >{tg}</button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BlogGrid({posts, lang, accent}) {
  const t = BLOG_COPY[lang];
  if (!posts.length) {
    return (
      <section style={{padding:'40px 32px 60px'}}>
        <div className="container" style={{
          textAlign:'center', padding:'60px 24px',
          border:'4px dashed var(--dim-2)',
        }}>
          <div style={{display:'inline-flex', gap:12, marginBottom:18, opacity:0.7}}>
            <PxStar scale={3} color="var(--dim)"/>
            <PxStar scale={3} color="var(--dim)"/>
            <PxStar scale={3} color="var(--dim)"/>
          </div>
          <div className="pixel-text" style={{fontSize:16, color:'var(--ink)', letterSpacing:'0.1em', marginBottom:12}}>{t.noResults}</div>
          <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.18em'}}>{t.noResultsHint}</div>
        </div>
      </section>
    );
  }
  return (
    <section style={{padding:'8px 32px 60px'}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
          {posts.map((b,i)=>(
            <a key={b.id} href={"blog-post.html?slug="+b.slug}
              onClick={()=>playCoin()}
              className="pcard"
              style={{textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', background:'var(--paper-2)'}}>
              <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden', background:'#000', borderBottom:'3px solid var(--ink)'}}>
                <img src={b.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.1)'}}/>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)'}}/>
                <div style={{position:'absolute', top:8, left:8, background:'#000', color:'var(--hot-yellow)', padding:'4px 7px', fontFamily:'var(--font-pixel)', fontSize:8, letterSpacing:'0.15em', border:'2px solid var(--hot-yellow)'}}>{b.tag.toUpperCase()}</div>
                <div style={{position:'absolute', top:8, right:8, background:accent, color:'#000', padding:'4px 7px', fontFamily:'var(--font-pixel)', fontSize:8, letterSpacing:'0.1em', border:'2px solid #000'}}>#{(i+1).toString().padStart(3,'0')}</div>
              </div>
              <div style={{padding:'18px 18px', flex:1, display:'flex', flexDirection:'column'}}>
                <div className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.18em', marginBottom:10}}>{b.date[lang].toUpperCase()} · {b.read}</div>
                <div style={{fontFamily:'var(--font-pixel-body)', fontSize:22, lineHeight:1.25, color:'var(--ink)', flex:1}}>{b.title[lang]}</div>
                <div style={{marginTop:14, paddingTop:12, borderTop:'2px dashed var(--dim-2)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <PxHeart scale={1} color="var(--hot-pink)"/>
                    <span className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.1em'}}>{20 + ((i*37)%160)}</span>
                  </span>
                  <span className="pixel-text" style={{fontSize:9, color:accent, letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:6}}>
                    {t.readingTime} <PxArrow scale={2} color={accent}/>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentDef = ACCENT_OPTIONS.find(a => a.key === t.accent) || ACCENT_OPTIONS[0];
  const accent = accentDef.color;
  const lang = t.lang;
  const [lives] = React.useState(3);
  const [query, setQuery] = React.useState('');
  const [tag, setTag] = React.useState('ALL');
  const [sort, setSort] = React.useState('newest');
  const [konami, setKonami] = React.useState(false);

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

  useKonami(() => {
    setKonami(true); playFanfare();
    const idx = ACCENT_OPTIONS.findIndex(a=>a.key===t.accent);
    setTweak('accent', ACCENT_OPTIONS[(idx+1) % ACCENT_OPTIONS.length].key);
  });

  const filtered = React.useMemo(()=>{
    let list = ALL_POSTS.slice();
    if (tag && tag !== 'ALL' && tag !== 'TODO') {
      const tu = tag.toUpperCase();
      list = list.filter(p => {
        const pt = p.tag.toUpperCase();
        if (pt === tu) return true;
        if ((tu==='THEORY'||tu==='TEORÍA') && pt==='THEORY') return true;
        if ((tu==='PROCESS'||tu==='PROCESO') && pt==='PROCESS') return true;
        return false;
      });
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title[lang].toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
    }
    if (sort==='popular') list = list.slice().reverse();
    return list;
  }, [tag, query, sort, lang]);

  const featured = ALL_POSTS[0];

  return (
    <>
      {konami && <KonamiBanner lang={lang} onDone={()=>setKonami(false)}/>}

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

      <BlogHeader lang={lang} accent={accent} count={filtered.length}/>
      <FeaturedPost post={featured} lang={lang} accent={accent}/>
      <BlogToolbar lang={lang} accent={accent}
        query={query} setQuery={setQuery}
        tag={tag} setTag={setTag}
        sort={sort} setSort={setSort}
        count={filtered.length}/>
      <BlogGrid posts={filtered} lang={lang} accent={accent}/>
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

arcadeBoot(BlogPage);
