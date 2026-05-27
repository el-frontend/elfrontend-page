// ============================================================
// arcade-chat.jsx — Working AI chat (powered by Claude)
// ============================================================

const SYSTEM_PROMPT_BASE = `You are the AI twin of Carlos Chao Cortes — a Cuban software architect, React/Next.js educator and founder of the ElFrontend community (elfrontend.com, @ElFrontend on YouTube with 42K subscribers).

You answer questions about Carlos in the THIRD PERSON ("Carlos has 10+ years of experience…", "Carlos lives in Madrid…"). Be warm, conversational, knowledgeable, slightly playful. Never corporate. Keep responses concise — 2-4 short paragraphs max. Don't use long bullet lists.

Facts you know about Carlos:
- Cuban, based in Madrid, Spain
- 10+ years building for the web (startups, agencies, big companies)
- Teaches React & Next.js on YouTube (@ElFrontend, 42.1K subs, 187 videos)
- Runs the ElFrontend community for Spanish-speaking developers
- Stack: React, Next.js, TypeScript, Tailwind, Node, Postgres
- Recent videos: "Mi Framework de Desarrollo con IA (2026)", videos about React 19 SSR
- Recent blog posts: "Build Web Video Wizard" (built his own AI video tool), "Best practices for React Server Components in React 19", "Software design patterns"
- Pet projects: Web Video Wizard (AI video trimming tool), elfrontend.com
- Open to consulting work and mentoring
- Personality: teacher first, builder second. Likes coffee (cortado), Spanish + English bilingual.

If user writes in Spanish, reply in Spanish. If English, reply English. If unclear, mirror their language.
Keep responses under 120 words.`;

const SYSTEM_PROMPT_DIFF = {
  easy: "Use friendly, warm, beginner-friendly tone. Explain context.",
  medium: "Use conversational, balanced tone. Default voice.",
  hard: "Use terse, hacker-style tone. Drop articles where natural. No exclamation points. Lowercase preferred.",
};

const ArcadeChat = ({lang, accent='var(--brand)', difficulty='medium', onCoin}) => {
  const t = COPY[lang];
  const [msgs, setMsgs] = React.useState([
    { role:'bot', text: lang==='en'
      ? "Hi! I'm Carlos's AI twin. Ask me anything about his work, videos or opinions — I'll do my best."
      : "¡Hola! Soy el gemelo IA de Carlos. Pregúntame lo que quieras sobre su trabajo, videos u opiniones." }
  ]);
  const [val, setVal] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [coins, setCoins] = React.useState([]);
  const bodyRef = React.useRef(null);

  React.useEffect(()=>{
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, busy]);

  const fireCoin = (x, y) => {
    const id = Date.now()+Math.random();
    setCoins(c => [...c, {id, x, y}]);
    setTimeout(()=>setCoins(c=>c.filter(k=>k.id!==id)), 850);
    if (onCoin) onCoin();
    playCoin();
  };

  const send = async (questionOverride) => {
    const q = (questionOverride ?? val).trim();
    if (!q || busy) return;
    setVal('');
    setMsgs(prev => [...prev, {role:'user', text:q}]);
    setBusy(true);
    playSend();

    const history = [...msgs, {role:'user', text:q}].map(m => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text,
    }));

    const system = SYSTEM_PROMPT_BASE + '\n\n' + SYSTEM_PROMPT_DIFF[difficulty];

    try {
      const text = await window.claude.complete({ system, messages: history });
      setMsgs(prev => [...prev, {role:'bot', text}]);
      // coins on a successful answer
      fireCoin(Math.random()*200+200, Math.random()*100+50);
    } catch (e) {
      setMsgs(prev => [...prev, {role:'bot', text: lang==='en'
        ? "Whoops — connection error. Try again?"
        : "Ups — error de conexión. ¿Intenta de nuevo?"
      }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{position:'relative'}}>
      {/* Floating coins on success */}
      {coins.map(c => <FloatingCoin key={c.id} left={c.x} top={c.y}/>)}

      {/* PRESS START hint */}
      <div style={{
        textAlign:'center',
        fontFamily:'var(--font-pixel)', fontSize:11,
        color:'var(--hot-yellow)', letterSpacing:'0.3em',
        marginBottom:18, animation:'blink 1.6s steps(2) infinite',
      }}>
        ▼ {t.pressStart} ▼
      </div>

      {/* Chat panel — TV/CRT styled */}
      <div style={{
        background:'#000', border:`4px solid var(--ink)`,
        boxShadow:'8px 8px 0 0 var(--brand-deep)',
        maxWidth:880, margin:'0 auto', position:'relative',
      }}>
        {/* "screen" inner */}
        <div style={{
          background:'#000', padding:'18px 22px 0',
          borderBottom:`2px dashed var(--dim-2)`,
          display:'flex', alignItems:'center', gap:14,
        }}>
          <span style={{display:'inline-block', width:12, height:12, background:'var(--hot-green)', boxShadow:'0 0 8px var(--hot-green)'}}/>
          <span style={{fontFamily:'var(--font-pixel)', fontSize:9, color:'var(--ink)', letterSpacing:'0.18em'}}>
            AI · ONLINE · CLAUDE-HAIKU
          </span>
          <span style={{marginLeft:'auto', fontFamily:'var(--font-pixel)', fontSize:9, color:'var(--dim)', letterSpacing:'0.15em', display:'inline-flex', alignItems:'center', gap:8, paddingBottom:12}}>
            <PxHeart scale={2} color="var(--hot-pink)"/> 3 / 3
          </span>
        </div>

        {/* messages */}
        <div ref={bodyRef} style={{
          padding:'20px 22px',
          minHeight:200, maxHeight:340, overflowY:'auto',
          display:'flex', flexDirection:'column', gap:14,
        }}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:'flex', gap:10, justifyContent: m.role==='user'?'flex-end':'flex-start'}}>
              {m.role==='bot' && (
                <div style={{flexShrink:0, padding:4, border:'2px solid var(--brand)', background:'var(--paper-2)'}}>
                  <PxAvatar scale={2} bg="#000" shirt={accent}/>
                </div>
              )}
              <div style={{
                maxWidth:'78%',
                padding:'10px 14px',
                background: m.role==='user' ? accent : 'transparent',
                border: m.role==='user' ? 'none' : '2px solid var(--dim-2)',
                color: m.role==='user' ? '#000' : 'var(--ink)',
                fontFamily:'var(--font-pixel-body)', fontSize:19, lineHeight:1.35,
              }}>{m.text}</div>
              {m.role==='user' && (
                <div style={{flexShrink:0, width:32, height:32, background:accent, color:'#000', display:'inline-flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-pixel)', fontSize:10, fontWeight:700}}>P1</div>
              )}
            </div>
          ))}
          {busy && (
            <div style={{display:'flex', gap:10, justifyContent:'flex-start'}}>
              <div style={{flexShrink:0, padding:4, border:'2px solid var(--brand)', background:'var(--paper-2)'}}>
                <PxAvatar scale={2} bg="#000" shirt={accent}/>
              </div>
              <div style={{padding:'10px 14px', border:'2px solid var(--dim-2)', fontFamily:'var(--font-pixel)', fontSize:11, color:'var(--hot-yellow)', letterSpacing:'0.15em', display:'inline-flex', gap:8, alignItems:'center'}}>
                LOADING <span style={{display:'inline-flex', gap:3}}>
                  <span style={{width:6, height:6, background:'var(--hot-yellow)', animation:'blink 0.6s steps(2) infinite'}}/>
                  <span style={{width:6, height:6, background:'var(--hot-yellow)', animation:'blink 0.6s steps(2) infinite', animationDelay:'0.15s'}}/>
                  <span style={{width:6, height:6, background:'var(--hot-yellow)', animation:'blink 0.6s steps(2) infinite', animationDelay:'0.3s'}}/>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <div style={{
          display:'flex', alignItems:'center',
          background:'#000', borderTop:'4px solid var(--ink)',
          padding:'4px 4px 4px 16px',
        }}>
          <span style={{color:accent, fontFamily:'var(--font-mono)', fontSize:18, fontWeight:700, marginRight:8}}>{'>'}</span>
          <input
            placeholder={t.askPlaceholder}
            value={val}
            disabled={busy}
            onChange={e=>setVal(e.target.value)}
            onKeyDown={e=>{
              if (e.key==='Enter') send();
              else if (e.key.length===1) playType();
            }}
            style={{
              flex:1, background:'transparent', border:0, outline:'none',
              color:'var(--ink)',
              fontFamily:'var(--font-pixel-body)', fontSize:22,
              padding:'12px 0', caretColor: accent,
            }}
          />
          <button onClick={()=>send()} disabled={busy} style={{
            background:accent, border:'3px solid var(--ink)', color:'#000',
            padding:'12px 22px', cursor: busy?'not-allowed':'pointer',
            fontFamily:'var(--font-pixel)', fontSize:11, letterSpacing:'0.15em',
            display:'flex', alignItems:'center', gap:8, opacity:busy?0.5:1,
          }}>
            <PxArrow scale={2} color="#000"/> {t.startBtn}
          </button>
        </div>
      </div>

      {/* prompt chips */}
      <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:22, justifyContent:'center', maxWidth:880, marginLeft:'auto', marginRight:'auto'}}>
        {t.chips.map((c,i)=>(
          <button key={i} onClick={()=>{ playClick(); send(c); }} style={{
            background:'transparent', color:'var(--dim)',
            border:'3px solid var(--dim-2)',
            padding:'10px 14px',
            fontFamily:'var(--font-pixel-body)', fontSize:18,
            cursor:'pointer',
            letterSpacing:'0.02em',
            transition: 'all 0.12s',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=accent; e.currentTarget.style.color='var(--ink)'; playHover(); }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--dim-2)'; e.currentTarget.style.color='var(--dim)'; }}
          >{c}</button>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ArcadeChat });
