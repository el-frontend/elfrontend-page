// ============================================================
// arcade-sections.jsx — All static sections
// ============================================================

// ---- Status bar (top) ----
function StatusBar({lang, setLang, sound, setSound, crt, setCrt, lives, onCheat}) {
  const t = COPY[lang];
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:18, flexWrap:'wrap',
      padding:'10px 24px',
      background:'#000',
      borderBottom:'4px solid var(--brand)',
      fontFamily:'var(--font-pixel)', fontSize:10, color:'var(--ink)',
      position:'sticky', top:0, zIndex:80,
    }}>
      <span style={{display:'inline-flex', gap:3, alignItems:'center'}}>
        <PxStar scale={2} color="var(--hot-yellow)"/>
        <PxStar scale={2} color="var(--hot-yellow)"/>
        <PxStar scale={2} color="var(--hot-yellow)"/>
      </span>
      <span style={{color:'var(--ink)'}}>1-PLAYER</span>
      <span style={{color:'var(--dim-2)'}}>·</span>
      <span style={{color:'var(--hot-green)'}}>HI: 99,999</span>
      <span style={{color:'var(--dim-2)'}}>·</span>
      <span style={{color:'var(--ink)'}}>{t.stage1}</span>

      <span style={{marginLeft:'auto', display:'flex', gap:18, alignItems:'center'}}>
        {/* Lives */}
        <span style={{display:'inline-flex', gap:5, alignItems:'center'}}>
          {Array.from({length:lives}).map((_,i)=><PxHeart key={i} scale={2}/>)}
          {Array.from({length:Math.max(0,3-lives)}).map((_,i)=><PxHeart key={'o'+i} scale={2} color="var(--dim-2)"/>)}
        </span>

        {/* Sound toggle */}
        <button onClick={()=>setSound(s=>!s)} style={tinyBtn}>
          {t.soundLabel}:<span style={{color: sound?'var(--hot-green)':'var(--hot-red)', marginLeft:6}}>{sound?t.onOff.on:t.onOff.off}</span>
        </button>
        {/* CRT toggle */}
        <button onClick={()=>setCrt(c=>!c)} style={tinyBtn}>
          {t.crtLabel}:<span style={{color: crt?'var(--hot-green)':'var(--hot-red)', marginLeft:6}}>{crt?t.onOff.on:t.onOff.off}</span>
        </button>
        {/* Lang toggle */}
        <span style={{display:'inline-flex', gap:0, border:'2px solid var(--ink)'}}>
          {['en','es'].map(c=>(
            <button key={c} onClick={()=>{ playClick(); setLang(c); }} style={{
              background: lang===c? 'var(--brand)' : 'transparent',
              color: lang===c? '#000' : 'var(--ink)',
              border:0, padding:'5px 10px',
              fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.08em',
              cursor:'pointer',
            }}>{c.toUpperCase()}</button>
          ))}
        </span>
      </span>
    </div>
  );
}

const tinyBtn = {
  background:'transparent', border:'2px solid var(--dim-2)', color:'var(--ink)',
  padding:'5px 9px',
  fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.1em',
  cursor:'pointer',
};

// ---- Nav (logo + tabs + handle) ----
function Nav({lang, setLang, active='home'}) {
  const t = COPY[lang];
  // Map nav keys to URLs
  const navLinks = {
    home:     'index.html',
    about:    'index.html#about',
    skills:   'index.html#skills',
    projects: 'index.html#projects',
    videos:   'index.html#videos',
    blog:     'blog.html',
    contact:  'index.html#contact',
  };
  return (
    <nav className="container" style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'24px 32px', gap:24,
      borderBottom:'4px dashed var(--dim-2)',
      flexWrap:'wrap',
    }}>
      <a href="index.html" style={{display:'flex', alignItems:'center', gap:16, textDecoration:'none', color:'inherit'}}>
        <div style={{position:'relative', display:'inline-flex'}}>
          <PxLogo scale={3}/>
          <span style={{position:'absolute', right:-8, bottom:-8, width:12, height:12, background:'var(--hot-yellow)', border:'2px solid #000', animation:'blink 1s steps(2) infinite'}}/>
        </div>
        <div>
          <div className="pixel-text" style={{fontSize:15, color:'var(--ink)', letterSpacing:'0.05em'}}>ElFrontend</div>
          <div className="pixel-text" style={{fontSize:8, color:'var(--hot-yellow)', letterSpacing:'0.2em', marginTop:6}}>{t.appTag}</div>
        </div>
      </a>
      <div style={{display:'flex', gap:24, color:'var(--dim)', fontSize:11, letterSpacing:'0.1em', flexWrap:'wrap', justifyContent:'center'}}
        className="pixel-text">
        {Object.entries(t.nav).map(([k,n])=>{
          const isActive = k === active;
          const href = navLinks[k] || ('#'+k);
          return (
            <a key={k} href={href}
              onClick={()=>playClick()}
              style={{color: isActive?'var(--hot-yellow)':'var(--dim)', position:'relative', padding:'4px 0', textDecoration:'none'}}
              onMouseEnter={e=>{ e.currentTarget.style.color='var(--ink)'; playHover(); }}
              onMouseLeave={e=>{ e.currentTarget.style.color = isActive?'var(--hot-yellow)':'var(--dim)'; }}
            >
              {isActive && <span style={{position:'absolute', left:-16, top:'50%', transform:'translateY(-50%)'}}><PxArrow scale={2} color="var(--hot-yellow)"/></span>}
              {n}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ---- Hero (greeting + intro + chat) ----
function HeroSection({lang, accent, difficulty, onCoin}) {
  const t = COPY[lang];
  return (
    <section id="home" style={{padding:'56px 32px 64px', position:'relative'}}>
      <div className="container">
        {/* Big ASCII title pixel-art version */}
        <div style={{textAlign:'center', marginBottom:32}}>
          <div className="pixel-text" style={{fontSize:11, color:'var(--hot-yellow)', letterSpacing:'0.3em', marginBottom:14}}>
            ► {t.greeting.toUpperCase()}
          </div>
          <h1 className="pixel-text" style={{
            margin:0, fontSize:38, lineHeight:1.4, color:'var(--ink)',
            letterSpacing:'0.02em',
          }}>
            {t.typeLine} <span style={{color:accent}}>{t.typeAccent}</span>
            <span style={{display:'inline-block', width:24, height:38, background:accent, verticalAlign:'-8px', marginLeft:8, animation:'blink 1s steps(2) infinite'}}/>
          </h1>
        </div>

        {/* Avatar + intro */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:40, marginBottom:48, flexWrap:'wrap'}}>
          <div style={{position:'relative', flexShrink:0}}>
            <div style={{border:'5px solid var(--ink)', background:'var(--paper-2)', display:'inline-block', boxShadow:'6px 6px 0 0 var(--brand-deep)'}}>
              <PxAvatar scale={7} bg="#1d1438" shirt={accent}/>
            </div>
            <span style={{position:'absolute', top:-14, right:-22, background:'var(--hot-green)', color:'#000', fontFamily:'var(--font-pixel)', fontSize:9, padding:'5px 8px', letterSpacing:'0.15em', border:'3px solid #000', transform:'rotate(8deg)'}}>LV. 32</span>
            <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:6, alignItems:'center'}}>
              <div className="pixel-text" style={{fontSize:8, color:'var(--ink)', letterSpacing:'0.15em'}}>HP <span style={{color:'var(--hot-green)'}}>████████</span><span style={{color:'var(--dim-2)'}}>██</span></div>
              <div className="pixel-text" style={{fontSize:8, color:'var(--ink)', letterSpacing:'0.15em'}}>MP <span style={{color:'var(--hot-blue)'}}>██████</span><span style={{color:'var(--dim-2)'}}>████</span></div>
            </div>
          </div>
          <div style={{maxWidth:520}}>
            <div className="pixel-text" style={{fontSize:11, color:accent, letterSpacing:'0.15em', marginBottom:10}}>
              {t.name.toUpperCase()}
            </div>
            <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em', marginBottom:18}}>{t.handle} · MADRID, ES</div>
            <p style={{margin:0, fontFamily:'var(--font-pixel-body)', fontSize:24, lineHeight:1.45, color:'var(--ink)'}}>
              {t.intro[difficulty]}
            </p>
          </div>
        </div>

        {/* Chat panel */}
        <ArcadeChat lang={lang} accent={accent} difficulty={difficulty} onCoin={onCoin}/>
      </div>
    </section>
  );
}

// ---- Stats strip ----
function StatsStrip({lang}) {
  const t = COPY[lang];
  return (
    <section style={{borderTop:'4px solid var(--brand)', borderBottom:'4px solid var(--brand)', background:'var(--paper-2)'}}>
      <div className="container" style={{padding:0}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)'}}>
          {STATS.map((s,i)=>(
            <div key={s.key} style={{
              padding:'28px 24px', textAlign:'center',
              borderRight: i<3?'2px dashed var(--dim-2)':'none',
            }}>
              <div className="pixel-text" style={{fontSize:32, color:`var(--${s.color})`, letterSpacing:'0.04em'}}>{s.val}</div>
              <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', marginTop:12, letterSpacing:'0.2em'}}>{t.statsLabels[s.key]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- About ----
function AboutSection({lang, accent, difficulty}) {
  const t = COPY[lang];
  return (
    <section id="about" style={{padding:'72px 32px'}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:48}}>
          <div className="sec-head">
            <div>
              <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage2}</div>
              <h2 className="sec-title">{t.aboutTitle} <em style={{color:accent}}>{t.aboutTitleEm}</em></h2>
              <p className="sec-sub">{t.aboutSub}</p>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'start'}}>
            {/* bio + now */}
            <div>
              <p style={{margin:0, fontFamily:'var(--font-pixel-body)', fontSize:23, lineHeight:1.55, color:'var(--ink)'}}>
                {t.aboutBody[difficulty]}
              </p>
              <div style={{marginTop:36, padding:'24px 24px 20px', border:'3px solid var(--ink)', background:'var(--paper-2)', boxShadow:'5px 5px 0 var(--hot-yellow)'}}>
                <div className="pixel-text" style={{fontSize:10, color:'var(--hot-yellow)', letterSpacing:'0.2em', marginBottom:16, display:'inline-flex', alignItems:'center', gap:10}}>
                  <PxStar scale={2}/> {lang==='en'?'WORKING ON RIGHT NOW':'EN ESTO ESTOY AHORA'}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:10}}>
                  {t.nowList[difficulty].map((n,i)=>(
                    <div key={i} style={{display:'flex', alignItems:'flex-start', gap:12}}>
                      <span style={{color:'var(--hot-green)', fontFamily:'var(--font-mono)', fontSize:14, marginTop:4}}>▶</span>
                      <span style={{fontFamily:'var(--font-pixel-body)', fontSize:21, color:'var(--ink)', lineHeight:1.4}}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* facts grid */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {t.facts.map(f=>(
                <div key={f.k} style={{padding:'18px 16px', border:'3px solid var(--ink)', background:'var(--paper-2)'}}>
                  <div className="pixel-text" style={{fontSize:8, color:`var(--${f.color})`, letterSpacing:'0.2em', marginBottom:10}}>{f.k}</div>
                  <div style={{fontFamily:'var(--font-pixel-body)', fontSize:20, color:'var(--ink)'}}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Skills (pixel skill tree) ----
function SkillsSection({lang, accent}) {
  const t = COPY[lang];
  const [hovered, setHovered] = React.useState(null);

  return (
    <section id="skills" style={{padding:'72px 32px', background:'var(--paper-2)', borderTop:'4px solid var(--dim-2)', borderBottom:'4px solid var(--dim-2)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage3}</div>
            <h2 className="sec-title">{t.skillsTitle} <em style={{color:accent}}>{t.skillsTitleEm}</em></h2>
            <p className="sec-sub">{t.skillsSub}</p>
          </div>
          <div style={{display:'flex', gap:18, alignItems:'center', fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.15em'}}>
            <span style={{display:'inline-flex', gap:6, alignItems:'center'}}><span style={{display:'inline-block', width:14, height:14, background:'var(--hot-green)'}}/><span style={{color:'var(--dim)'}}>{t.skillsLegend.mastered}</span></span>
            <span style={{display:'inline-flex', gap:6, alignItems:'center'}}><span style={{display:'inline-block', width:14, height:14, background:'var(--hot-yellow)'}}/><span style={{color:'var(--dim)'}}>{t.skillsLegend.strong}</span></span>
            <span style={{display:'inline-flex', gap:6, alignItems:'center'}}><span style={{display:'inline-block', width:14, height:14, background:'var(--dim-2)'}}/><span style={{color:'var(--dim)'}}>{t.skillsLegend.learning}</span></span>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24}}>
          {SKILL_GROUPS.map(g=>(
            <div key={g.id} style={{
              padding:'24px 26px', border:'4px solid var(--ink)', background:'var(--paper)',
              boxShadow:`5px 5px 0 var(--${g.color})`,
            }}>
              <div className="pixel-text" style={{fontSize:13, color:`var(--${g.color})`, letterSpacing:'0.15em', marginBottom:20, display:'flex', alignItems:'center', gap:10}}>
                <span style={{display:'inline-block', width:14, height:14, background:`var(--${g.color})`}}/>
                {g.name[lang]}
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:14}}>
                {g.skills.map(s => {
                  const bgcolor = s.level===3 ? 'var(--hot-green)' : s.level===2 ? 'var(--hot-yellow)' : 'var(--dim-2)';
                  return (
                    <div key={s.name}
                      onMouseEnter={()=>{ setHovered(g.id+':'+s.name); playHover(); }}
                      onMouseLeave={()=>setHovered(null)}
                      style={{display:'flex', alignItems:'center', gap:14, cursor:'default'}}>
                      <div style={{flex:'0 0 140px', minWidth:0, fontFamily:'var(--font-pixel-body)', fontSize:20, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{s.name}</div>
                      <div style={{flex:1, display:'flex', gap:4, height:18, background:'var(--paper-2)', border:'2px solid var(--dim-2)', padding:2}}>
                        {[0,1,2].map(slot=>(
                          <div key={slot} style={{
                            flex:1,
                            background: slot < s.level ? bgcolor : 'transparent',
                            transition: 'background 0.1s',
                          }}/>
                        ))}
                      </div>
                      <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', minWidth:36, textAlign:'right'}}>{s.years}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Projects (game cards) ----
function ProjectsSection({lang, accent}) {
  const t = COPY[lang];
  return (
    <section id="projects" style={{padding:'72px 32px'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage4}</div>
            <h2 className="sec-title">{t.projectsTitle} <em style={{color:accent}}>{t.projectsTitleEm}</em></h2>
            <p className="sec-sub">{t.projectsSub}</p>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24}}>
          {PROJECTS.map((p,i)=>(
            <a key={p.id} href={p.href} target="_blank" rel="noreferrer" onClick={()=>playCoin()}
              className="pcard"
              style={{padding:'28px 26px 24px', textDecoration:'none', color:'inherit', position:'relative'}}>
              {/* corner badge */}
              <div style={{position:'absolute', top:-3, right:-3, background:`var(--${p.color})`, color:'#000', padding:'5px 10px', fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.15em', borderLeft:'3px solid var(--ink)', borderBottom:'3px solid var(--ink)'}}>
                {p.tag[lang]}
              </div>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:18}}>
                <div className="pixel-text" style={{fontSize:18, color:'var(--ink)', letterSpacing:'0.02em'}}>{p.name}</div>
                <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em', marginTop:4}}>{p.year}</div>
              </div>
              <p style={{margin:'0 0 22px', fontFamily:'var(--font-pixel-body)', fontSize:21, lineHeight:1.4, color:'var(--dim)'}}>{p.desc[lang]}</p>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {p.stack.map(s=>(
                  <span key={s} style={{
                    fontFamily:'var(--font-pixel)', fontSize:8, letterSpacing:'0.1em',
                    padding:'5px 8px', border:`2px solid var(--${p.color})`, color:'var(--ink)',
                  }}>{s}</span>
                ))}
              </div>
              <div style={{marginTop:22, paddingTop:14, borderTop:'2px dashed var(--dim-2)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em'}}>{(i+1).toString().padStart(2,'0')} / 0{PROJECTS.length}</span>
                <span className="pixel-text" style={{fontSize:9, color:`var(--${p.color})`, letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:8}}>
                  {lang==='en'?'VISIT':'IR'} <PxArrow scale={2} color={`var(--${p.color})`}/>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Talks ----
function TalksSection({lang, accent}) {
  const t = COPY[lang];
  return (
    <section style={{padding:'72px 32px', background:'var(--paper-2)', borderTop:'4px solid var(--dim-2)', borderBottom:'4px solid var(--dim-2)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage5}</div>
            <h2 className="sec-title">{t.talksTitle} <em style={{color:accent}}>{t.talksTitleEm}</em></h2>
            <p className="sec-sub">{t.talksSub}</p>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:0, border:'4px solid var(--ink)', background:'var(--paper)'}}>
          {TALKS.map((tk,i)=>(
            <div key={tk.id} style={{
              display:'grid', gridTemplateColumns:'90px 110px 1fr 180px', gap:20,
              padding:'18px 24px', alignItems:'center',
              borderBottom: i<TALKS.length-1 ? '2px dashed var(--dim-2)' : 'none',
            }}>
              <div className="pixel-text" style={{fontSize:9, color:`var(--${tk.color})`, letterSpacing:'0.15em'}}>{tk.kind}</div>
              <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em'}}>{tk.date[lang]}</div>
              <div>
                <div style={{fontFamily:'var(--font-pixel-body)', fontSize:22, color:'var(--ink)', lineHeight:1.3}}>{tk.title[lang]}</div>
                <div className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.15em', marginTop:6}}>@ {tk.where.toUpperCase()}</div>
              </div>
              <div className="pixel-text" style={{fontSize:9, color:'var(--ink)', letterSpacing:'0.05em', textAlign:'right'}}>{tk.meta[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Videos ----
function VideosSection({lang, accent}) {
  const t = COPY[lang];
  return (
    <section id="videos" style={{padding:'72px 32px'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage6}</div>
            <h2 className="sec-title">{t.videosTitle} <em style={{color:accent}}>{t.videosTitleEm}</em></h2>
          </div>
          <a className="px-link pixel-text" href="https://youtube.com/@ElFrontend" target="_blank" rel="noreferrer" style={{fontSize:10, letterSpacing:'0.2em'}}>
            {t.videoCta} <PxArrow scale={2}/>
          </a>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:18}}>
          {VIDEOS.map((v,i)=>(
            <a key={v.id} href={v.yt.startsWith('react')?'#':"https://youtube.com/watch?v="+v.yt} target="_blank" rel="noreferrer"
              className="pcard"
              onClick={()=>playCoin()}
              style={{textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column'}}>
              <div style={{position:'relative', aspectRatio:'16/10', overflow:'hidden', background:'#000', borderBottom:'3px solid var(--ink)'}}>
                <img src={v.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.15) contrast(1.05)'}}/>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0 1px, transparent 1px 3px)', pointerEvents:'none'}}/>
                {/* play badge */}
                <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <div style={{width:46, height:46, background:'var(--ink)', border:'3px solid #000', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <PxArrow scale={3} color="#000"/>
                  </div>
                </div>
                {/* duration */}
                <div style={{position:'absolute', bottom:6, right:6, background:'#000', color:'var(--ink)', padding:'3px 7px', fontFamily:'var(--font-pixel)', fontSize:8, border:'2px solid var(--ink)'}}>{v.duration}</div>
                {v.new && (
                  <div style={{position:'absolute', top:6, left:6, background:'var(--hot-red)', color:'#000', padding:'3px 7px', fontFamily:'var(--font-pixel)', fontSize:8, border:'2px solid #000', letterSpacing:'0.1em'}}>
                    {lang==='en'?'NEW':'NUEVO'}
                  </div>
                )}
                <div style={{position:'absolute', top:6, right:6, background:'var(--hot-yellow)', color:'#000', padding:'3px 7px', fontFamily:'var(--font-pixel)', fontSize:8, border:'2px solid #000'}}>
                  #{(i+1).toString().padStart(2,'0')}
                </div>
              </div>
              <div style={{padding:'14px 14px 16px', flex:1, display:'flex', flexDirection:'column'}}>
                <div style={{fontFamily:'var(--font-pixel-body)', fontSize:20, lineHeight:1.25, color:'var(--ink)', flex:1}}>{v.title[lang]}</div>
                <div className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.15em', marginTop:10}}>{v.meta.toUpperCase()}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Blog ----
function BlogSection({lang, accent}) {
  const t = COPY[lang];
  return (
    <section id="blog" style={{padding:'72px 32px', background:'var(--paper-2)', borderTop:'4px solid var(--dim-2)', borderBottom:'4px solid var(--dim-2)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage7}</div>
            <h2 className="sec-title">{t.blogTitle} <em style={{color:accent}}>{t.blogTitleEm}</em></h2>
            <p className="sec-sub">{t.blogSub}</p>
          </div>
          <a className="px-link pixel-text" href="blog.html" onClick={()=>playClick()} style={{fontSize:10, letterSpacing:'0.2em'}}>
            {t.blogCta} <PxArrow scale={2}/>
          </a>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
          {BLOG.map((b,i)=>(
            <a key={b.id} href={"blog-post.html?slug="+b.slug}
              onClick={()=>playCoin()}
              className="pcard"
              style={{textDecoration:'none', color:'inherit', display:'flex', flexDirection:'column', background:'var(--paper)'}}>
              <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden', background:'#000', borderBottom:'3px solid var(--ink)'}}>
                <img src={b.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.05)'}}/>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)'}}/>
                <div style={{position:'absolute', top:8, left:8, background:'#000', color:'var(--hot-yellow)', padding:'4px 7px', fontFamily:'var(--font-pixel)', fontSize:8, letterSpacing:'0.15em', border:'2px solid var(--hot-yellow)'}}>{b.tag.toUpperCase()}</div>
              </div>
              <div style={{padding:'18px 18px 18px', flex:1, display:'flex', flexDirection:'column'}}>
                <div className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.18em', marginBottom:10}}>{b.date[lang].toUpperCase()} · {b.read}</div>
                <div style={{fontFamily:'var(--font-pixel-body)', fontSize:22, lineHeight:1.25, color:'var(--ink)', flex:1}}>{b.title[lang]}</div>
                <div style={{marginTop:16, paddingTop:12, borderTop:'2px dashed var(--dim-2)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span className="pixel-text" style={{fontSize:8, color:'var(--dim)', letterSpacing:'0.15em'}}>#{(i+1).toString().padStart(3,'0')}</span>
                  <span className="pixel-text" style={{fontSize:9, color:accent, letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:6}}>
                    {lang==='en'?'READ':'LEER'} <PxArrow scale={2} color={accent}/>
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

// ---- Terminal section wrapper ----
function TerminalSection({lang, accent, difficulty}) {
  const t = COPY[lang];
  return (
    <section style={{padding:'72px 32px'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage8}</div>
            <h2 className="sec-title">{t.terminalTitle} <em style={{color:accent}}>{t.terminalTitleEm}</em></h2>
            <p className="sec-sub">{t.terminalSub}</p>
          </div>
        </div>
        <ArcadeTerminal lang={lang} accent={accent} difficulty={difficulty}/>
      </div>
    </section>
  );
}

// ---- Contact form ----
function ContactSection({lang, accent}) {
  const t = COPY[lang];
  const [form, setForm] = React.useState({ name:'', email:'', kind:t.contactKinds[0], message:'' });
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    playPowerUp();
    setSent(true);
  };
  const reset = () => { setSent(false); setForm({ name:'', email:'', kind:t.contactKinds[0], message:'' }); };

  return (
    <section id="contact" style={{padding:'72px 32px', background:'var(--paper-2)', borderTop:'4px solid var(--dim-2)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage"><PxArrow scale={2} color="var(--hot-yellow)"/> {t.stage9}</div>
            <h2 className="sec-title">{t.contactTitle} <em style={{color:accent}}>{t.contactTitleEm}</em></h2>
            <p className="sec-sub">{t.contactSub}</p>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <PxMushroom scale={3}/>
            <PxTrophy scale={3} color="var(--hot-yellow)"/>
          </div>
        </div>

        {sent ? (
          <div style={{
            padding:'52px 32px', textAlign:'center',
            background:'var(--paper)', border:'4px solid var(--hot-green)',
            boxShadow:'6px 6px 0 var(--brand)',
            maxWidth:640, margin:'0 auto',
          }}>
            <div style={{display:'inline-flex', gap:8, marginBottom:18}}>
              <PxStar scale={4}/><PxStar scale={4}/><PxStar scale={4}/>
            </div>
            <div className="pixel-text" style={{fontSize:18, color:'var(--hot-green)', letterSpacing:'0.1em', marginBottom:14}}>{t.contactSent}</div>
            <p style={{margin:'0 0 24px', fontFamily:'var(--font-pixel-body)', fontSize:21, color:'var(--ink)'}}>
              {lang==='en'?"Carlos will reply within 1–2 days. Thanks for playing! 🎮":"Carlos te responderá en 1–2 días. ¡Gracias por jugar! 🎮"}
            </p>
            <button onClick={reset} style={{
              background:'transparent', color:'var(--ink)', border:'3px solid var(--ink)',
              padding:'12px 20px', fontFamily:'var(--font-pixel)', fontSize:10, letterSpacing:'0.15em', cursor:'pointer',
            }}>{lang==='en'?'PLAY AGAIN':'JUGAR DE NUEVO'}</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{
            maxWidth:720, margin:'0 auto',
            background:'var(--paper)', border:'4px solid var(--ink)',
            boxShadow:'8px 8px 0 var(--brand-deep)',
            padding:36,
            display:'flex', flexDirection:'column', gap:22,
          }}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:22}}>
              <FormField label={t.contactName} required>
                <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
                  onKeyDown={e=>e.key.length===1 && playType()}
                  placeholder="P1" style={fieldStyle(accent)}/>
              </FormField>
              <FormField label={t.contactEmail} required>
                <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
                  onKeyDown={e=>e.key.length===1 && playType()}
                  placeholder="hi@your.email" style={fieldStyle(accent)}/>
              </FormField>
            </div>
            <FormField label={t.contactKind}>
              <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
                {t.contactKinds.map(k=>(
                  <button key={k} type="button" onClick={()=>{ setForm({...form, kind:k}); playClick(); }}
                    style={{
                      background: form.kind===k?accent:'transparent',
                      color: form.kind===k?'#000':'var(--ink)',
                      border:`3px solid ${form.kind===k?accent:'var(--dim-2)'}`,
                      padding:'10px 14px',
                      fontFamily:'var(--font-pixel)', fontSize:9, letterSpacing:'0.12em',
                      cursor:'pointer',
                    }}>{k.toUpperCase()}</button>
                ))}
              </div>
            </FormField>
            <FormField label={t.contactMessage} required>
              <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})}
                onKeyDown={e=>e.key.length===1 && playType()}
                placeholder={lang==='en'?'Tell Carlos a little about it…':'Cuéntale a Carlos un poco…'}
                rows={5}
                style={{...fieldStyle(accent), resize:'vertical', minHeight:120, lineHeight:1.4}}/>
            </FormField>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:18, flexWrap:'wrap'}}>
              <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:10}}>
                <PxHeart scale={2}/>{lang==='en'?'NO SPAM · NEVER':'SIN SPAM · NUNCA'}
              </div>
              <button type="submit" style={{
                background:accent, color:'#000', border:'4px solid var(--ink)',
                padding:'14px 26px', fontFamily:'var(--font-pixel)', fontSize:11, letterSpacing:'0.15em',
                cursor:'pointer', boxShadow:'4px 4px 0 var(--brand-deep)',
                display:'inline-flex', alignItems:'center', gap:10,
              }}>
                <PxArrow scale={2} color="#000"/> {t.contactSend}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({label, required, children}) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap:10}}>
      <span className="pixel-text" style={{fontSize:9, color:'var(--hot-yellow)', letterSpacing:'0.2em'}}>
        {label} {required && <span style={{color:'var(--hot-red)'}}>*</span>}
      </span>
      {children}
    </label>
  );
}
const fieldStyle = (accent) => ({
  background:'#000', color:'var(--ink)',
  border:`3px solid var(--dim-2)`, padding:'12px 14px',
  fontFamily:'var(--font-pixel-body)', fontSize:22, outline:'none',
  caretColor: accent,
});

// ---- Footer ----
function Footer({lang, t}) {
  return (
    <footer style={{padding:'40px 32px 32px'}}>
      <div className="container" style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, alignItems:'center',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <span style={{display:'inline-flex', gap:5}}>
            <PxStar scale={2}/><PxStar scale={2}/><PxStar scale={2}/>
          </span>
          <span className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.18em'}}>{t.footerLeft}</span>
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:20, alignItems:'center'}}>
          {SOCIALS.map(s=>(
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" title={s.label}
              onMouseEnter={()=>playHover()}
              style={{color:'var(--ink)', transition:'color 0.2s, transform 0.12s steps(2)', display:'inline-flex'}}
              onMouseOver={e=>{ e.currentTarget.style.color=`var(--${s.color})`; e.currentTarget.style.transform='translate(-1px,-1px)'; }}
              onMouseOut={e=>{ e.currentTarget.style.color='var(--ink)'; e.currentTarget.style.transform='none'; }}
            >
              <PxSocial id={s.id} scale={3}/>
            </a>
          ))}
        </div>
        <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.18em', display:'flex', alignItems:'center', justifyContent:'flex-end', gap:10}}>
          {t.footerRight} <PxCoin scale={3}/>
        </div>
      </div>
      <div className="container" style={{marginTop:24, paddingTop:18, borderTop:'4px dashed var(--dim-2)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:14, flexWrap:'wrap'}}>
        <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.18em', display:'inline-flex', alignItems:'center', gap:10}}>
          <PxController scale={2}/> {t.cheatLabel}: <span style={{color:'var(--hot-yellow)'}}>{t.cheatHint}</span>
        </div>
        <div className="pixel-text" style={{fontSize:9, color:'var(--dim)', letterSpacing:'0.18em', display:'inline-flex', alignItems:'center', gap:10}}>
          <PxFloppy scale={2}/> {lang==='en'?'BUILT WITH HTML · CSS · JS · ♥':'HECHO CON HTML · CSS · JS · ♥'}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  StatusBar, Nav, HeroSection, StatsStrip, AboutSection,
  SkillsSection, ProjectsSection, TalksSection, VideosSection, BlogSection,
  TerminalSection, ContactSection, Footer,
});
