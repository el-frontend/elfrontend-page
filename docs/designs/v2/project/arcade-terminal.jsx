// ============================================================
// arcade-terminal.jsx — Working pixel terminal
// ============================================================

const BANNER_LINES = [
  '███████╗██╗     ███████╗██████╗  ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗██████╗',
  '██╔════╝██║     ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║██╔══██╗',
  '█████╗  ██║     █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║██║  ██║',
  '██╔══╝  ██║     ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║██║  ██║',
  '███████╗███████╗██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║██████╔╝',
  '╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═════╝',
];

// Terminal output line: text or React node
function makeOut(content, color) { return { content, color }; }

const ArcadeTerminal = ({lang, accent, difficulty}) => {
  const t = COPY[lang];
  const [lines, setLines] = React.useState(() => initial(lang));
  const [val, setVal] = React.useState('');
  const [cwd, setCwd] = React.useState('/');
  const [history, setHistory] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  function initial(lang) {
    return [
      ...BANNER_LINES.map(l => makeOut(l, 'var(--brand)')),
      makeOut('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'var(--dim-2)'),
      makeOut(lang==='en' ? "Welcome to ElFrontend Arcade Terminal v2.0" : "Bienvenido a ElFrontend Arcade Terminal v2.0", 'var(--hot-yellow)'),
      makeOut(lang==='en' ? "Type 'help' for available commands. Try 'whoami', 'ls', 'projects', 'skills'." : "Escribe 'help' para ver los comandos. Prueba 'whoami', 'ls', 'projects', 'skills'.", 'var(--dim)'),
      makeOut('', null),
    ];
  }

  // Filesystem
  const FS = {
    "/": ["projects/", "skills/", "videos/", "blog/", "about.txt", "contact.txt"],
    "/projects": PROJECTS.map(p => p.name.toLowerCase().replace(/[^a-z]/g,'-')+'.md'),
    "/skills": SKILL_GROUPS.map(g => g.id+'/'),
    "/skills/lang": SKILL_GROUPS[0].skills.map(s=>s.name.toLowerCase()),
    "/skills/fw":   SKILL_GROUPS[1].skills.map(s=>s.name.toLowerCase()),
    "/skills/tools":SKILL_GROUPS[2].skills.map(s=>s.name.toLowerCase()),
    "/skills/soft": SKILL_GROUPS[3].skills.map(s=>s.name.toLowerCase()),
    "/videos": VIDEOS.map(v => v.id+'.mp4'),
    "/blog":   BLOG.map(b => b.slug+'.mdx'),
  };

  const push = (newLines) => setLines(prev => [...prev, ...newLines]);
  const echo = (text, color=null) => push([makeOut(text, color)]);
  const blank = () => push([makeOut('', null)]);

  const printHelp = () => {
    const cmds = [
      ['help',       lang==='en'?"this list (you're looking at it)":"esta lista (estás viéndola)"],
      ['whoami',     lang==='en'?"who runs this place":"quién está al mando"],
      ['ls',         lang==='en'?"list current directory":"listar directorio actual"],
      ['cd <dir>',   lang==='en'?"change directory (try /projects, /skills)":"cambiar directorio"],
      ['pwd',        lang==='en'?"current path":"ruta actual"],
      ['cat <file>', lang==='en'?"read a file":"leer un archivo"],
      ['projects',   lang==='en'?"my pet projects":"mis proyectos personales"],
      ['skills',     lang==='en'?"my skill tree":"mi árbol de skills"],
      ['videos',     lang==='en'?"latest YouTube videos":"últimos videos de YouTube"],
      ['blog',       lang==='en'?"recent blog posts":"posts recientes del blog"],
      ['about',      lang==='en'?"about Carlos":"sobre Carlos"],
      ['contact',    lang==='en'?"how to reach me":"cómo contactarme"],
      ['stack',      lang==='en'?"my current stack":"mi stack actual"],
      ['now',        lang==='en'?"what I'm working on":"en qué estoy trabajando"],
      ['snake',      lang==='en'?"play snake (coming soon)":"jugar snake (próximamente)"],
      ['wordle',     lang==='en'?"play wordle (coming soon)":"jugar wordle (próximamente)"],
      ['date',       lang==='en'?"current date":"fecha actual"],
      ['clear',      lang==='en'?"clear the screen":"limpiar la pantalla"],
      ['konami',     lang==='en'?"↑↑↓↓←→←→BA":"↑↑↓↓←→←→BA"],
    ];
    const rows = cmds.map(([c,d]) => makeOut(
      <span><span style={{color:'var(--brand)', fontWeight:700}}>{c.padEnd(12,' ')}</span> <span style={{color:'var(--dim)'}}>{d}</span></span>
    , null));
    return rows;
  };

  const printProjects = () => {
    return PROJECTS.flatMap(p => [
      makeOut(<span><span style={{color:tokenColor(p.color)}}>▸</span> <strong style={{color:'var(--ink)'}}>{p.name}</strong> <span style={{color:'var(--dim)'}}>({p.year})</span> — <span style={{color:'var(--hot-yellow)'}}>{p.tag[lang]}</span></span>, null),
      makeOut('  '+p.desc[lang], 'var(--dim)'),
      makeOut('  '+lang==='en'?'stack: ':'stack: '+p.stack.join(' · '), 'var(--dim-2)'),
      makeOut('', null),
    ]);
  };

  const printSkills = () => {
    return SKILL_GROUPS.flatMap(g => [
      makeOut(<span style={{color:tokenColor(g.color)}}>━━━ {g.name[lang]} ━━━</span>, null),
      ...g.skills.map(s=>{
        const bar = '█'.repeat(s.level) + '░'.repeat(3 - s.level);
        return makeOut(<span><span style={{color:tokenColor(g.color)}}>{bar}</span> <span style={{color:'var(--ink)'}}>{s.name.padEnd(16,' ')}</span><span style={{color:'var(--dim)'}}>{s.years}</span></span>, null);
      }),
      makeOut('', null),
    ]);
  };

  const printVideos = () => {
    return VIDEOS.map((v,i) => makeOut(
      <span>
        <span style={{color:'var(--hot-yellow)'}}>[{(i+1).toString().padStart(2,'0')}]</span>{' '}
        <a href={"https://youtube.com/watch?v="+v.yt} target="_blank" rel="noreferrer" style={{color:'var(--ink)', borderBottom:'2px solid var(--hot-pink)'}}>▶ {v.title[lang]}</a>{' '}
        <span style={{color:'var(--dim)'}}>{v.meta}</span>
      </span>, null
    ));
  };

  const printBlog = () => {
    return BLOG.map((b,i) => makeOut(
      <span>
        <span style={{color:'var(--brand)'}}>[{(i+1).toString().padStart(2,'0')}]</span>{' '}
        <a href={"https://elfrontend.com/blog/"+b.slug} target="_blank" rel="noreferrer" style={{color:'var(--ink)', borderBottom:'2px solid var(--hot-blue)'}}>{b.title[lang]}</a>{' '}
        <span style={{color:'var(--dim)'}}>· {b.date[lang]} · {b.read}</span>
      </span>, null
    ));
  };

  const printAbout = () => {
    return [
      makeOut(`Carlos Chao Cortes — @ElFrontend`, 'var(--brand)'),
      makeOut('━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'var(--dim-2)'),
      makeOut(t.aboutBody[difficulty], 'var(--ink)'),
      makeOut('', null),
      makeOut(lang==='en'?'Currently:':'Actualmente:', 'var(--hot-yellow)'),
      ...t.nowList[difficulty].map(n => makeOut('  • '+n, 'var(--dim)')),
      makeOut('', null),
    ];
  };

  const printStack = () => {
    const s = ["React", "Next.js 16", "TypeScript", "Tailwind v4", "Node", "Postgres", "tRPC", "Vercel", "shadcn/ui", "Motion"];
    return [
      makeOut(lang==='en'?'Daily-driver stack:':'Stack diario:', 'var(--hot-yellow)'),
      makeOut(s.map(x=>'['+x+']').join(' '), 'var(--brand)'),
      makeOut('', null),
    ];
  };

  const printContact = () => {
    return [
      makeOut(lang==='en'?'Reach out at any of these:':'Encuéntrame en:', 'var(--hot-yellow)'),
      ...SOCIALS.map(s => makeOut(
        <span><span style={{color:tokenColor(s.color)}}>▸</span> {s.label.padEnd(11,' ')} <a href={s.href} target="_blank" rel="noreferrer" style={{color:'var(--ink)', borderBottom:'2px dotted var(--dim)'}}>{s.href.replace('https://','')}</a></span>, null
      )),
      makeOut('', null),
      makeOut(lang==='en'?'Or scroll down to the contact form 🕹️':'O baja al formulario de contacto 🕹️', 'var(--dim)'),
      makeOut('', null),
    ];
  };

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory(h => [...h, cmd]); setHistIdx(-1);

    // echo prompt
    push([makeOut(<span><span style={{color:'var(--hot-pink)'}}>carlos@elfrontend</span><span style={{color:'var(--dim)'}}>:</span><span style={{color:'var(--hot-blue)'}}>{cwd}</span><span style={{color:'var(--dim)'}}>$</span> {cmd}</span>, null)]);

    const [c, ...args] = cmd.split(/\s+/);

    switch(c.toLowerCase()) {
      case 'help': push(printHelp()); blank(); break;
      case 'whoami': echo('Carlos Chao Cortes — @ElFrontend', 'var(--brand)'); blank(); break;
      case 'pwd': echo(cwd, 'var(--hot-blue)'); blank(); break;
      case 'ls': {
        const items = FS[cwd] || [];
        if (!items.length) echo(lang==='en'?'(empty)':'(vacío)', 'var(--dim)');
        else push(items.map(it => makeOut(<span style={{color: it.endsWith('/')?'var(--hot-green)':'var(--hot-blue)'}}>{it}</span>, null)));
        blank(); break;
      }
      case 'cd': {
        const target = args[0] || '/';
        let next = target;
        if (target === '..') {
          const parts = cwd.split('/').filter(Boolean); parts.pop();
          next = '/' + parts.join('/');
          if (next === '/') next = '/';
        } else if (!target.startsWith('/')) {
          next = (cwd === '/' ? '' : cwd) + '/' + target.replace(/\/$/,'');
        }
        if (FS[next]) { setCwd(next); echo(lang==='en'?'→ '+next:'→ '+next, 'var(--dim)'); }
        else echo((lang==='en'?'cd: no such directory: ':'cd: directorio no encontrado: ')+target, 'var(--hot-red)');
        blank(); break;
      }
      case 'cat': {
        const f = args[0]; if (!f) { echo('usage: cat <file>', 'var(--dim)'); blank(); break; }
        if (f.startsWith('about')) { push(printAbout()); break; }
        if (f.startsWith('contact')) { push(printContact()); break; }
        echo((lang==='en'?'cat: ':'cat: ')+f+(lang==='en'?': no such file':': archivo no existe'), 'var(--hot-red)');
        blank(); break;
      }
      case 'projects': push(printProjects()); break;
      case 'skills':   push(printSkills()); break;
      case 'videos':   push(printVideos()); blank(); break;
      case 'blog':     push(printBlog()); blank(); break;
      case 'about':    push(printAbout()); break;
      case 'contact':  push(printContact()); break;
      case 'stack':    push(printStack()); break;
      case 'now': {
        push(t.nowList[difficulty].map(n => makeOut('▸ '+n, 'var(--hot-green)')));
        blank(); break;
      }
      case 'date':
        echo(new Date().toString(), 'var(--hot-yellow)'); blank(); break;
      case 'clear': setLines([]); return;
      case 'snake': case 'wordle':
        echo(lang==='en'?`Loading ${c}…`:`Cargando ${c}…`, 'var(--hot-yellow)');
        setTimeout(()=>{
          push([
            makeOut(lang==='en'?'⚠ Game module not bundled in this prototype.':'⚠ Módulo de juego no incluido en este prototipo.', 'var(--hot-orange)'),
            makeOut(lang==='en'?"(In the real site, snake & wordle launch in a modal.)":"(En el sitio real, snake y wordle se abren en un modal.)", 'var(--dim)'),
            makeOut('', null),
          ]);
        }, 600);
        break;
      case 'konami':
        echo('↑ ↑ ↓ ↓ ← → ← → B A', 'var(--hot-yellow)');
        echo(lang==='en'?'(now actually type that on your keyboard)':'(ahora escríbelo en tu teclado)', 'var(--dim)');
        blank(); break;
      case 'sudo':
        echo(lang==='en'?'nice try.':'buen intento.', 'var(--hot-red)'); blank(); break;
      case 'rm':
        echo(lang==='en'?"can't delete the past, only learn from it.":"no se puede borrar el pasado, solo aprender de él.", 'var(--hot-pink)'); blank(); break;
      case 'exit':
        echo(lang==='en'?'(staying right here)':'(me quedo)', 'var(--dim)'); blank(); break;
      default:
        echo((lang==='en'?'command not found: ':'comando no encontrado: ')+c, 'var(--hot-red)');
        echo(lang==='en'?"type 'help' for the list.":"escribe 'help' para la lista.", 'var(--dim)');
        blank();
    }
  };

  React.useEffect(()=>{
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const onKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(val); setVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length-1 : Math.max(0, histIdx-1);
      setHistIdx(idx); setVal(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx+1;
      if (idx >= history.length) { setHistIdx(-1); setVal(''); }
      else { setHistIdx(idx); setVal(history[idx]); }
    } else if (e.key.length === 1) {
      playType();
    }
  };

  return (
    <div style={{
      background:'#000', border:'4px solid var(--ink)', boxShadow:'8px 8px 0 0 var(--hot-green)',
      maxWidth:1100, margin:'0 auto',
    }}>
      {/* terminal bar */}
      <div style={{
        background:'var(--paper-2)', padding:'10px 14px',
        borderBottom:'2px dashed var(--dim-2)',
        display:'flex', alignItems:'center', gap:10,
      }}>
        <span style={{display:'inline-flex', gap:6}}>
          <span style={{width:14, height:14, background:'var(--hot-red)', border:'2px solid #000'}}/>
          <span style={{width:14, height:14, background:'var(--hot-yellow)', border:'2px solid #000'}}/>
          <span style={{width:14, height:14, background:'var(--hot-green)', border:'2px solid #000'}}/>
        </span>
        <span style={{marginLeft:'auto', fontFamily:'var(--font-pixel)', fontSize:9, color:'var(--dim)', letterSpacing:'0.2em'}}>
          carlos@elfrontend ~ ARCADE-TERM
        </span>
      </div>
      <div
        ref={bodyRef}
        onClick={()=>inputRef.current && inputRef.current.focus()}
        style={{
          padding:'18px 22px', minHeight:420, maxHeight:520, overflowY:'auto',
          fontFamily:'var(--font-mono)', fontSize:14, lineHeight:1.45,
          color:'var(--ink)', cursor:'text',
        }}>
        {lines.map((l,i)=>(
          <div key={i} style={{color: l.color || 'inherit', whiteSpace:'pre-wrap', wordBreak:'break-word'}}>
            {l.content || '\u00a0'}
          </div>
        ))}
        {/* live input row */}
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <span style={{color:'var(--hot-pink)'}}>carlos@elfrontend</span>
          <span style={{color:'var(--dim)'}}>:</span>
          <span style={{color:'var(--hot-blue)'}}>{cwd}</span>
          <span style={{color:'var(--dim)'}}>$</span>
          <input
            ref={inputRef}
            value={val}
            onChange={e=>setVal(e.target.value)}
            onKeyDown={onKey}
            autoFocus
            style={{
              flex:1, background:'transparent', border:0, outline:'none',
              color:'var(--ink)', fontFamily:'var(--font-mono)', fontSize:14,
              caretColor: accent,
            }}
          />
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ArcadeTerminal });
