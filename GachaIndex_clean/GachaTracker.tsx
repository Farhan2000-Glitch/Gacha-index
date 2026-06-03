'use client';

import React, { useState, useEffect, useMemo } from 'react';

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

/* Mouse spotlight */
.fx-spotlight {
  background: radial-gradient(700px circle at var(--mx) var(--my), rgba(0,136,221,0.14), transparent 70%);
}

/* Tech grid */
.fx-grid {
  background-image:
    linear-gradient(rgba(0,136,221,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,136,221,0.045) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Mesh orbs */
.fx-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.fx-orb-1 {
  width: min(800px, 70vw); height: min(800px, 70vw);
  background: radial-gradient(circle, rgba(0,136,221,0.22) 0%, transparent 65%);
  filter: blur(100px);
  top: -15%; left: -8%;
  animation: orbDrift1 26s ease-in-out infinite;
}
.fx-orb-2 {
  width: min(600px, 55vw); height: min(600px, 55vw);
  background: radial-gradient(circle, rgba(127,119,221,0.2) 0%, transparent 65%);
  filter: blur(85px);
  bottom: -12%; right: -6%;
  animation: orbDrift2 33s ease-in-out infinite;
}
.fx-orb-3 {
  width: min(520px, 48vw); height: min(520px, 48vw);
  background: radial-gradient(circle, rgba(29,158,117,0.14) 0%, transparent 65%);
  filter: blur(90px);
  top: 35%; left: 38%;
  animation: orbDrift3 21s ease-in-out infinite;
}
.fx-orb-4 {
  width: min(350px, 35vw); height: min(350px, 35vw);
  background: radial-gradient(circle, rgba(232,83,61,0.1) 0%, transparent 65%);
  filter: blur(70px);
  top: 60%; left: 10%;
  animation: orbDrift4 18s ease-in-out infinite;
}

@keyframes orbDrift1 {
  0%,100% { transform: translate(0,0) scale(1); }
  25%  { transform: translate(12%,7%) scale(1.06); }
  50%  { transform: translate(-7%,18%) scale(0.94); }
  75%  { transform: translate(9%,-11%) scale(1.09); }
}
@keyframes orbDrift2 {
  0%,100% { transform: translate(0,0); }
  33% { transform: translate(-19%,-9%); }
  66% { transform: translate(9%,15%); }
}
@keyframes orbDrift3 {
  0%,100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-13%,17%) scale(1.28); }
}
@keyframes orbDrift4 {
  0%,100% { transform: translate(0,0) rotate(0deg); }
  50% { transform: translate(25%,-20%) rotate(180deg); }
}

/* Cinematic snap scroll container */
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

// ─────────────────────────────────── BROWSE CARD IMAGE ──
const CardImage = ({ src, name }: { src: string; name: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const bg = avatarBg(name);
  return (
    <div className="relative w-full h-40 bg-zinc-800 overflow-hidden rounded-t-xl">
      {!loaded && !err && <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />}
      {!err && src ? (
        <img src={src} alt={name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)} onError={() => { setErr(true); setLoaded(true); }}
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const confirmed = game.releaseDate.includes('[Confirmed]');
  const displayDate = game.releaseDate.replace(' [Confirmed]', '');
  const bg = avatarBg(game.name);
  const ini = nameInitials(game.name);

  const links = [
    { label: 'Trailer',  url: game.trailerUrl,  cls: 'border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm' },
    { label: 'Gameplay', url: game.gameplayUrl, cls: 'border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm' },
    { label: 'Pre-Reg',  url: game.preRegUrl,   cls: 'bg-[#0088DD] hover:bg-[#006AAE] text-white' },
  ].filter(l => isRealUrl(l.url));

  return (
    <section className="cinematic-snap relative h-screen overflow-hidden flex items-center">
      {/* Blurred background image */}
      {game.image ? (
        <div className="absolute inset-0 scale-110" style={{
          backgroundImage: `url(${game.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(55px) brightness(0.17) saturate(1.8)',
        }} />
      ) : (
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 30% 50%, ${bg}30, transparent 70%)`,
        }} />
      )}

      {/* Gradient vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-transparent to-zinc-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-14">

        {/* Left — artwork */}
        <div className="w-full md:w-[420px] shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.7)] border border-white/10 aspect-video bg-zinc-900">
            {game.image && (
              <img src={game.image} alt={game.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
              />
            )}
            {(!game.image || !imgLoaded) && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-6xl" style={{ backgroundColor: bg }}>
                {ini}
              </div>
            )}
          </div>
        </div>

        {/* Right — info */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Title + developer */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {game.name}
            </h2>
            {game.developer && (
              <p className="mt-2 text-[#0088DD] font-semibold text-sm md:text-base">{game.developer}</p>
            )}
          </div>

          <p className="text-zinc-400 text-sm">{game.environment} · {game.gameplay}</p>

          {/* Platform badges */}
          <div className="flex flex-wrap gap-2">
            {game.platforms.map(p => (
              <span key={p} className="bg-white/10 border border-white/10 text-zinc-200 text-xs px-3 py-1 rounded-full font-mono font-bold">
                {p}
              </span>
            ))}
          </div>

          {/* Release status */}
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

          {/* Links */}
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

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-5 inset-x-0 flex items-center justify-between px-8 pointer-events-none select-none">
        <span className="text-[11px] text-zinc-600 font-mono tabular-nums">{index + 1} / {total}</span>
        {index < total - 1 && (
          <span className="text-[11px] text-zinc-600 font-mono animate-bounce">scroll ↓</span>
        )}
        {index === total - 1 && (
          <span className="text-[11px] text-zinc-600 font-mono">end of list</span>
        )}
      </div>
    </section>
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
  const [view, setView] = useState<'cinematic' | 'browse'>('cinematic');
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [gameplayFilter, setGameplayFilter] = useState('All');
  const [environmentFilter, setEnvironmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('release-asc');

  // Mouse spotlight via CSS custom property — zero re-renders
  useEffect(() => {
    const h = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // Persist filters
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
    if (f.view) setView(f.view);
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

      {/* ── Fixed background FX (both views) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="fx-spotlight absolute inset-0" />
        <div className="fx-grid absolute inset-0" />
        <div className="fx-orb fx-orb-1" />
        <div className="fx-orb fx-orb-2" />
        <div className="fx-orb fx-orb-3" />
        <div className="fx-orb fx-orb-4" />
      </div>

      {/* ── View toggle (always on top) ── */}
      <div className="fixed top-4 right-4 z-50 flex items-center bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-full p-1 shadow-2xl">
        <button
          onClick={() => setView('cinematic')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'cinematic' ? 'bg-[#0088DD] text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          Cinematic
        </button>
        <button
          onClick={() => setView('browse')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'browse' ? 'bg-[#0088DD] text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          Browse
        </button>
      </div>

      {/* ══════════════ CINEMATIC VIEW ══════════════ */}
      {view === 'cinematic' && (
        <div className="cinematic-scroll relative z-10">
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
                  Open Browse
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
              {/* Platform pills */}
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

              {/* Status pills */}
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

              {/* Gameplay + Environment */}
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

              {/* Sort + clear */}
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
    </div>
  );
}
