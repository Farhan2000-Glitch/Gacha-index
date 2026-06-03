'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';

// ─────────────────────────────────────────────────────────── DATA ──
interface Game {
  id: string; name: string; developer: string;
  environment: string; gameplay: string; platforms: string[];
  releaseDate: string; image: string;
  trailerUrl: string; gameplayUrl: string; preRegUrl: string;
}

const ALL_GAMES_DATA: Game[] = [
  { id:'cookie-run-new-world',             name:'Cookie Run: New World',              developer:'Devsisters',                  environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','PlayStation'],        releaseDate:'2029 [Confirmed]', image:'https://img.youtube.com/vi/bYsYPPE-w9Q/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=bYsYPPE-w9Q',  gameplayUrl:'https://www.youtube.com/watch?v=bYsYPPE-w9Q',  preRegUrl:'https://www.ign.com/games/cookierun-new-world' },
  { id:'varsapura',                         name:'Varsapura',                          developer:'',                            environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'TBA',             image:'https://img.youtube.com/vi/IeoD_kxvNR8/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=IeoD_kxvNR8',  gameplayUrl:'https://www.youtube.com/watch?v=ZQFNc_aqEaI',  preRegUrl:'' },
  { id:'lord-of-mysteries',                 name:'Lord of Mysteries',                  developer:'',                            environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/6kkOBCz33fg/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=6kkOBCz33fg',  gameplayUrl:'https://www.youtube.com/watch?v=ZZrORTsEZ4A',  preRegUrl:'' },
  { id:'abyss-knights',                     name:'Abyss Knights',                      developer:'',                            environment:'Stage-Based',    gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'TBA',             image:'https://img.youtube.com/vi/Ub0uFrzXCXY/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=Ub0uFrzXCXY',  gameplayUrl:'https://www.youtube.com/watch?v=Ub0uFrzXCXY',  preRegUrl:'https://www.taptap.cn/' },
  { id:'ananta',                            name:'Ananta (Project Mugen)',              developer:'NetEase Games',               environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','PlayStation'],        releaseDate:'TBA',             image:'https://img.youtube.com/vi/WpoGP7gqkFs/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=WpoGP7gqkFs',  gameplayUrl:'https://www.youtube.com/watch?v=716eb1ruka4',  preRegUrl:'' },
  { id:'aniimo',                            name:'aniimo',                             developer:'Pawprint Studio',             environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','Xbox','PlayStation'], releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/LYbphU-J2j8/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=LYbphU-J2j8',  gameplayUrl:'https://www.youtube.com/watch?v=LYbphU-J2j8',  preRegUrl:'https://www.aniimo.com/m' },
  { id:'hypnosync',                         name:'HYPNOSYNC',                          developer:'BASED KICK',                  environment:'Stage-Based',    gameplay:'Rhythm',    platforms:['PC'],                                    releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/xrnXN5_cyes/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=xrnXN5_cyes',  gameplayUrl:'https://www.youtube.com/watch?v=xrnXN5_cyes',  preRegUrl:'https://store.steampowered.com/app/2986590/HYPNOSYNC/' },
  { id:'honkai-nexus-anima',                name:'Honkai: Nexus Anima',                developer:'miHoYo / HoYoverse',          environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'TBA',             image:'https://img.youtube.com/vi/EvKCyJ64WuE/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=EvKCyJ64WuE',  gameplayUrl:'https://www.youtube.com/watch?v=V5FV_6jirKU',  preRegUrl:'https://hna.hoyoverse.com/' },
  { id:'honor-of-kings-world',              name:'Honor of Kings: World',              developer:'TiMi Studio Group',           environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','Xbox','PlayStation'], releaseDate:'TBA',             image:'https://img.youtube.com/vi/36rR4rB_TYw/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=36rR4rB_TYw',  gameplayUrl:'https://www.youtube.com/watch?v=gONX1LzZMXw',  preRegUrl:'https://honorofkingsworld.com' },
  { id:'bang-dream-our-notes',              name:'BanG Dream! Our Notes',              developer:'Bilibili Game',               environment:'Stage-Based',    gameplay:'Rhythm',    platforms:['Android','iOS'],                          releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/mMk-L_jascw/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=mMk-L_jascw',  gameplayUrl:'https://www.youtube.com/watch?v=mMk-L_jascw',  preRegUrl:'https://bdon.biligames.com/?lang=en-us' },
  { id:'my-hero-academia-united-survival',  name:'My Hero Academia UNITED SURVIVAL',   developer:'KLab Inc. / gumi Inc.',       environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/Vfk88MPic_4/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=Vfk88MPic_4',  gameplayUrl:'https://www.youtube.com/watch?v=Vfk88MPic_4',  preRegUrl:'https://x.com/MHA_HS_en' },
  { id:'sea-of-remnants',                   name:'sea of remnants',                    developer:'',                            environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','PlayStation'],        releaseDate:'TBA',             image:'https://img.youtube.com/vi/LB1wMfVlVSY/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=LB1wMfVlVSY',  gameplayUrl:'https://www.youtube.com/watch?v=LB1wMfVlVSY',  preRegUrl:'' },
  { id:'monster-hunter-outlanders',         name:'Monster Hunter Outlanders',          developer:'TiMi Studio Group / Capcom',  environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'TBA',             image:'https://img.youtube.com/vi/5gv7oMnUhnw/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=5gv7oMnUhnw',  gameplayUrl:'https://www.youtube.com/watch?v=tZNpaoTlI8Y',  preRegUrl:'https://monsterhunteroutlanders.com' },
  { id:'unending-dawn',                     name:'Unending Dawn',                      developer:'ToallGames',                  environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS','PlayStation'],        releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/OvD4q6-5ElY/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=OvD4q6-5ElY',  gameplayUrl:'https://www.youtube.com/watch?v=OvD4q6-5ElY',  preRegUrl:'https://www.youtube.com/@UnendingDawn-e8o' },
  { id:'digimon-alysion',                   name:'DIGIMON ALYSION',                    developer:'Bandai Namco',                environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/iznObr5Euo0/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=iznObr5Euo0',  gameplayUrl:'https://www.youtube.com/watch?v=iznObr5Euo0',  preRegUrl:'https://www.reddit.com/r/DigimonCardGame2020/' },
  { id:'solo-leveling-karma',               name:'Solo Leveling: KARMA',               developer:'Netmarble Neo',               environment:'3D Environment', gameplay:'Real-time', platforms:['PC','Android','iOS'],                     releaseDate:'2026 [Confirmed]', image:'https://img.youtube.com/vi/rD8Ppn5DiGE/maxresdefault.jpg', trailerUrl:'https://www.youtube.com/watch?v=rD8Ppn5DiGE',  gameplayUrl:'https://www.youtube.com/watch?v=rD8Ppn5DiGE',  preRegUrl:'https://sololeveling-karma.netmarble.com/en' },
];

// ─────────────────────────────────────────────────────── STYLES ──
const FX_CSS = `
:root { --mx: 50vw; --my: 50vh; }

.fx-spotlight {
  background: radial-gradient(700px circle at var(--mx) var(--my), rgba(0,136,221,0.14), transparent 70%);
}
/* Diamond grid — 45° rotated squares, gacha-menu feel */
.fx-grid {
  background-image:
    linear-gradient(45deg,  rgba(0,136,221,0.055) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(0,136,221,0.055) 1px, transparent 1px);
  background-size: 44px 44px;
}

/* Scattered star-dots — tiny fixed points of light */
.fx-particles {
  background-image:
    radial-gradient(circle, rgba(0,136,221,0.65) 1px,   transparent 1px),
    radial-gradient(circle, rgba(255,255,255,0.22) 1px,  transparent 1px),
    radial-gradient(circle, rgba(127,119,221,0.55) 1px,  transparent 1px),
    radial-gradient(circle, rgba(255,255,255,0.18) 1px,  transparent 1px),
    radial-gradient(circle, rgba(0,136,221,0.4) 1.5px,   transparent 1.5px),
    radial-gradient(circle, rgba(255,255,255,0.12) 1px,  transparent 1px);
  background-size:    160px 160px, 230px 230px, 310px 310px, 120px 120px, 460px 460px, 85px 85px;
  background-position: 30px 40px,   80px 60px,   45px 170px,  150px 25px,  200px 100px, 60px 90px;
}

/* Two sharp diagonal accent lines cutting across the field */
.fx-diag {
  background:
    linear-gradient(115deg,
      transparent 0%,
      transparent 31%,
      rgba(0,136,221,0.05) 31%,
      rgba(0,136,221,0.05) 31.8%,
      transparent 31.8%,
      transparent 57%,
      rgba(0,136,221,0.032) 57%,
      rgba(0,136,221,0.032) 57.7%,
      transparent 57.7%,
      transparent 100%
    );
}

/* Corner bracket accents — game-UI frame corners */
.fx-corner-tl, .fx-corner-tr, .fx-corner-bl, .fx-corner-br {
  position: absolute;
  width: 56px;
  height: 56px;
  pointer-events: none;
}
.fx-corner-tl { top: 18px;    left: 18px;  border-top:    1px solid rgba(0,136,221,0.22); border-left:   1px solid rgba(0,136,221,0.22); }
.fx-corner-tr { top: 18px;    right: 18px; border-top:    1px solid rgba(0,136,221,0.22); border-right:  1px solid rgba(0,136,221,0.22); }
.fx-corner-bl { bottom: 18px; left: 18px;  border-bottom: 1px solid rgba(0,136,221,0.22); border-left:   1px solid rgba(0,136,221,0.22); }
.fx-corner-br { bottom: 18px; right: 18px; border-bottom: 1px solid rgba(0,136,221,0.22); border-right:  1px solid rgba(0,136,221,0.22); }

/* Thin glowing edge line along the top */
.fx-topline {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(0,136,221,0.45) 25%, rgba(0,136,221,0.6) 50%, rgba(0,136,221,0.45) 75%, transparent 100%);
  box-shadow: 0 0 18px 1px rgba(0,136,221,0.25);
}
/* Thin edge line along the bottom */
.fx-botline {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(0,136,221,0.25) 30%, rgba(0,136,221,0.35) 50%, rgba(0,136,221,0.25) 70%, transparent 100%);
}

/* Snap scroll */
.cinematic-scroll {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cinematic-scroll::-webkit-scrollbar { display: none; }
.cinematic-snap { scroll-snap-align: start; }

/* Content fade-in per section */
.cin-content {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}
.cin-hidden { opacity: 0; transform: translateY(40px); }
.cin-visible { opacity: 1; transform: translateY(0); }

/* Background brightness crossfade */
.cin-bg {
  transition: filter 1.4s ease;
}

/* Nav dropdown */
.nav-drop {
  transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}
.nav-drop-off { opacity: 0; transform: scale(0.94); pointer-events: none; }
.nav-drop-on  { opacity: 1; transform: scale(1);    pointer-events: auto; }

/* Hero diamond rings */
.fx-hero-ring1 {
  animation: heroPulse1 10s ease-in-out infinite;
}
.fx-hero-ring2 {
  animation: heroPulse2 14s ease-in-out infinite;
  animation-delay: -5s;
}
@keyframes heroPulse1 {
  0%, 100% { transform: rotate(45deg) scale(1);     opacity: 0.7; }
  50%       { transform: rotate(45deg) scale(1.022); opacity: 1; }
}
@keyframes heroPulse2 {
  0%, 100% { transform: rotate(45deg) scale(1);     opacity: 0.5; }
  50%       { transform: rotate(45deg) scale(1.04);  opacity: 0.85; }
}
`;

// ─────────────────────────────────────────────────────── HELPERS ──
const AVATAR_COLORS = ['#7F77DD','#1D9E75','#D85A30','#E4533D','#0088DD','#639922','#BA7517','#993556'];
function avatarBg(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function nameInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
const isRealUrl = (url: string) =>
  Boolean(url) && !url.includes('/results?search_query=') && !url.includes('google.com/search');

const fallbackSrc = (src: string) =>
  src.includes('maxresdefault') ? src.replace('maxresdefault', 'hqdefault') : '';

// ─────────────────────────────────── BROWSE CARD IMAGE ──
const CardImage = ({ src, name }: { src: string; name: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const bg = avatarBg(name);

  const handleError = () => {
    const fb = fallbackSrc(imgSrc);
    if (fb) { setImgSrc(fb); }
    else { setErr(true); setLoaded(true); }
  };

  return (
    <div className="relative w-full h-40 bg-zinc-800 overflow-hidden rounded-t-xl">
      {!loaded && !err && <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />}
      {!err && src ? (
        <img src={imgSrc} alt={name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)} onError={handleError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-black text-3xl" style={{ backgroundColor: bg }}>
          {nameInitials(name)}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────── CINEMATIC CARD ──
const CinematicCard = ({ game, index, total }: { game: Game; index: number; total: number }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(index === 0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(game.image);
  const confirmed = game.releaseDate.includes('[Confirmed]');
  const displayDate = game.releaseDate.replace(' [Confirmed]', '');
  const bg = avatarBg(game.name);
  const ini = nameInitials(game.name);

  const handleImgError = () => {
    const fb = fallbackSrc(imgSrc);
    if (fb) setImgSrc(fb);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.intersectionRatio >= 0.45),
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const links = [
    { label: 'Trailer',  url: game.trailerUrl,  cls: 'border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm' },
    { label: 'Gameplay', url: game.gameplayUrl, cls: 'border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm' },
    { label: 'Pre-Reg',  url: game.preRegUrl,   cls: 'bg-[#0088DD] hover:bg-[#006AAE] text-white' },
  ].filter(l => isRealUrl(l.url));

  return (
    <section ref={sectionRef} className="cinematic-snap relative h-screen overflow-hidden flex items-center">
      {/* Full-screen background — the game image IS the background */}
      {imgSrc ? (
        <div
          className="cin-bg absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: isActive
              ? 'blur(5px) brightness(0.32) saturate(1.6)'
              : 'blur(14px) brightness(0.15) saturate(1.2)',
          }}
        />
      ) : (
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 30% 50%, ${bg}30, transparent 70%)`,
        }} />
      )}

      {/* Directional vignettes for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-transparent to-zinc-950/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />

      {/* Content — fades + rises in when section snaps into view */}
      <div className={`cin-content relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-14 ${isActive ? 'cin-visible' : 'cin-hidden'}`}>

        {/* Left — artwork panel */}
        <div className="w-full md:w-[420px] shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.8)] border border-white/10 aspect-video bg-zinc-900">
            {imgSrc && (
              <img src={imgSrc} alt={game.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
                onError={handleImgError}
              />
            )}
            {(!imgSrc || !imgLoaded) && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-6xl" style={{ backgroundColor: bg }}>
                {ini}
              </div>
            )}
          </div>
        </div>

        {/* Right — info */}
        <div className="flex-1 min-w-0 space-y-5">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {game.name}
            </h2>
            {game.developer && (
              <p className="mt-2 text-[#0088DD] font-semibold text-sm md:text-base">{game.developer}</p>
            )}
          </div>

          <p className="text-zinc-400 text-sm">{game.environment} · {game.gameplay}</p>

          <div className="flex flex-wrap gap-2">
            {game.platforms.map(p => (
              <span key={p} className="bg-white/10 border border-white/10 text-zinc-200 text-xs px-3 py-1 rounded-full font-mono font-bold">
                {p}
              </span>
            ))}
          </div>

          <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${
            confirmed ? 'bg-emerald-950/60 border-emerald-700/40' : 'bg-amber-950/40 border-amber-700/30'
          }`}>
            <span className={`text-xl font-black ${confirmed ? 'text-emerald-300' : 'text-amber-400'}`}>
              {displayDate}
            </span>
            <span className={`text-[11px] font-black tracking-widest ${confirmed ? 'text-emerald-500' : 'text-amber-500'}`}>
              {confirmed ? 'CONFIRMED' : 'TBA'}
            </span>
          </div>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                  className={`${l.cls} px-6 py-2.5 rounded-xl text-sm font-bold transition`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom indicator bar */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-5 inset-x-0 flex items-center justify-between px-8 pointer-events-none select-none">
        <span className="text-[11px] text-zinc-600 font-mono tabular-nums">{index + 1} / {total}</span>
        {index < total - 1 ? (
          <span className="text-[11px] text-zinc-600 font-mono animate-bounce">scroll ↓</span>
        ) : (
          <span className="text-[11px] text-zinc-600 font-mono">end of list</span>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────── HERO SECTION ──
type View = 'cinematic' | 'browse' | 'suggestions' | 'revenue';

const HeroSection = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.intersectionRatio >= 0.45),
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollDown = () => {
    const parent = sectionRef.current?.parentElement;
    if (parent) parent.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const cards = [
    {
      action: scrollDown,
      icon: '⬡',
      sub: 'UPCOMING GAMES',
      label: 'Showcase',
      desc: `${ALL_GAMES_DATA.length} titles — scroll through each game in fullscreen`,
    },
    {
      action: () => onNavigate('browse'),
      icon: '▦',
      sub: 'FULL DATABASE',
      label: 'Browse',
      desc: 'Filter by platform, status, gameplay style and more',
    },
    {
      action: () => onNavigate('revenue'),
      icon: '◈',
      sub: 'MARKET DATA',
      label: 'Revenue',
      desc: 'Monthly earnings for 63 games — Jan to May 2026',
    },
    {
      action: () => onNavigate('suggestions'),
      icon: '✦',
      sub: 'COMMUNITY',
      label: 'Suggest',
      desc: 'Know a title that should be here? Recommend it',
    },
  ];

  return (
    <section ref={sectionRef} className="cinematic-snap relative h-screen overflow-hidden flex flex-col items-center justify-center">

      {/* Giant ghost watermark */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[22vw] font-black text-white/[0.018] tracking-tighter leading-none whitespace-nowrap translate-y-2">
          GACHA INDEX
        </span>
      </div>

      {/* Pulsing diamond rings */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="fx-hero-ring1 w-[640px] h-[640px] border border-[#0088DD]/[0.10] rounded-[52px]" />
        <div className="fx-hero-ring2 absolute w-[460px] h-[460px] border border-[#0088DD]/[0.07] rounded-[38px]" />
        <div className="absolute w-[220px] h-[220px] border border-[#0088DD]/[0.04] rounded-[20px]" style={{ transform: 'rotate(45deg)' }} />
      </div>

      {/* Top-center accent line */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#0088DD]/30 to-transparent pointer-events-none" />
      {/* Bottom-center accent line */}
      <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-[#0088DD]/20 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className={`cin-content relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 ${isActive ? 'cin-visible' : 'cin-hidden'}`}>

        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#0088DD]/55" />
          <span className="text-[#0088DD]/75 font-mono text-[9px] tracking-[0.55em] uppercase select-none">
            Gacha Release Database · Est. 2025
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#0088DD]/55" />
        </div>

        {/* Title */}
        <div className="text-center -mt-2">
          <h1 className="font-black leading-none tracking-tight">
            <span
              className="block text-[clamp(3.8rem,11vw,8.5rem)] text-white"
              style={{ textShadow: '0 0 80px rgba(0,136,221,0.14)' }}
            >
              GACHA
            </span>
            <span
              className="block text-[clamp(3.8rem,11vw,8.5rem)]"
              style={{
                background: 'linear-gradient(135deg, #0077CC 0%, #009AEE 35%, #55CCFF 62%, #0088DD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 36px rgba(0,136,221,0.32))',
              }}
            >
              INDEX
            </span>
          </h1>
          <p className="mt-4 text-zinc-600 text-[11px] font-mono tracking-[0.3em] uppercase select-none">
            Track upcoming releases · Monitor the market
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-8">
          {[
            { value: String(ALL_GAMES_DATA.length), label: 'Tracked Games' },
            { value: '63',         label: 'Revenue Games' },
            { value: '5',          label: 'Months Covered' },
          ].map(({ value, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="w-px h-8 bg-zinc-800" />}
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-white font-black text-2xl md:text-3xl tabular-nums tracking-tight leading-none">
                  {value}
                </span>
                <span className="text-zinc-700 text-[8px] font-mono uppercase tracking-widest">{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Nav cards — 2×2 on mobile, 4-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
          {cards.map(({ action, icon, sub, label, desc }) => (
            <button
              key={label}
              onClick={action}
              className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/70 hover:border-[#0088DD]/45 hover:bg-[#0088DD]/[0.05] hover:shadow-[0_0_32px_rgba(0,136,221,0.10)] transition-all duration-300 text-left overflow-hidden cursor-pointer"
            >
              {/* Top-edge glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0088DD]/0 to-transparent group-hover:via-[#0088DD]/55 transition-all duration-500" />

              <span className="text-[1.5rem] font-mono font-black text-zinc-600 group-hover:text-[#0088DD] transition-colors duration-200 leading-none">
                {icon}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-mono tracking-[0.35em] text-zinc-700 group-hover:text-[#0088DD]/55 transition-colors mb-1 uppercase">
                  {sub}
                </p>
                <p className="text-zinc-100 font-bold text-sm tracking-wide leading-tight group-hover:text-white transition-colors">
                  {label}
                </p>
                <p className="text-zinc-600 text-[10px] mt-1.5 leading-relaxed group-hover:text-zinc-500 transition-colors">
                  {desc}
                </p>
              </div>

              <div className="self-end text-zinc-700 group-hover:text-[#0088DD] group-hover:translate-x-0.5 transition-all duration-200 text-xs">
                →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="text-[8px] text-zinc-700 font-mono tracking-[0.5em] uppercase">scroll to explore</span>
        <span className="text-zinc-700 text-[10px] animate-bounce">↓</span>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

// ─────────────────────────────────── NAV MENU ──

const NAV_ITEMS: { view: View; label: string; icon: string; sub: string }[] = [
  { view: 'cinematic',   label: 'Home',         icon: '⬡', sub: 'Featured cinematic' },
  { view: 'browse',      label: 'Full List',    icon: '▦', sub: 'All games + filters' },
  { view: 'revenue',     label: 'Revenue',      icon: '◈', sub: 'Market data' },
  { view: 'suggestions', label: 'Suggestions',  icon: '✦', sub: 'Game recommendations' },
];

const NavMenu = ({ current, onChange }: { current: View; onChange: (v: View) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const active = NAV_ITEMS.find(i => i.view === current) ?? NAV_ITEMS[0];

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50 select-none">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 bg-zinc-900/85 backdrop-blur-xl border border-zinc-700/70 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-[#0088DD]/50 hover:shadow-[0_8px_32px_rgba(0,136,221,0.12)] transition-all duration-300"
      >
        <span className="text-[#0088DD] font-mono font-black text-sm leading-none">{active.icon}</span>
        <span className="text-zinc-100 text-xs font-bold tracking-wide">{active.label}</span>
        <span className={`text-zinc-500 text-[10px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {/* Dropdown */}
      <div className={`nav-drop absolute right-0 top-full mt-2 w-56 rounded-2xl bg-zinc-900/96 backdrop-blur-xl border border-zinc-700/70 shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden ${open ? 'nav-drop-on' : 'nav-drop-off'}`}>
        <div className="p-1.5 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.view}
              onClick={() => { onChange(item.view); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-150 border ${
                current === item.view
                  ? 'bg-[#0088DD]/15 border-[#0088DD]/25'
                  : 'border-transparent hover:bg-zinc-800/70'
              }`}
            >
              <span className={`w-5 text-center font-mono font-black text-sm ${current === item.view ? 'text-[#0088DD]' : 'text-zinc-500'}`}>
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className={`text-[13px] font-bold leading-tight ${current === item.view ? 'text-white' : 'text-zinc-300'}`}>{item.label}</div>
                <div className="text-[10px] text-zinc-600 leading-tight mt-0.5">{item.sub}</div>
              </div>
              {current === item.view && <span className="text-[#0088DD] text-[8px] leading-none">●</span>}
            </button>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-zinc-800/80">
          <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">Gacha Release DB · 2025</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────── REVENUE TAB ──

type RevMonth = 'dec25' | 'jan26' | 'feb26' | 'mar26' | 'apr26' | 'may26';

const REV_MONTHS: { key: RevMonth; label: string }[] = [
  { key: 'jan26', label: 'Jan 2026' },
  { key: 'feb26', label: 'Feb 2026' },
  { key: 'mar26', label: 'Mar 2026' },
  { key: 'apr26', label: 'Apr 2026' },
  { key: 'may26', label: 'May 2026' },
];

const PREV_REV: Partial<Record<RevMonth, RevMonth>> = {
  jan26: 'dec25', feb26: 'jan26', mar26: 'feb26', apr26: 'mar26', may26: 'apr26',
};

interface RevGame {
  game: string;
  region: 'COMBINED' | 'CN' | 'GLOBAL' | 'JP';
  dec25?: number; jan26?: number; feb26?: number;
  mar26?: number; apr26?: number; may26?: number;
}

function revOf(g: RevGame, k: RevMonth): number | undefined {
return g[k];
}

function fmtM(n: number): string {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;
}

const REVENUE_DATA: RevGame[] = [
  { game:'Genshin Impact',                   region:'COMBINED', dec25:40_825_000, jan26:66_040_000, feb26:54_245_000, mar26:40_110_000, apr26:41_855_000, may26:41_665_000 },
  { game:'Love and Deepspace',               region:'COMBINED', dec25:84_910_000, jan26:35_720_000, feb26:32_025_000, mar26:40_725_000, apr26:37_775_000, may26:48_975_000 },
  { game:'Honkai: Star Rail',                region:'COMBINED', dec25:27_895_000, jan26: 8_037_500, feb26:21_145_000, mar26:31_730_000, apr26:58_090_000, may26:37_765_000 },
  { game:'Wuthering Waves',                  region:'COMBINED', dec25:23_175_000, jan26:18_150_000, feb26:46_000_000, mar26:11_400_000, apr26:13_700_000, may26:31_750_000 },
  { game:'Naruto Mobile',                    region:'CN',       dec25:19_250_000, jan26:44_000_000, feb26:38_500_000, mar26:22_000_000, apr26:24_750_000, may26:27_500_000 },
  { game:'GODDESS OF VICTORY: NIKKE',        region:'COMBINED', dec25:17_000_000, jan26:18_650_000, feb26:13_350_000, mar26:11_625_000, apr26:21_125_000, may26:29_600_000 },
  { game:'Arknights',                        region:'COMBINED', dec25:10_160_000, jan26:16_950_000, feb26:24_000_000, mar26: 9_270_000, apr26:21_350_000, may26:30_350_000 },
  { game:'Pokémon TCG Pocket',               region:'GLOBAL',   dec25:37_000_000, jan26:35_000_000, feb26:26_000_000, mar26:27_000_000, apr26:22_000_000, may26:24_000_000 },
  { game:'Fate/Grand Order',                 region:'COMBINED', dec25:28_370_000, jan26:33_700_000, feb26:13_310_000, mar26:12_775_000, apr26:10_985_000, may26:15_720_000 },
  { game:'Arknights: Endfield',              region:'COMBINED',                   jan26:29_500_000, feb26:25_080_000, mar26:22_050_000, apr26:17_280_000, may26: 4_766_000 },
  { game:'Monster Strike',                   region:'COMBINED', dec25:23_400_000, jan26:27_500_000, feb26:14_400_000, mar26:12_300_000, apr26:18_500_000, may26:15_500_000 },
  { game:'Uma Musume: Pretty Derby',         region:'COMBINED', dec25:22_350_000, jan26:15_925_000, feb26:17_025_000, mar26:34_055_000, apr26: 9_310_000, may26:11_360_000 },
  { game:'DRAGON BALL Z DOKKAN BATTLE',      region:'COMBINED', dec25: 8_000_000, jan26:18_000_000, feb26:34_000_000, mar26:15_000_000, apr26: 8_000_000, may26: 7_800_000 },
  { game:'Zenless Zone Zero',                region:'COMBINED', dec25:27_550_000, jan26:23_245_000, feb26:13_180_000, mar26:16_550_000, apr26: 7_167_000, may26: 9_370_000 },
  { game:'SD Gundam G Generation ETERNAL',   region:'COMBINED', dec25:14_000_000, jan26:19_000_000, feb26:12_000_000, mar26: 6_000_000, apr26:27_000_000, may26: 9_000_000 },
  { game:'Puzzle & Dragons',                 region:'COMBINED', dec25:12_410_000, jan26:12_630_000, feb26:14_510_000, mar26:12_520_000, apr26:11_460_000, may26:10_400_000 },
  { game:'Dragon Ball Legends',              region:'COMBINED', dec25:17_700_000, jan26:13_400_000, feb26:10_400_000, mar26: 7_300_000, apr26: 6_300_000, may26:14_600_000 },
  { game:'ONE PIECE Bounty Rush',            region:'COMBINED', dec25: 7_400_000, jan26:10_400_000, feb26:10_000_000, mar26: 9_500_000, apr26: 4_500_000, may26: 7_300_000 },
  { game:'The Battle Cats',                  region:'COMBINED', dec25: 9_800_000, jan26: 9_900_000, feb26:11_600_000, mar26: 6_800_000, apr26: 6_600_000, may26:10_700_000 },
  { game:'Infinity Nikki',                   region:'COMBINED', dec25: 3_490_000, jan26: 9_410_000, feb26: 6_290_000, mar26: 9_550_000, apr26: 6_500_000, may26: 6_140_000 },
  { game:'Blue Archive',                     region:'COMBINED', dec25: 5_970_000, jan26: 9_295_000, feb26: 7_862_500, mar26: 2_856_500, apr26: 2_824_000, may26: 3_250_000 },
  { game:'Reverse: 1999',                    region:'COMBINED', dec25: 3_850_000, jan26: 7_510_000, feb26: 3_880_000, mar26: 3_660_000, apr26: 4_540_000, may26: 6_950_000 },
  { game:'Jujutsu Kaisen Phantom Parade',    region:'COMBINED', dec25: 9_500_000, jan26: 7_500_000, feb26: 3_300_000, mar26: 3_900_000,                   may26: 3_200_000 },
  { game:'CookieRun: Kingdom',               region:'GLOBAL',   dec25: 5_000_000, jan26: 7_000_000, feb26: 5_000_000, mar26: 4_000_000, apr26: 5_000_000, may26: 5_000_000 },
  { game:'Dragon Traveler',                  region:'COMBINED',                   jan26: 7_000_000, feb26: 8_895_000, mar26: 7_160_000, apr26: 6_160_000, may26: 4_150_000 },
  { game:'Shadowverse: Worlds Beyond',       region:'COMBINED', dec25: 4_550_000, jan26: 6_275_000, feb26: 2_675_000, mar26: 2_992_500, apr26: 2_720_000, may26: 2_837_500 },
  { game:'Marvel Contest of Champions',      region:'GLOBAL',   dec25:13_000_000, jan26: 6_000_000, feb26: 4_000_000, mar26: 4_000_000, apr26: 5_000_000, may26: 5_000_000 },
  { game:'Gakuen iDOLM@STER',               region:'JP',       dec25: 8_000_000, jan26: 6_000_000, feb26: 3_000_000, mar26: 3_000_000, apr26: 4_000_000, may26:12_000_000 },
  { game:'Onmyoji',                          region:'COMBINED', dec25: 5_802_750, jan26: 5_792_750, feb26: 8_572_750, mar26: 5_902_750, apr26: 5_802_750, may26: 8_482_750 },
  { game:'HATSUNE MIKU: COLORFUL STAGE!',   region:'COMBINED', dec25: 4_950_000, jan26: 5_775_000, feb26: 5_750_000, mar26: 6_200_000, apr26: 6_950_000, may26: 5_740_000 },
  { game:'Light and Night',                  region:'COMBINED', dec25: 2_307_000, jan26: 5_576_000, feb26: 8_460_000, mar26: 2_880_000, apr26: 2_820_000, may26: 5_568_000 },
  { game:'Beyond the World',                 region:'CN',       dec25: 5_500_000, jan26: 5_500_000, feb26: 5_500_000, mar26: 5_500_000, apr26: 2_750_000, may26: 5_500_000 },
  { game:'Chaos Zero Nightmare',             region:'GLOBAL',   dec25:11_000_000, jan26: 5_000_000, feb26: 3_000_000,                   apr26: 2_000_000, may26: 6_650_000 },
  { game:'Summoners War',                    region:'GLOBAL',   dec25: 8_000_000, jan26: 5_000_000, feb26: 8_000_000, mar26: 6_000_000, apr26: 8_000_000, may26: 7_000_000 },
  { game:'Trickal RE:VIVE',                  region:'COMBINED', dec25: 3_895_000, jan26: 4_850_000, feb26: 3_475_000, mar26: 4_287_500, apr26: 4_138_500, may26: 2_962_500 },
  { game:'BLEACH: Soul Resonance',           region:'COMBINED', dec25:10_500_000, jan26: 4_800_000, feb26: 5_300_000 },
  { game:'Disney Twisted-Wonderland',        region:'COMBINED', dec25: 3_400_000, jan26: 4_700_000, feb26: 2_000_000, mar26: 8_400_000, apr26: 3_100_000 },
  { game:'Azur Lane',                        region:'COMBINED', dec25: 9_710_000, jan26: 4_530_000, feb26: 4_910_000, mar26: 4_481_000, apr26: 3_505_000, may26: 5_453_000 },
  { game:'The Seven Deadly Sins: Grand Cross',region:'COMBINED',dec25: 4_660_000, jan26: 4_460_000, feb26: 3_140_000, mar26: 2_740_000, apr26: 3_140_000, may26: 7_890_000 },
  { game:'ENSEMBLE STARS',                   region:'COMBINED', dec25: 4_302_750, jan26: 4_272_750, feb26: 5_595_000, mar26: 5_810_000, apr26: 4_660_000, may26: 4_640_000 },
  { game:'Watcher of Realms',                region:'COMBINED', dec25: 4_215_000, jan26: 4_005_000, feb26: 4_590_000, mar26: 4_575_000, apr26: 4_675_000, may26: 4_050_000 },
  { game:'Seven Knights Re:BIRTH',           region:'GLOBAL',   dec25: 6_000_000, jan26: 4_000_000, feb26: 4_000_000,                                      may26: 3_000_000 },
  { game:'Yu-Gi-Oh! Master Duel',            region:'GLOBAL',   dec25: 4_000_000, jan26: 4_000_000, feb26: 5_000_000, mar26: 3_000_000 },
  { game:'ONE PIECE TREASURE CRUISE',        region:'COMBINED', dec25: 3_700_000, jan26: 3_900_000, feb26: 2_600_000, mar26: 2_400_000, apr26: 2_100_000, may26: 7_800_000 },
  { game:'SLIME - ISEKAI Memories',          region:'COMBINED', dec25: 2_400_000, jan26: 3_400_000 },
  { game:'LifeMakeover',                     region:'COMBINED', dec25: 6_230_000, jan26: 3_342_000, feb26: 6_022_000, mar26: 6_041_000, apr26: 3_252_000, may26: 3_211_000 },
  { game:'Shining Nikki',                    region:'COMBINED', dec25: 3_092_000, jan26: 3_062_000, feb26: 3_122_000, mar26: 2_747_000, apr26: 3_057_000, may26: 3_022_000 },
  { game:'MementoMori',                      region:'GLOBAL',   dec25: 4_000_000, jan26: 3_000_000, feb26: 3_000_000, mar26: 3_000_000, apr26: 3_000_000, may26: 3_000_000 },
  { game:'Limbus Company',                   region:'GLOBAL',   dec25: 1_700_000, jan26: 3_000_000, feb26: 2_900_000, mar26: 3_000_000 },
  { game:'Brown Dust 2',                     region:'GLOBAL',   dec25: 2_900_000 },
  { game:'Path to Nowhere',                  region:'COMBINED',                   jan26: 1_225_000, feb26: 3_350_000,                                        may26: 2_725_000 },
  { game:'Heaven Burns Red',                 region:'COMBINED',                                     feb26: 3_180_000 },
  { game:"Girls' Frontline 2: Exilium",      region:'COMBINED',                   jan26: 2_650_000, feb26: 2_525_000, mar26: 3_300_000, apr26: 3_200_000 },
  { game:'Pokémon Masters EX',               region:'GLOBAL',                                                         mar26: 5_000_000, apr26: 3_000_000 },
  { game:'Mahjong Soul',                     region:'COMBINED',                                                        mar26:   910_000, apr26: 5_350_000, may26: 2_790_000 },
  { game:'Neverness to Everness',            region:'COMBINED',                                                                          apr26: 6_300_000, may26:22_575_000 },
  { game:'The Seven Deadly Sins: Origins',   region:'GLOBAL',                                                         mar26: 2_800_000, apr26: 5_000_000 },
  { game:'DRAGON QUEST Smash/Grow',          region:'COMBINED',                                                                          apr26: 4_400_000, may26: 7_000_000 },
  { game:'Wizardry Variants Daphne',         region:'GLOBAL',                                                                            apr26: 4_000_000 },
  { game:'MONGIL: STAR DIVE',                region:'GLOBAL',                                                                            apr26: 4_000_000, may26: 2_800_000 },
  { game:'Dissidia Duellum Final Fantasy',   region:'GLOBAL',                                                                            apr26: 3_000_000 },
  { game:'Sword x St...',                    region:'GLOBAL',                                                                                               may26: 4_000_000 },
];

function bannerBg(name: string): React.CSSProperties {
  const palettes = [
    { from: '#0c1a2e', to: '#0d3a5c' },
    { from: '#1a0c2e', to: '#36115c' },
    { from: '#0c2820', to: '#0d4a38' },
    { from: '#2e0c0c', to: '#5c1212' },
    { from: '#2a1800', to: '#4f3200' },
  ];
  const p = palettes[(name.charCodeAt(0) + (name.charCodeAt(1) ?? 0)) % 5];
  return { background: `linear-gradient(135deg, ${p.from}, ${p.to})` };
}

const GAME_META: Record<string, { bannerUrl?: string; downloadUrl?: string }> = {
  'Genshin Impact':                     { downloadUrl: 'https://genshin.hoyoverse.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/df/69/1c/df691ca2-735f-4617-256d-a49202f8db1e/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg' },
  'Love and Deepspace':                 { downloadUrl: 'https://loveanddeepspace.papergames.cn/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ab/2c/05/ab2c0519-4b4e-02f2-d790-574e98b7907e/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Honkai: Star Rail':                  { downloadUrl: 'https://hsr.hoyoverse.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/13/be/99/13be9956-5537-78fb-8422-984ac0be74d1/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Wuthering Waves':                    { downloadUrl: 'https://wutheringwaves.kurogames.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/44/ca/b544ca0a-dd46-a268-b2fa-533d41f97ff7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Naruto Mobile':                      { downloadUrl: 'https://naruto.163.com/' },
  'GODDESS OF VICTORY: NIKKE':          { downloadUrl: 'https://www.nikke-en.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/68/aa/6b68aa0c-6509-870f-d271-1232767f9482/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Arknights':                          { downloadUrl: 'https://www.arknights.global/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/be/99/37/be993702-866f-c921-a7a3-f3b06d57036a/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Pokémon TCG Pocket':                 { downloadUrl: 'https://www.pokemontcgpocket.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/54/12/78/541278bd-ccac-156d-b027-a46e1cd536bb/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Fate/Grand Order':                   { downloadUrl: 'https://www.fate-go.us/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/36/d1/b8/36d1b802-01ae-1ba4-a680-b76e1d472520/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Arknights: Endfield':                { downloadUrl: 'https://endfield.gryphline.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/a6/e0/6da6e0eb-c4fa-4dc0-aa55-64eff735eb22/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Monster Strike':                     { downloadUrl: 'https://www.monsters.net/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/1a/30/5d/1a305dd6-e6cd-058a-2e4b-a9d9d60b4626/AppIcon-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg' },
  'Uma Musume: Pretty Derby':           { downloadUrl: 'https://umamusume.jp/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/84/f9/de/84f9de55-4a2d-977f-00b0-6a1ece8fe6f7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'DRAGON BALL Z DOKKAN BATTLE':        { downloadUrl: 'https://dbz-dokkan.bandainamcoent.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b0/90/c6/b090c631-52be-5c75-ffd5-84b28db2959b/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/512x512bb.jpg' },
  'Zenless Zone Zero':                  { downloadUrl: 'https://zenless.hoyoverse.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/91/1e/9d/911e9df7-8a8e-66e3-14d8-83867c5b219e/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'SD Gundam G Generation ETERNAL':     { downloadUrl: 'https://sdggg.bandainamcoent.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/65/c5/98/65c59821-c3c2-1820-1208-3f6afbd5fe14/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Puzzle & Dragons':                   { downloadUrl: 'https://pad.gungho.jp/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a7/de/d9/a7ded934-6fba-41b7-51f2-ce5da4491ca1/AppIcon_en-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Dragon Ball Legends':                { downloadUrl: 'https://legends.dbz.space/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/42/51/f7/4251f7ac-2e6f-a0c7-39fe-2ba52559226c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'ONE PIECE Bounty Rush':              { downloadUrl: 'https://www.bandainamcoent.com/games/one-piece-bounty-rush', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/80/d0/72/80d07200-c66e-c48e-9fcf-e17d6d39d753/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'The Battle Cats':                    { downloadUrl: 'https://battlecats.ponos.net/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/31/68/c7/3168c7d9-d6d7-35d5-dc09-198f2e95ca0e/AppIcon-en-1x_U007epad-0-1-85-220-0.png/512x512bb.jpg' },
  'Infinity Nikki':                     { downloadUrl: 'https://infinitynikki.infoldgames.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/92/96/7a/92967a1d-f48d-791b-1c46-5cebe42a8dba/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Blue Archive':                       { downloadUrl: 'https://bluearchive.nexon.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/dc/52/59/dc525981-6f34-a35a-da8e-2d4331261788/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Reverse: 1999':                      { downloadUrl: 'https://re1999.bluepoch.com/en', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/23/d7/14/23d7142c-255c-a79f-09f4-63e38503cdbe/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Jujutsu Kaisen Phantom Parade':      { downloadUrl: 'https://jjk-pp.jp/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1b/45/2c/1b452c58-69d1-5589-4e84-7fd12e4879fc/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'CookieRun: Kingdom':                 { downloadUrl: 'https://www.cookierunkingdom.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/95/92/ba/9592baa9-3471-8211-c1d5-03026be03cc1/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Dragon Traveler':                    { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/cd/20/13/cd20137e-ae25-351e-44ab-d3bf76b93aa8/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Shadowverse: Worlds Beyond':         { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7f/88/6f/7f886f68-bd1c-f772-1440-1d11c66d0290/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Marvel Contest of Champions':        { downloadUrl: 'https://www.playcontestofchampions.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/31/e7/1b/31e71bd2-0aa0-2f8b-faf1-95b8eda2075e/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Gakuen iDOLM@STER':                  { downloadUrl: 'https://gakuenidolmaster.bandainamco.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bf/4c/fb/bf4cfb5e-d8b8-3def-aeb7-3dba60677a2d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Onmyoji':                            { downloadUrl: 'https://www.onmyojigame.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fa/22/40/fa2240ca-c572-5a11-3b27-00705e822ac4/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg' },
  'HATSUNE MIKU: COLORFUL STAGE!':      { downloadUrl: 'https://colorfulstage.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/53/d4/85/53d48568-c77e-a6e1-e9b1-2753309827ba/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Light and Night':                    { downloadUrl: 'https://lightandnight.papergames.cn/' },
  'Beyond the World':                   { },
  'Chaos Zero Nightmare':               { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3c/54/b8/3c54b8d7-d3f8-f31b-949a-7462a9bcf93a/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg' },
  'Summoners War':                      { downloadUrl: 'https://withhive.com/game/summoners-war/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/1a/0b/0d/1a0b0de5-d435-99b8-a828-b5f05d363dcf/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg' },
  'Trickal RE:VIVE':                    { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/48/48/6a/48486a8f-36d6-5cb2-88d8-017f00ea05ee/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'BLEACH: Soul Resonance':             { downloadUrl: 'https://bleach-sr.klab.jp/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bf/56/4e/bf564e3a-a884-0174-6a3f-08d18548a61a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Disney Twisted-Wonderland':          { downloadUrl: 'https://disney-twisted-wonderland.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4d/b9/28/4db92829-9e1a-b3e1-0b87-7715d72a8943/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Azur Lane':                          { downloadUrl: 'https://azurlane.yo-star.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c3/22/b3/c322b33e-c564-1635-de4c-433ecdd1425f/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'The Seven Deadly Sins: Grand Cross': { downloadUrl: 'https://www.7dsgrandcross.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/44/eb/37/44eb37ac-bd11-a490-b4af-65c32b0c83f0/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'ENSEMBLE STARS':                     { downloadUrl: 'https://ensemble-stars.jp/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d2/44/c2/d244c2ad-8bbf-5bd3-e478-6f1d2bb870cf/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Watcher of Realms':                  { downloadUrl: 'https://www.watcherofrealms.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/77/88/5e/77885e6f-e6d2-59d1-f70d-6c9a039fc697/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Seven Knights Re:BIRTH':             { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/87/84/03/87840350-de7a-936d-aa49-129943510221/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Yu-Gi-Oh! Master Duel':              { downloadUrl: 'https://www.konami.com/yugioh/masterduel/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7c/12/f3/7c12f31c-30ce-e711-59ee-b8d9b533cbf5/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'ONE PIECE TREASURE CRUISE':          { downloadUrl: 'https://www.onepiece-treasurecruise.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/1e/7a/1d/1e7a1dac-55cb-3d1a-b497-5e125dde9e43/AppIcon_en-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'SLIME - ISEKAI Memories':            { downloadUrl: 'https://slime-isekai.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b6/d3/4d/b6d34d1b-916e-f5d4-9c4b-36be834a77f7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'LifeMakeover':                       { downloadUrl: 'https://www.lifemakeover.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cb/98/2a/cb982a23-0ab7-73af-0b9a-3ca26a6a8de0/AppIcon-1x_U007emarketing-0-8-0-0-85-220-0.png/512x512bb.jpg' },
  'Shining Nikki':                      { downloadUrl: 'https://www.shiningnikki.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/af/b1/2d/afb12df6-b75a-6af8-baa6-2b9e02177aca/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'MementoMori':                        { downloadUrl: 'https://mementomori.ponos.net/en/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/01/43/21/01432124-b196-f744-25d2-de7772f08d44/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Limbus Company':                     { downloadUrl: 'https://limbuscompany.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6d/28/f1/6d28f116-21a3-0ca9-a34d-c7603b7e4c07/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Brown Dust 2':                       { downloadUrl: 'https://browndust2.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/a2/7d/cca27d3c-3f25-969a-2168-e0a6cdd62a85/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Path to Nowhere':                    { downloadUrl: 'https://pathtonowhere.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/d3/fb/2dd3fb35-2c74-872f-e349-dd38ea33ff82/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Heaven Burns Red':                   { downloadUrl: 'https://heaven-burns-red.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/89/ff/01/89ff0175-98cf-8d8c-d578-0824a645d42d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  "Girls' Frontline 2: Exilium":        { downloadUrl: 'https://gfl2.sunborngame.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/11/85/76/11857635-c006-bcea-3f66-00b31439beff/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Pokémon Masters EX':                 { downloadUrl: 'https://pokemonmasters-game.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/59/ff/2759ffa4-859f-66b5-1bb7-4387874c5b6c/KenyaAppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg' },
  'Mahjong Soul':                       { downloadUrl: 'https://mahjongsoul.yo-star.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ca/52/7c/ca527cf2-97d0-5b57-5d7c-3ba1dcccc2a5/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Neverness to Everness':              { downloadUrl: 'https://nvs-game.com/', bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2e/3d/d3/2e3dd3f8-64c3-4aee-89e0-d81228be3573/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'DRAGON QUEST Smash/Grow':            { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/48/9d/f5/489df583-ae37-56bb-cb51-bf5a411c159a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Wizardry Variants Daphne':           { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/75/ae/52/75ae52d0-e6c2-94c0-02a9-4668b197fd12/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'MONGIL: STAR DIVE':                  { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/63/b7/b2/63b7b218-3023-d262-73ba-12f815bc9ba7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg' },
  'Dissidia Duellum Final Fantasy':     { bannerUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b7/a7/36/b7a7361b-0c13-d070-1288-7f229173a536/AppIcon-0-0-1x_U007emarketing-0-6-85-220.png/512x512bb.jpg' },
};

const RevenueTab = () => {
  const [month, setMonth] = useState<RevMonth>('may26');
  const [cmpMonth, setCmpMonth] = useState<RevMonth | ''>('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [sortBy, setSortBy] = useState<'revenue' | 'name' | 'change'>('revenue');
  const [expanded, setExpanded] = useState<string | null>(null);

  const activeLabel = REV_MONTHS.find(m => m.key === month)?.label ?? '';
  const cmpLabel = cmpMonth ? REV_MONTHS.find(m => m.key === cmpMonth)?.label ?? '' : '';

  const rows = useMemo(() => {
    const prevKey = PREV_REV[month];
    return REVENUE_DATA
      .filter(g => {
        const rev = revOf(g, month);
        return rev !== undefined
          && (region === 'All' || g.region === region)
          && g.game.toLowerCase().includes(search.toLowerCase());
      })
      .map(g => {
        const rev = revOf(g, month)!;
        const prevRev = prevKey ? revOf(g, prevKey) : undefined;
        const change = (prevRev !== undefined && prevRev > 0) ? (rev - prevRev) / prevRev : undefined;
        return { ...g, rev, change };
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.game.localeCompare(b.game);
        if (sortBy === 'change') return (b.change ?? -Infinity) - (a.change ?? -Infinity);
        return b.rev - a.rev;
      });
  }, [month, region, search, sortBy]);

  const maxRev = Math.max(...rows.map(r => r.rev), 1);

  const cmpMap = useMemo(() => {
    if (!cmpMonth) return {} as Record<string, number | undefined>;
    const m: Record<string, number | undefined> = {};
    REVENUE_DATA.forEach(g => { m[g.game] = revOf(g, cmpMonth as RevMonth); });
    return m;
  }, [cmpMonth]);

  const totalRev = rows.reduce((s, r) => s + r.rev, 0);

  const regionColor = (r: string) => ({
    CN: 'bg-red-900/50 text-red-400',
    JP: 'bg-pink-900/50 text-pink-400',
    GLOBAL: 'bg-blue-900/50 text-blue-400',
    COMBINED: 'bg-zinc-800 text-zinc-400',
  }[r] ?? 'bg-zinc-800 text-zinc-400');

  return (
    <div className="relative z-10 min-h-screen p-4 md:p-8 pt-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="border-b border-zinc-800 pb-5 mb-6">
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Revenue</h1>
          <p className="text-xs text-zinc-500">Mobile gacha market · Jan 2026 – May 2026 · Source: app store estimates</p>
        </div>

        {/* Month selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {REV_MONTHS.map(({ key, label }) => (
            <button key={key} onClick={() => setMonth(key)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                month === key
                  ? 'bg-[#0088DD] border-[#0088DD] text-white shadow-[0_0_12px_rgba(0,136,221,0.35)]'
                  : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
              }`}
            >{label}</button>
          ))}
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search games…"
            className="bg-zinc-900/70 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD] w-44"
          />
          <select value={region} onChange={e => setRegion(e.target.value)}
            className="bg-zinc-900/70 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD]"
          >
            {['All','COMBINED','GLOBAL','CN','JP'].map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-zinc-900/70 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD]"
          >
            <option value="revenue">Sort: Revenue ↓</option>
            <option value="name">Sort: Name A–Z</option>
            <option value="change">Sort: % Change ↓</option>
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] text-zinc-600 whitespace-nowrap">Compare vs</span>
            <select value={cmpMonth} onChange={e => setCmpMonth(e.target.value as RevMonth | '')}
              className="bg-zinc-900/70 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD]"
            >
              <option value="">— none —</option>
              {REV_MONTHS.filter(m => m.key !== month).map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary strip */}
        <div className="flex flex-wrap gap-6 mb-5 text-xs font-mono text-zinc-500">
          <span><span className="text-zinc-300">{rows.length}</span> games tracked in {activeLabel}</span>
          <span>Total <span className="text-zinc-300">{fmtM(totalRev)}</span></span>
          {rows[0] && <span>Top: <span className="text-[#0088DD]">{rows[0].game}</span> {fmtM(rows[0].rev)}</span>}
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[28px_60px_1fr_80px_200px_72px_16px_24px] gap-2 px-4 mb-1">
          <span className="text-[10px] text-zinc-600 font-mono">#</span>
          <span />
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Game</span>
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Region</span>
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">{activeLabel}{cmpMonth ? ` vs ${cmpLabel}` : ''}</span>
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider text-right">vs prev</span>
          <span />
          <span />
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {rows.map((row, i) => {
            const isExp = expanded === row.game;
            const cmpRev = cmpMonth ? cmpMap[row.game] : undefined;
            const barPct = Math.round((row.rev / maxRev) * 100);
            const cmpPct = cmpRev !== undefined ? Math.round((cmpRev / maxRev) * 100) : 0;
            const cmpDelta = cmpRev !== undefined && cmpRev > 0
              ? (row.rev - cmpRev) / cmpRev : undefined;
            const shownChange = cmpMonth ? cmpDelta : row.change;
            const meta = GAME_META[row.game] ?? {};

            const sparkMax = Math.max(...REV_MONTHS.map(m => revOf(row as RevGame, m.key) ?? 0), 1);

            return (
              <div key={row.game}>
                <div
                  onClick={() => setExpanded(isExp ? null : row.game)}
                  className="grid grid-cols-[28px_60px_1fr_80px_200px_72px_16px_24px] gap-2 items-center px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-800/50 hover:border-zinc-700/70 cursor-pointer transition-all duration-150"
                >
                  {/* Rank */}
                  <span className="text-zinc-600 font-mono text-xs text-right">{i + 1}</span>

                  {/* Banner */}
                  <div className="w-[60px] h-[34px] rounded-md overflow-hidden relative flex-none" style={bannerBg(row.game)}>
                    <span className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-lg select-none">{row.game[0]}</span>
                    {meta.bannerUrl && (
                      <img src={meta.bannerUrl} alt="" className="absolute inset-0 w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
                  </div>

                  {/* Name */}
                  <span className="text-zinc-100 text-sm font-semibold truncate">{row.game}</span>

                  {/* Region */}
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded w-fit ${regionColor(row.region)}`}>
                    {row.region}
                  </span>

                  {/* Revenue bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-4 bg-zinc-800/80 rounded-sm overflow-hidden relative">
                      <div className="h-full bg-[#0088DD]/75 rounded-sm transition-all duration-500"
                        style={{ width: `${barPct}%` }} />
                      {cmpPct > 0 && (
                        <div className="absolute top-0 h-full border-r-2 border-white/40 pointer-events-none"
                          style={{ left: `${cmpPct}%` }} />
                      )}
                    </div>
                    <span className="text-zinc-100 font-mono text-xs font-bold w-14 text-right shrink-0">
                      {fmtM(row.rev)}
                    </span>
                  </div>

                  {/* Change */}
                  <div className={`text-xs font-bold font-mono text-right ${
                    shownChange === undefined ? 'text-zinc-700' :
                    shownChange > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {shownChange === undefined ? '—'
                      : `${shownChange > 0 ? '▲' : '▼'} ${Math.abs(shownChange * 100).toFixed(0)}%`}
                  </div>

                  {/* Chevron */}
                  <span className={`text-zinc-600 text-[10px] transition-transform duration-200 ${isExp ? 'rotate-180' : ''}`}>▾</span>

                  {/* Download */}
                  {meta.downloadUrl ? (
                    <a href={meta.downloadUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-zinc-600 hover:text-[#0088DD] transition-colors text-sm flex items-center justify-center"
                      title="Official page">↗</a>
                  ) : <span />}
                </div>

                {/* Expanded sparkline */}
                {isExp && (
                  <div className="bg-zinc-900/80 border-x border-b border-zinc-800/50 rounded-b-xl px-4 pt-3 pb-4 -mt-1">
                    <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-3">Revenue history — all months</p>
                    <div className="flex items-end gap-2">
                      {REV_MONTHS.map(({ key, label }) => {
                        const v = revOf(row as RevGame, key);
                        const h = v !== undefined ? Math.max(6, Math.round((v / sparkMax) * 72)) : 0;
                        const isActive = key === month;
                        return (
                          <div key={key} className="flex-1 flex flex-col items-center gap-1">
                            <span className={`text-[9px] font-mono leading-tight text-center ${v !== undefined ? (isActive ? 'text-[#0088DD]' : 'text-zinc-400') : 'text-zinc-700'}`}>
                              {v !== undefined ? fmtM(v) : '—'}
                            </span>
                            <div className={`w-full rounded-sm transition-all duration-500 ${isActive ? 'bg-[#0088DD]' : 'bg-zinc-700/80'}`}
                              style={{ height: `${h}px` }} />
                            <span className={`text-[8px] font-mono ${isActive ? 'text-[#0088DD]' : 'text-zinc-600'}`}>
                              {label.slice(0, 3)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {cmpRev !== undefined && (
                      <p className="text-[10px] text-zinc-500 font-mono mt-3">
                        vs {cmpLabel}: {fmtM(cmpRev)}
                        {cmpDelta !== undefined && (
                          <span className={cmpDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {' '}({cmpDelta >= 0 ? '+' : ''}{(cmpDelta * 100).toFixed(1)}%)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {rows.length === 0 && (
            <div className="text-center py-20 text-zinc-600 font-mono text-sm">
              No games match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────── SUGGESTIONS TAB ──
const SuggestionsTab = () => {
  const [gameName, setGameName] = useState('');
  const [officialPage, setOfficialPage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<{ name: string; url: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName.trim()) { setError('Game name is required.'); return; }
    setError('');
    setSubmitted({ name: gameName.trim(), url: officialPage.trim() });
  };

  const handleReset = () => {
    setGameName(''); setOfficialPage(''); setSubmitted(null);
  };

  if (submitted) {
    return (
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 flex flex-col items-center gap-5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/70 border border-emerald-700/40 flex items-center justify-center text-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            ✓
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Suggestion Received</h2>
            <p className="text-zinc-500 text-sm">Thanks for the recommendation!</p>
          </div>
          <div className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-5 py-4 text-left space-y-2">
            <div>
              <p className="text-[10px] font-black tracking-widest text-zinc-600 uppercase mb-0.5">Game Name</p>
              <p className="text-zinc-100 font-semibold text-sm">{submitted.name}</p>
            </div>
            {submitted.url && (
              <div>
                <p className="text-[10px] font-black tracking-widest text-zinc-600 uppercase mb-0.5">Official Page</p>
                <a href={submitted.url} target="_blank" rel="noopener noreferrer"
                  className="text-[#0088DD] text-sm hover:underline break-all">{submitted.url}</a>
              </div>
            )}
          </div>
          <button onClick={handleReset}
            className="px-6 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/60 text-zinc-300 text-sm font-bold hover:bg-zinc-700/70 transition">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            ✦
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight">Suggest a Game</h1>
            <p className="text-zinc-500 text-xs mt-0.5">Know a gacha title that should be tracked? Let us know.</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-7">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Game Name */}
            <div>
              <label className="block text-[11px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                Game Name <span className="text-[#0088DD]">*</span>
              </label>
              <input
                type="text"
                value={gameName}
                onChange={e => { setGameName(e.target.value); if (error) setError(''); }}
                placeholder="e.g. Wuthering Waves"
                className={`w-full bg-zinc-950/60 text-zinc-100 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD] transition placeholder:text-zinc-600 ${error ? 'border-red-500/70' : 'border-zinc-700/80 hover:border-zinc-600'}`}
              />
              {error && <p className="text-red-400 text-xs font-semibold mt-1.5">{error}</p>}
            </div>

            {/* Official Page */}
            <div>
              <label className="block text-[11px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                Official Page <span className="text-zinc-600 font-normal normal-case tracking-normal">— website or social</span>
              </label>
              <input
                type="url"
                value={officialPage}
                onChange={e => setOfficialPage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-zinc-950/60 text-zinc-100 border border-zinc-700/80 hover:border-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD] transition placeholder:text-zinc-600"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800/80 pt-4">
              <button type="submit"
                className="w-full bg-[#0088DD] hover:bg-[#006AAE] text-white font-bold py-3 rounded-xl text-sm transition shadow-[0_4px_16px_rgba(0,136,221,0.25)] hover:shadow-[0_4px_20px_rgba(0,136,221,0.4)]">
                Submit Suggestion
              </button>
            </div>

          </form>
        </div>

        <p className="text-center text-[10px] text-zinc-700 font-mono mt-5 uppercase tracking-widest">
          Suggestions are reviewed before being added to the tracker
        </p>
      </div>
    </div>
  );
};

// ──────────────────────────────────── STATUS FILTER OPTIONS ──
const STATUS_OPTS = [
  { label: 'All',       active: 'bg-[#0088DD] border-[#0088DD] text-white' },
  { label: 'Confirmed', active: 'bg-emerald-600 border-emerald-600 text-white' },
  { label: 'TBA',       active: 'bg-amber-600 border-amber-600 text-white' },
];

// ─────────────────────────────────────── MAIN COMPONENT ──
export default function GachaTracker() {
  const [view, setView] = useState<View>('cinematic');
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [gameplayFilter, setGameplayFilter] = useState('All');
  const [environmentFilter, setEnvironmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('release-asc');

  useEffect(() => {
    const h = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('gacha_filters');
    if (!saved) return;
    const f = JSON.parse(saved);
    setSearch(f.search || '');
    setPlatformFilter(f.platform || 'All');
    setGameplayFilter(f.gameplay || 'All');
    setEnvironmentFilter(f.environment || 'All');
    setStatusFilter(f.status || 'All');
    setSortOrder(f.sort || 'release-asc');
    const validViews: View[] = ['cinematic', 'browse', 'suggestions', 'revenue'];
    if (f.view && validViews.includes(f.view)) setView(f.view as View);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('gacha_filters', JSON.stringify({
      search, platform: platformFilter, gameplay: gameplayFilter,
      environment: environmentFilter, status: statusFilter, sort: sortOrder, view,
    }));
  }, [search, platformFilter, gameplayFilter, environmentFilter, statusFilter, sortOrder, view]);

  const filteredGames = useMemo(() => {
    const result = ALL_GAMES_DATA.filter(g => {
      const confirmed = g.releaseDate.includes('[Confirmed]');
      return (
        g.name.toLowerCase().includes(search.toLowerCase()) &&
        (platformFilter === 'All' || g.platforms.includes(platformFilter)) &&
        (gameplayFilter === 'All' || g.gameplay === gameplayFilter) &&
        (environmentFilter === 'All' || g.environment === environmentFilter) &&
        (statusFilter === 'All' || (statusFilter === 'Confirmed' && confirmed) || (statusFilter === 'TBA' && !confirmed))
      );
    });
    if (sortOrder === 'release-asc')  result.sort((a,b) => (parseInt(a.releaseDate)||9999)-(parseInt(b.releaseDate)||9999));
    if (sortOrder === 'release-desc') result.sort((a,b) => (parseInt(b.releaseDate)||0)-(parseInt(a.releaseDate)||0));
    if (sortOrder === 'name-asc')     result.sort((a,b) => a.name.localeCompare(b.name));
    if (sortOrder === 'name-desc')    result.sort((a,b) => b.name.localeCompare(a.name));
    return result;
  }, [search, platformFilter, gameplayFilter, environmentFilter, statusFilter, sortOrder]);

  const clearFilters = () => {
    setSearch(''); setPlatformFilter('All'); setGameplayFilter('All');
    setEnvironmentFilter('All'); setStatusFilter('All'); setSortOrder('release-asc');
  };
  const hasActiveFilters = !!(search || platformFilter !== 'All' || gameplayFilter !== 'All' || environmentFilter !== 'All' || statusFilter !== 'All');

  return (
    <div className={`bg-zinc-950 text-zinc-50 relative ${view === 'cinematic' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <style>{FX_CSS}</style>

      {/* ── Fixed background FX ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="fx-spotlight absolute inset-0" />
        <div className="fx-grid absolute inset-0" />
        <div className="fx-particles absolute inset-0 pointer-events-none" />
        <div className="fx-diag absolute inset-0 pointer-events-none" />
        <div className="fx-corner-tl" />
        <div className="fx-corner-tr" />
        <div className="fx-corner-bl" />
        <div className="fx-corner-br" />
        <div className="fx-topline" />
        <div className="fx-botline" />
      </div>

      {/* ── Nav menu ── */}
      <NavMenu current={view} onChange={setView} />

      {/* ══════════════ CINEMATIC VIEW ══════════════ */}
      {view === 'cinematic' && (
        <div className="cinematic-scroll relative z-10">
          <HeroSection onNavigate={setView} />
          {filteredGames.length > 0 ? (
            filteredGames.map((game, i) => (
              <CinematicCard key={game.id} game={game} index={i} total={filteredGames.length} />
            ))
          ) : (
            <div className="cinematic-snap h-screen flex flex-col items-center justify-center gap-4">
              <p className="text-zinc-500 font-bold text-lg">No games match your current filters</p>
              <div className="flex gap-3">
                <button onClick={clearFilters} className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition">
                  Clear Filters
                </button>
                <button onClick={() => setView('browse')} className="px-4 py-2 bg-[#0088DD] text-white rounded-lg text-sm font-semibold hover:bg-[#006AAE] transition">
                  Full List
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ BROWSE VIEW ══════════════ */}
      {view === 'browse' && (
        <div className="relative z-10 p-4 md:p-8 pt-16">
          <header className="max-w-7xl mx-auto mb-8 space-y-6">
            <div className="border-b border-zinc-800 pb-6">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">GACHA PRODUCTION PIPELINE</h1>
              <p className="text-xs text-zinc-400">Database: <span className="text-zinc-200 font-mono">07/20/2025</span></p>
            </div>

            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Filter titles..."
              className="w-full bg-zinc-900/70 backdrop-blur-sm text-zinc-100 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD] transition"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-wider text-zinc-400 uppercase mb-2">Platform</label>
                <div className="flex flex-wrap gap-2">
                  {['All','PC','Android','iOS','PlayStation','Xbox'].map(p => (
                    <button key={p} onClick={() => setPlatformFilter(p)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${platformFilter === p ? 'bg-[#0088DD] border-[#0088DD] text-white' : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                    >{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black tracking-wider text-zinc-400 uppercase mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTS.map(({ label, active }) => (
                    <button key={label} onClick={() => setStatusFilter(label)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${statusFilter === label ? active : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                    >{label}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'gameplay', label: 'Gameplay', value: gameplayFilter, set: setGameplayFilter,
                    opts: [['All','All Gameplay'],['Real-time','Real-time'],['Turn-Based','Turn-Based'],['Rhythm','Rhythm']] },
                  { id: 'environment', label: 'Environment', value: environmentFilter, set: setEnvironmentFilter,
                    opts: [['All','All Environments'],['3D Environment','3D Environment'],['Stage-Based','Stage-Based']] },
                ].map(({ id, label, value, set, opts }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-black tracking-wider text-zinc-400 uppercase mb-2">{label}</label>
                    <select id={id} value={value} onChange={e => set(e.target.value)}
                      className="w-full bg-zinc-900/70 backdrop-blur-sm text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD]"
                    >
                      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
                  className="flex-1 bg-zinc-900/70 backdrop-blur-sm text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088DD]"
                >
                  <option value="release-asc">Release: Soonest First</option>
                  <option value="release-desc">Release: Furthest First</option>
                  <option value="name-asc">Name: A → Z</option>
                  <option value="name-desc">Name: Z → A</option>
                </select>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="px-4 py-2.5 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition whitespace-nowrap">
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-mono">{filteredGames.length} of {ALL_GAMES_DATA.length} games</p>
          </header>

          <main className="max-w-7xl mx-auto">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map(game => {
                  const confirmed = game.releaseDate.includes('[Confirmed]');
                  const displayDate = game.releaseDate.replace(' [Confirmed]', '');
                  const links = [
                    { label:'Trailer',  url:game.trailerUrl,  cls:'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' },
                    { label:'Gameplay', url:game.gameplayUrl, cls:'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' },
                    { label:'Pre-Reg',  url:game.preRegUrl,   cls:'bg-[#0088DD] text-white hover:bg-[#006AAE]' },
                  ].filter(l => isRealUrl(l.url));

                  return (
                    <article key={game.id} className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl shadow-xl overflow-hidden flex flex-col hover:border-zinc-700 transition-all">
                      <CardImage src={game.image} name={game.name} />
                      <div className="p-5 space-y-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h2 className="text-base font-bold text-zinc-100 line-clamp-2">{game.name}</h2>
                            <span className={`shrink-0 text-[10px] font-black px-2 py-1 rounded border ${confirmed ? 'bg-emerald-900/50 border-emerald-700/60 text-emerald-300' : 'bg-amber-900/30 border-amber-700/40 text-amber-400'}`}>
                              {confirmed ? '✓' : '?'}
                            </span>
                          </div>
                          {game.developer && <p className="text-[11px] font-semibold text-zinc-400 mb-1">{game.developer}</p>}
                          <p className="text-xs text-zinc-500">{game.environment} · {game.gameplay}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {game.platforms.map(p => (
                            <span key={p} className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">{p}</span>
                          ))}
                        </div>
                        <div className="flex-1" />
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                          <div className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${confirmed ? 'bg-emerald-950/60 border-emerald-800/50' : 'bg-amber-950/40 border-amber-800/30'}`}>
                            <span className={`text-sm font-black ${confirmed ? 'text-emerald-300' : 'text-amber-400'}`}>{displayDate}</span>
                            <span className={`text-[10px] font-black tracking-wider ${confirmed ? 'text-emerald-500' : 'text-amber-500'}`}>{confirmed ? 'CONFIRMED' : 'TBA'}</span>
                          </div>
                          {links.length > 0 ? (
                            <div className={`grid gap-2 ${links.length===3?'grid-cols-3':links.length===2?'grid-cols-2':'grid-cols-1'}`}>
                              {links.map(l => (
                                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                                  className={`${l.cls} py-2.5 rounded-lg text-center text-xs font-bold transition`}
                                >{l.label}</a>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-xs text-zinc-600 py-1">No links yet</p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
                <p className="text-zinc-500 font-bold">No games match your filters</p>
                <button onClick={clearFilters} className="mt-4 px-4 py-2.5 bg-zinc-800 text-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition">
                  Reset
                </button>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ══════════════ SUGGESTIONS VIEW ══════════════ */}
      {view === 'suggestions' && <SuggestionsTab />}

      {/* ══════════════ REVENUE VIEW ══════════════ */}
      {view === 'revenue' && <RevenueTab />}
    </div>
  );
}
