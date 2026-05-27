// ============================================================
// arcade-app.jsx — Root app, state, Tweaks panel, boot
// ============================================================

// TWEAK_DEFAULTS, ACCENT_OPTIONS, FONT_SETS, arcadeBoot all come
// from arcade-shared.jsx (loaded before this file).

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentDef = ACCENT_OPTIONS.find(a => a.key === t.accent) || ACCENT_OPTIONS[0];
  const accent = accentDef.color;
  const lang = t.lang;
  const difficulty = t.difficulty;

  const [lives] = React.useState(3);
  const [konami, setKonami] = React.useState(false);
  const [coinCounter, setCoinCounter] = React.useState(0);

  // Apply CSS variables from accent (live)
  React.useEffect(()=>{
    document.documentElement.style.setProperty('--brand', accentDef.color);
    document.documentElement.style.setProperty('--brand-deep', accentDef.deep);
  }, [accentDef]);

  // Apply font set
  React.useEffect(()=>{
    const f = FONT_SETS[t.fontSet] || FONT_SETS.mixed;
    document.documentElement.style.setProperty('--font-pixel', f.display);
    document.documentElement.style.setProperty('--font-pixel-body', f.body);
    document.documentElement.style.setProperty('--font-pixel-ui', f.ui);
  }, [t.fontSet]);

  // CRT toggle
  React.useEffect(()=>{
    document.body.classList.toggle('crt-on', !!t.scanlines);
    document.body.classList.toggle('crt-off', !t.scanlines);
  }, [t.scanlines]);

  // Sound
  React.useEffect(()=>{ setSoundEnabled(!!t.sound); }, [t.sound]);

  // Konami listener
  useKonami(() => {
    setKonami(true);
    playFanfare();
    // toggle to a fun "rainbow" accent? cycle accents
    const idx = ACCENT_OPTIONS.findIndex(a=>a.key===t.accent);
    const next = ACCENT_OPTIONS[(idx+1) % ACCENT_OPTIONS.length];
    setTweak('accent', next.key);
  });

  const txt = COPY[lang];

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
      <Nav lang={lang} setLang={(v)=>setTweak('lang', v)}/>
      <HeroSection lang={lang} accent={accent} difficulty={difficulty}
        onCoin={()=>setCoinCounter(c=>c+1)}/>
      <StatsStrip lang={lang}/>
      <AboutSection lang={lang} accent={accent} difficulty={difficulty}/>
      <SkillsSection lang={lang} accent={accent}/>
      <ProjectsSection lang={lang} accent={accent}/>
      <TalksSection lang={lang} accent={accent}/>
      <VideosSection lang={lang} accent={accent}/>
      <BlogSection lang={lang} accent={accent}/>
      <TerminalSection lang={lang} accent={accent} difficulty={difficulty}/>
      <ContactSection lang={lang} accent={accent}/>
      <Footer lang={lang} t={txt}/>

      <WalkingSprite accent={accent}/>

      <TweaksPanel title="Tweaks · Arcade">
        <TweakSection label="Accent"/>
        <TweakColor
          label="Color"
          value={accentDef.color}
          options={ACCENT_OPTIONS.map(a=>a.color)}
          onChange={(c)=>{
            const found = ACCENT_OPTIONS.find(a=>a.color===c);
            if (found) setTweak('accent', found.key);
          }}
        />

        <TweakSection label="Difficulty"/>
        <TweakRadio
          label="Mode"
          value={t.difficulty}
          options={['easy','medium','hard']}
          onChange={(v)=>setTweak('difficulty', v)}
        />

        <TweakSection label="Typography"/>
        <TweakSelect
          label="Font set"
          value={t.fontSet}
          options={[
            {value:'mixed', label:'Mixed (Press Start + VT323)'},
            {value:'starpress', label:'All Press Start 2P'},
            {value:'vt323', label:'VT323 only'},
            {value:'silkscreen', label:'Silkscreen + VT323'},
          ]}
          onChange={(v)=>setTweak('fontSet', v)}
        />

        <TweakSection label="Display"/>
        <TweakToggle label="CRT scanlines" value={t.scanlines} onChange={(v)=>setTweak('scanlines', v)}/>
        <TweakToggle label="Sound effects" value={t.sound} onChange={(v)=>setTweak('sound', v)}/>

        <TweakSection label="Language"/>
        <TweakRadio
          label="Lang"
          value={t.lang}
          options={['en','es']}
          onChange={(v)=>setTweak('lang', v)}
        />
      </TweaksPanel>
    </>
  );
}

// Boot then render
arcadeBoot(App);
