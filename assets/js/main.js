/* ============================================================
   NodeRoll — interactions & generated content (vanilla JS)
   No external deps. Self-contained art via CSS gradients + glyphs.
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const pick = a => a[(Math.random() * a.length) | 0];
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- shared palette of brand gradients + safe glyphs ---------- */
  const GRADS = [
    "linear-gradient(150deg,#5a1bff,#f50bba)",
    "linear-gradient(150deg,#13aded,#4405e4)",
    "linear-gradient(150deg,#f50bba,#ffb347)",
    "linear-gradient(150deg,#4a0f8f,#7a1366)",
    "linear-gradient(150deg,#0d2a66,#125a7a)",
    "linear-gradient(150deg,#7a1366,#13aded)",
    "linear-gradient(150deg,#4405e4,#13aded)",
    "linear-gradient(150deg,#2a0b6b,#f50bba)"
  ];
  const AV_GRADS = ["#4405e4,#13aded","#f50bba,#5a1bff","#13aded,#36e0a0","#7a1366,#f50bba","#5a14b8,#13507f","#f5a300,#f50bba","#4405e4,#f50bba","#125a7a,#36e0a0"];
  const AV_GLYPHS = ["ic-dice","ic-diamond","ic-spade","ic-rocket","ic-coin","ic-wheel","ic-crown","ic-ball","ic-cards","ic-flame","ic-star","ic-hexagon"];
  const hashStr = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h; };
  // deterministic, on-theme avatar (casino/crypto glyph on a brand gradient), stable per username
  const avatarFor = u => { const h = hashStr(String(u)); return { grad: AV_GRADS[h % AV_GRADS.length], glyph: AV_GLYPHS[(h >>> 4) % AV_GLYPHS.length] }; };
  let CHAT_AVATARS = null;   // populated from manifest; uploaded avatar images take over the glyphs
  const applyAvatar = (av, user) => {
    if (CHAT_AVATARS && CHAT_AVATARS.length) {
      const im = el("img", "msg__avimg"); im.alt = ""; im.loading = "eager";
      im.onload = () => { av.innerHTML = ""; av.style.background = "none"; av.appendChild(im); };
      im.src = "assets/img/" + CHAT_AVATARS[hashStr(String(user)) % CHAT_AVATARS.length];
    } else {
      const a = avatarFor(user);
      av.innerHTML = `<svg class="ic" aria-hidden="true"><use href="#${a.glyph}"/></svg>`;
      av.style.background = `linear-gradient(135deg,${a.grad})`;
    }
  };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* =================================================================
     Toast
  ================================================================== */
  const toastEl = $("#toast");
  let toastT;
  const toast = msg => {
    toastEl.innerHTML = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  };

  /* =================================================================
     In-house games strip
  ================================================================== */
  const inhouse = [
    { n: "Mines", key: "mines", ic: "ic-diamond" }, { n: "Crash", key: "crash", ic: "ic-rocket" },
    { n: "Dice", key: "dice", ic: "ic-dice" }, { n: "Plinko", key: "plinko", ic: "ic-plinko" },
    { n: "HILO", key: "hilo", ic: "ic-cards" }
  ];
  const strip = $("#ingameStrip");
  inhouse.forEach((it, i) => {
    const t = el("button", "ingame", `<svg class="ic"><use href="#${it.ic}"/></svg>`);
    t.style.background = GRADS[i % GRADS.length];
    t.dataset.key = it.key;
    t.setAttribute("aria-label", it.n);
    t.title = it.n;
    t.addEventListener("click", () => $("#play").scrollIntoView({ behavior: "smooth", block: "start" }));
    strip.appendChild(t);
  });

  /* =================================================================
     Winners live feed (seamless marquee = list rendered twice)
  ================================================================== */
  const users = ["@frostbyte", "@0xMidas", "@degenwhale", "@nyx_rolls", "@vortex", "@lunabit",
    "@kaizoku", "@emberfox", "@zerocool", "@auroraXBT", "@grimwald", "@mochi.eth", "@bigslick", "@hexd", "@santi_btc"];
  const winGames = ["Aztec Gold", "Crash", "Mines", "Neon Reels", "Crypto Kong", "Wheel", "Frost Wilds", "Dice", "Lucky Pharaoh"];
  const buildWins = () => {
    const out = [];
    for (let i = 0; i < 16; i++) {
      const amt = pick([
        () => `${rand(0.004, 0.21).toFixed(4)} ₿`,
        () => `$${(rand(120, 8900)).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
        () => `${(rand(40, 4900)).toLocaleString("en-US", { maximumFractionDigits: 2 })} NODE`
      ])();
      out.push({ u: pick(users), g: pick(winGames), amt, c: GRADS[i % GRADS.length] });
    }
    return out;
  };
  const winTrack = $("#winTrack");
  const wins = buildWins();
  const ICON_FOR = { Crash: "ic-rocket", Mines: "ic-diamond", Dice: "ic-dice", Wheel: "ic-wheel" };
  const gameIcon = n => ICON_FOR[n] || "ic-slots";
  const winNode = w => {
    const li = el("li", "win");
    const ic = el("span", "win__ic", `<svg class="ic"><use href="#${gameIcon(w.g)}"/></svg>`); ic.style.background = w.c;
    li.append(ic, el("span", "win__who", w.g + " · " + w.u), el("span", "win__amt", "+" + w.amt));
    return li;
  };
  [...wins, ...wins].forEach(w => winTrack.appendChild(winNode(w)));

  /* =================================================================
     Publishers — fill live "playing" counts
  ================================================================== */
  $$(".pub .pub__meta b").forEach(b => { b.textContent = (rand(120, 15000) | 0).toLocaleString("en-US"); });

  /* =================================================================
     Latest bets table
  ================================================================== */
  const betGames = ["1 Reel Monkey", "Boomchest", "1 Reel - Trading Frenzy", "10 Devils Hotfire",
    "1 Reel - Xmas Magic", "100 Flaring Fruits", "1 Reel Santa", "1 Reel Reef", "81 Burning Ways",
    "Ancient Egypt", "Sweet Bonanza", "Gates of Olympus", "Sugar Rush", "Big Bass Splash"];
  const betsBody = $("#betsBody");
  if (betsBody) {
    const stamp = off => new Date(Date.now() - off * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const player = () => pick(["User" + (rand(100000, 999999) | 0), pick(users).replace("@", ""), "AugustHamilton908", "numlugar5", "88ccccc"]);
    for (let i = 0; i < 10; i++) {
      const amt = rand(0.03, 2.6);
      const mx = pick([0, 0, 0.19, 0.5, 0.21, 0.58, 0.2, 1.67, 3.5, 87.03, 383.33]);
      const win = mx >= 1, pay = amt * mx;
      const li = el("li", "bet");
      li.innerHTML =
        `<span class="bet__game"><span class="bet__thumb"></span><span class="bet__name">${betGames[i % betGames.length]}</span></span>
         <span class="bet__time">${stamp(i * 5 + (rand(0, 4) | 0))}</span>
         <span class="bet__player">${player()}</span>
         <span class="bet__amt">$${amt.toFixed(2)}</span>
         <span class="bet__mult${win ? " is-win" : ""}">x${mx.toFixed(2)}</span>
         <span class="bet__amt${win ? " is-win" : ""}">$${pay.toFixed(2)}</span>`;
      betsBody.appendChild(li);
    }
  }

  /* =================================================================
     Game cards (rails + grids)
  ================================================================== */
  const card = (g, i) => {
    const c = el("a", "gcard"); c.href = "#play";
    c.dataset.imgkey = g.img || g.key; c.dataset.name = g.n;
    if (g.orig) c.dataset.section = "originals";   // originals use their own image set
    const art = el("div", "gcard__art");
    art.innerHTML = NR_ART.gameArt(g.art || g.key);
    if (g.tag) art.appendChild(el("span", "gcard__tag", g.tag));
    if (g.mult) art.appendChild(el("span", "gcard__mult", g.mult));
    art.insertAdjacentHTML("beforeend",
      `<div class="gcard__foot"><span class="gcard__meta"><span class="dot dot--live"></span>${g.p} playing</span></div>
       <div class="gcard__play"><span>Play</span></div>`);
    c.appendChild(art);
    c.addEventListener("click", e => {
      if (g.orig) { e.preventDefault(); $("#play").scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
    return c;
  };
  const players = () => (rand(120, 3200) | 0).toLocaleString("en-US");

  const originals = [
    { n: "Mines", key: "mines", mult: "x24", orig: 1 }, { n: "Crash", key: "crash", mult: "x96", orig: 1 },
    { n: "Dice", key: "dice", mult: "x9.9", orig: 1 }, { n: "Plinko", key: "plinko", mult: "x555", orig: 1 },
    { n: "HILO", key: "hilo", mult: "x10.5", orig: 1 }, { n: "Wheel", key: "wheel", mult: "x50", orig: 1 },
    { n: "Tower", key: "tower", mult: "x40", orig: 1 }, { n: "Keno", key: "keno", mult: "x12.5", orig: 1 },
    { n: "Limbo", key: "limbo", mult: "x1k", orig: 1 }, { n: "Coinflip", key: "coinflip", mult: "x2", orig: 1 }
  ];
  const origRail = $("#origRail");
  originals.forEach((g, i) => { g.p = players(); origRail.appendChild(card(g, i)); });

  const slotNames = ["Aztec Gold", "Neon Reels", "Cyber Fortune", "Crypto Kong", "Lucky Pharaoh",
    "Frost Wilds", "Diamond Rush", "Voodoo Nights", "Pirate's Hoard", "Samurai Spins", "Golden Yeti",
    "Midnight Joker", "Inferno 7s", "Stellar Drift", "Rune Bound", "Toxic Reels"];
  const fillGrid = (id, tags, off = 0) => {
    const host = $(id);
    for (let i = 0; i < 12; i++) {
      const nm = slotNames[(i + off) % slotNames.length];
      const g = { n: nm, art: NR_ART.slotKey(i + off), img: slug(nm), p: players() };
      if (tags && i % 3 === 0) g.tag = pick(tags);
      host.appendChild(card(g, i + off));
    }
  };
  fillGrid("#topGrid", ["HOT", "TOP"]);
  fillGrid("#newGrid", ["NEW"], 4);
  fillGrid("#slotGrid", ["LIVE"], 8);

  // ---- HERO: layered peek-carousel (gradient placeholder bg -> uploaded art) ----
  // Each slide shares one layout; copy is unique per slide. Background + character
  // images (if uploaded) upgrade over the gradient/placeholder via the manifest.
  const HERO_SLIDES = [
    { eyebrow: "Welcome package", badges: ["Provably fair"], title: "BIGGER BETS,<br>BIGGER WINS",
      sub: "Deposit and get up to 1000 free spins + $3,500.", cta: "Join &amp; win", cta2: "How it works",
      to: "#originals", grad: "linear-gradient(115deg,#2a0b6b 0%,#4405e4 55%,#13aded 120%)" },
    { eyebrow: "Instant payouts", badges: ["On-chain"], title: "REAL WINS,<br>REAL FAST",
      sub: "Withdraw straight to your wallet — no waiting, no limits.", cta: "Spin today",
      to: "#play", grad: "linear-gradient(115deg,#3a0f7a 0%,#7a1366 50%,#f50bba 120%)" },
    { eyebrow: "Tonight only", badges: ["Daily case", "Rakeback"], title: "YOUR JACKPOT<br>AWAITS TONIGHT",
      sub: "Open daily cases, climb the weekly race and claim rakeback.", cta: "Claim bonus",
      to: "#promos", grad: "linear-gradient(115deg,#0e2a63 0%,#125a7a 55%,#13aded 120%)" },
    { eyebrow: "NodeRoll Originals", badges: ["1% house edge"], title: "SPIN. WIN.<br>REPEAT.",
      sub: "Mines, Crash, Plinko, Dice and more — provably fair.", cta: "Play now",
      to: "#originals", grad: "linear-gradient(115deg,#4a0f8f 0%,#7a1366 55%,#f50bba 120%)" }
  ];
  const buildHero = () => {
    const track = $("#heroTrack"), dotsHost = $("#heroDots");
    if (!track) return null;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const slides = HERO_SLIDES.map((s, i) => {
      const slide = el("article", "hslide"); slide.dataset.slide = i;
      const bg = el("div", "hslide__bg"); bg.style.background = s.grad;
      const extra = (s.badges || []).map(b => `<span class="hbadge">${b}</span>`).join("");
      const ctas = `<a class="btn btn--primary" href="${s.to}" data-to="${s.to}">${s.cta}</a>` +
        (s.cta2 ? `<a class="btn btn--quiet" href="${s.to}" data-to="${s.to}">${s.cta2}</a>` : "");
      const content = el("div", "hslide__content",
        `<div class="hslide__badges"><span class="hbadge hbadge--hot">${s.eyebrow}</span>${extra}</div>
         <h2 class="hslide__title">${s.title}</h2>
         <p class="hslide__sub">${s.sub}</p>
         <div class="hslide__cta">${ctas}</div>`);
      slide.append(bg, el("div", "hslide__scrim"), content);
      track.appendChild(slide);
      const dot = el("button", "hero__dot" + (i ? "" : " is-active")); dot.type = "button";
      dot.setAttribute("aria-label", "Banner " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsHost.appendChild(dot);
      return slide;
    });
    const dots = [...dotsHost.children];
    let idx = 0, timer = null;
    const goTo = i => { idx = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[idx].offsetLeft - slides[0].offsetLeft, behavior: reduce ? "auto" : "smooth" }); };
    let raf = 0;
    const syncDots = () => { const base = slides[0].offsetLeft, x = track.scrollLeft;
      let best = 0, bestD = Infinity;
      slides.forEach((s, k) => { const d = Math.abs((s.offsetLeft - base) - x); if (d < bestD) { bestD = d; best = k; } });
      idx = best; dots.forEach((d, k) => d.classList.toggle("is-active", k === best)); };
    track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(syncDots); }, { passive: true });
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const play = () => { if (reduce) return; stop(); timer = setInterval(() => goTo(idx + 1), 5000); };
    const hero = $("#hero");
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : play());
    track.addEventListener("click", e => {
      const a = e.target.closest("[data-to]"); if (!a) return;
      const t = $(a.getAttribute("data-to")); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
    play();
    return slides;
  };
  const heroSlides = buildHero();
  const upgradeHero = m => {
    if (!heroSlides) return;
    heroSlides.forEach((slide, i) => {
      const bgFile = m.heroBg && m.heroBg["bg-" + (i + 1)];
      if (bgFile) { const im = el("img"); im.alt = ""; im.loading = "eager";
        im.onload = () => { const host = slide.querySelector(".hslide__bg"); host.innerHTML = ""; host.appendChild(im); };
        im.src = "assets/img/" + bgFile; }
      const chFile = m.heroChar && m.heroChar["char-" + (i + 1)];
      if (chFile) { const im = el("img", "hslide__char"); im.alt = ""; im.loading = "eager";
        im.onload = () => slide.appendChild(im);
        im.src = "assets/img/" + chFile; }
    });
  };
  const upgradeCardArt = (cardEl, file, alt) => {
    const im = el("img", "art"); im.alt = alt || ""; im.width = 300; im.height = 400; im.loading = "eager";
    im.onload = () => { const cur = cardEl.querySelector(".gcard__art .art"); if (cur) cur.replaceWith(im); };
    im.src = "assets/img/" + file;          // swaps over the SVG only once it actually loads
  };
  const upgradeIcon = (btn, file, alt) => {
    const im = el("img", "ingame__img"); im.alt = alt || ""; im.width = 48; im.height = 48; im.loading = "eager";
    im.onload = () => { btn.innerHTML = ""; btn.appendChild(im); };   // keep the tile gradient behind the 3D icon
    im.src = "assets/img/" + file;
  };
  // Colored icons must keep their own palette -> rendered as <img>. Everything else is
  // inline-injected so `currentColor` follows the theme (incl. hover/active states);
  // near-black hard-coded fills are normalised to currentColor so they stay visible.
  const IMG_ICONS = new Set(["currency", "node"]);
  const DARK_FILL = /fill="#(0{3}|0{6}|1c274c)"/ig;
  const inlineIcon = (host, file) => {
    fetch("assets/img/" + file).then(r => r.ok ? r.text() : null).then(txt => {
      if (!txt || !/<svg/i.test(txt)) return;
      const svg = el("div", null, txt.replace(DARK_FILL, 'fill="currentColor"')).querySelector("svg");
      if (!svg) return;
      svg.removeAttribute("width"); svg.removeAttribute("height"); svg.removeAttribute("style");
      svg.setAttribute("class", "uic");
      const old = host.querySelector("svg"); if (old) old.replaceWith(svg); else { host.textContent = ""; host.appendChild(svg); }
    }).catch(() => {});
  };
  const imgIcon = (host, file, cls) => {
    const im = el("img", cls); im.alt = ""; im.loading = "eager";
    im.onload = () => { const old = host.querySelector("svg"); if (old) old.replaceWith(im); else { host.textContent = ""; host.style.background = "none"; host.appendChild(im); } };
    im.src = "assets/img/" + file;
  };
  const wireIcons = (sel, table, attr) => {
    if (!table) return;
    $$(sel).forEach(h => { const k = h.dataset[attr], f = table[k]; if (!f) return; IMG_ICONS.has(k) ? imgIcon(h, f, "ui__img") : inlineIcon(h, f); });
  };
  // replace a host's contents entirely with an uploaded image (clears bg/glyph)
  const imgFill = (host, file, cls) => {
    const im = el("img", cls); im.alt = ""; im.loading = "eager";
    im.onload = () => { host.textContent = ""; host.style.background = "none"; host.appendChild(im); };
    im.src = "assets/img/" + file;
  };
  const wireFill = (sel, table, attr, cls) => {
    if (!table) return;
    $$(sel).forEach(h => { const f = table[h.dataset[attr]]; if (f) imgFill(h, f, cls); });
  };
  fetch("assets/img/manifest.json", { cache: "no-cache" })
    .then(r => r.ok ? r.json() : null)
    .then(m => {
      if (!m) return;
      upgradeHero(m);
      $$(".gcard[data-imgkey]").forEach(c => {
        const t = c.dataset.section === "originals" ? m.originals : m.games;
        const f = t && t[c.dataset.imgkey]; if (f) upgradeCardArt(c, f, c.dataset.name);
      });
      if (m.icons) $$(".ingame[data-key]").forEach(t => { const f = m.icons[t.dataset.key]; if (f) upgradeIcon(t, f, t.title); });
      wireIcons(".nav__item[data-nav]", m.sidebar, "nav");
      wireIcons("[data-topnav]", m.topnav, "topnav");
      wireIcons("[data-ui]", m.ui, "ui");
      if (m.sidebar) $$("[data-secicon]").forEach(h => { const f = m.sidebar[h.dataset.secicon]; if (f) inlineIcon(h, f); });
      if (m.features) $$("[data-feature]").forEach(h => { const f = m.features[h.dataset.feature]; if (f) imgIcon(h, f, "pcard__img"); });
      wireFill("[data-reward]", m.rewards, "reward", "rw__img");
      wireFill("[data-stat]", m.stats, "stat", "tile__icimg");
      wireFill("[data-level]", m.level, "level", "level__img");
      wireFill("[data-mines]", m.mines, "mines", "board__charimg");
      wireFill("[data-excl]", m.excl, "excl", "excl__img");
      if (m.publishers) $$(".pub[data-publisher]").forEach(p => {
        const f = m.publishers[p.dataset.publisher]; if (!f) return;
        const logo = p.querySelector(".pub__logo"); const im = el("img");
        im.alt = logo.textContent.trim(); im.loading = "eager";
        im.onload = () => { logo.textContent = ""; logo.appendChild(im); };
        im.src = "assets/img/" + f;
      });
      if (Array.isArray(m.wins) && m.wins.length) $$(".bet__thumb").forEach((t, i) => {
        const im = el("img"); im.alt = ""; im.loading = "eager";
        im.onload = () => { t.appendChild(im); };
        im.src = "assets/img/" + m.wins[i % m.wins.length];
      });
      if (Array.isArray(m.avatars) && m.avatars.length) {
        CHAT_AVATARS = m.avatars;
        $$(".msg__av[data-user]").forEach(av => applyAvatar(av, av.dataset.user));
      }
      if (m.crypto) $$(".pay[data-coin]").forEach(p => {
        const f = m.crypto[p.dataset.coin]; if (!f) return;
        const im = el("img", "pay__img"); im.alt = p.textContent.trim(); im.loading = "eager";
        im.onload = () => { p.textContent = ""; p.appendChild(im); };
        im.src = "assets/img/" + f;
      });
      if (Array.isArray(m.wins) && m.wins.length) $$(".win__ic").forEach((ic, i) => {
        const im = el("img", "win__img"); im.alt = ""; im.loading = "eager";
        im.onload = () => { ic.textContent = ""; ic.style.background = "none"; ic.appendChild(im); };
        im.src = "assets/img/" + m.wins[i % m.wins.length];
      });
      if (m.promos) $$(".spromo[data-promo]").forEach(s => {
        const f = m.promos[s.dataset.promo]; if (!f) return;
        const im = el("img", "spromo__img"); im.alt = ""; im.loading = "eager";
        im.onload = () => s.appendChild(im);
        im.src = "assets/img/" + f;
      });
    })
    .catch(() => {});

  /* =================================================================
     MINES — interactive demo (provably-fair style multipliers)
  ================================================================== */
  const TILES = 25;
  const grid = $("#minesGrid");
  const mineRange = $("#mineRange");
  const betInput = $("#betInput");
  const betBtn = $("#betBtn");
  const cashBtn = $("#cashBtn");
  const cashMultEl = $("#cashMult");
  const nextMultEl = $("#nextMult");
  const profitEl = $("#profitOut");
  const safeCountEl = $("#safeCount");
  const mineLabel = $("#mineCountLabel");
  const multibar = $("#multibar");
  let balance = 2.84190;

  const M = { mines: 5, active: false, picks: 0, bombs: new Set() };

  // fair multiplier after k safe picks with m mines (1% house edge)
  const mult = (m, k) => { let x = 1; for (let i = 0; i < k; i++) x *= (TILES - i) / (TILES - m - i); return x * 0.99; };
  const bet = () => Math.max(0, parseFloat(betInput.value) || 0);

  const tiles = [];
  for (let i = 0; i < TILES; i++) {
    const t = el("button", "cell"); t.type = "button"; t.dataset.i = i;
    t.setAttribute("aria-label", "Tile " + (i + 1));
    t.addEventListener("click", () => reveal(i));
    grid.appendChild(t); tiles.push(t);
  }

  const renderMultibar = () => {
    multibar.innerHTML = "";
    for (let k = 1; k <= 8; k++) {
      const step = el("div", "mstep" + (k <= M.picks ? " is-on" : ""),
        `<b>${mult(M.mines, k).toFixed(2)}×</b><small>${k} safe</small>`);
      multibar.appendChild(step);
    }
  };
  const syncStats = () => {
    const cur = M.picks ? mult(M.mines, M.picks) : 1;
    cashMultEl.textContent = cur.toFixed(2) + "×";
    nextMultEl.textContent = mult(M.mines, M.picks + 1).toFixed(2) + "×";
    profitEl.textContent = "+" + (bet() * (cur - 1)).toFixed(5);
    safeCountEl.textContent = `Gems ${M.picks} · Mines ${M.mines}`;
  };
  const setRangeFill = () => {
    const pct = ((mineRange.value - mineRange.min) / (mineRange.max - mineRange.min)) * 100;
    mineRange.style.setProperty("--fill", pct + "%");
  };

  const startRound = () => {
    if (M.active) return;
    if (bet() <= 0) return toast("Enter a bet amount");
    if (bet() > balance) return toast("Insufficient balance");
    M.active = true; M.picks = 0; M.bombs = new Set();
    while (M.bombs.size < M.mines) M.bombs.add((Math.random() * TILES) | 0);
    tiles.forEach(t => { t.className = "cell"; t.textContent = ""; t.disabled = false; });
    betBtn.hidden = true; cashBtn.hidden = false; mineRange.disabled = true;
    renderMultibar(); syncStats();
  };

  const endRound = (busted, idx) => {
    M.active = false;
    tiles.forEach((t, i) => {
      t.disabled = true;
      if (M.bombs.has(i)) { if (!t.classList.contains("is-gem")) { t.classList.add("is-mine"); t.textContent = "✸"; } }
      else if (!t.classList.contains("is-gem")) t.classList.add("is-dim");
    });
    if (busted) tiles[idx].classList.add("is-mine");
    betBtn.hidden = false; cashBtn.hidden = true; mineRange.disabled = false;
    setTimeout(() => { tiles.forEach(t => { t.className = "cell"; t.textContent = ""; }); M.picks = 0; renderMultibar(); syncStats(); }, 1700);
  };

  function reveal(i) {
    if (!M.active) return;
    const t = tiles[i];
    if (t.classList.contains("is-gem") || t.classList.contains("is-mine")) return;
    if (M.bombs.has(i)) {
      t.textContent = "✸"; t.classList.add("cell-reveal");
      toast("Busted on mine — round over");
      endRound(true, i);
      return;
    }
    M.picks++;
    t.classList.add("is-gem", "cell-reveal"); t.textContent = "◆"; t.disabled = true;
    renderMultibar(); syncStats();
    if (M.picks === TILES - M.mines) cashOut(); // cleared the board
  }

  function cashOut() {
    if (!M.active || M.picks === 0) { if (M.active) endRound(false); return; }
    const win = bet() * mult(M.mines, M.picks);
    toast(`Cashed out <b>${win.toFixed(5)} ₿</b> at ${mult(M.mines, M.picks).toFixed(2)}×`);
    endRound(false);
  }

  betBtn.addEventListener("click", startRound);
  cashBtn.addEventListener("click", cashOut);
  mineRange.addEventListener("input", () => {
    M.mines = +mineRange.value; mineLabel.textContent = M.mines;
    setRangeFill(); renderMultibar(); syncStats();
  });
  $$("[data-bet]").forEach(b => b.addEventListener("click", () => {
    let v = bet();
    if (b.dataset.bet === "half") v /= 2;
    else if (b.dataset.bet === "double") v *= 2;
    else if (b.dataset.bet === "max") v = balance;
    betInput.value = Math.min(v, balance).toFixed(5); syncStats();
  }));
  betInput.addEventListener("input", syncStats);
  // Manual/Auto inside panel
  $$("#minesPanel .seg__btn").forEach(b => b.addEventListener("click", () => {
    $$("#minesPanel .seg__btn").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    if (b.textContent.trim() === "Auto") toast("Auto mode is a demo");
  }));
  setRangeFill(); renderMultibar(); syncStats();

  /* =================================================================
     Community chat
  ================================================================== */
  const chatList = $("#chatList");
  const seed = [
    { u: "cryptobog", t: "anyone hit the crash bonus today?", m: 0 },
    { u: "nyx_rolls", t: "just pulled 47× on mines lets gooo", m: 0 },
    { u: "ModRavi", t: "keep it civil in chat please", m: 1 },
    { u: "degenwhale", t: "rakeback dropped, ty noderoll", m: 0 },
    { u: "lunabit", t: "winning and losing is part of the game :))", m: 0 },
    { u: "0xMidas", win: "Crash · 2.41×", gain: "0.0184 ₿" },
    { u: "emberfox", t: "what mines count u all run? i do 3", m: 0 },
    { u: "ModRavi", t: "weekly race ends in 2 days, grind up", m: 1 }
  ];
  const msgNode = (msg, seedN) => {
    const li = el("li", "msg chat__enter" + (msg.me ? " msg--me" : "") + (msg.win ? " msg--win" : ""));
    const av = el("span", "msg__av"); av.dataset.user = msg.u;
    applyAvatar(av, msg.u);
    const body = el("div", "msg__b");
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    body.innerHTML =
      `<div class="msg__top"><span class="msg__name${msg.m ? " msg__name--mod" : ""}">${msg.u}</span>` +
      (msg.m ? `<span class="msg__badge">MOD</span>` : "") +
      `<span class="msg__time">${time}</span></div>` +
      (msg.win
        ? `<div class="msg__txt">My win · ${msg.win}<span class="gain">+${msg.gain}</span></div>`
        : `<div class="msg__txt"></div>`);
    if (!msg.win) body.querySelector(".msg__txt").textContent = msg.t; // safe text
    li.append(av, body);
    return li;
  };
  seed.forEach((m, i) => chatList.appendChild(msgNode(m, i)));
  const scrollChat = () => { chatList.scrollTop = chatList.scrollHeight; };
  scrollChat();

  const chatForm = $("#chatForm"), chatField = $("#chatField");
  chatForm.addEventListener("submit", () => {
    const v = chatField.value.trim(); if (!v) return;
    chatList.appendChild(msgNode({ u: "you", t: v, me: 1 }, 1));
    chatField.value = ""; scrollChat();
    if (chatList.children.length > 50) chatList.firstElementChild.remove();
  });
  // ambient chatter
  const ambient = ["gl everyone", "that hilo streak was insane", "ty for the rain", "up 0.3 today not bad",
    "who's in the tournament", "mines is rigged in my favor today lol", "new slots are clean", "wen lambo"];
  const ambientTick = () => {
    if (!document.hidden && Math.random() > .35) {
      chatList.appendChild(msgNode({ u: pick(users).replace("@", ""), t: pick(ambient) }, (Math.random() * 6) | 0));
      if (chatList.children.length > 50) chatList.firstElementChild.remove();
      scrollChat();
    }
    setTimeout(ambientTick, rand(7000, 13000));
  };
  setTimeout(ambientTick, 8000);

  /* =================================================================
     UI: nav, chat toggle, rails, segments, counters
  ================================================================== */
  const app = $(".app");
  const grid2 = $("#contentGrid");
  const scrim = el("div", "nav-scrim"); app.appendChild(scrim);
  const isMobileNav = () => matchMedia("(max-width:860px)").matches;
  const isFloatChat = () => matchMedia("(max-width:1080px)").matches;

  $("#menuBtn").addEventListener("click", () => {
    const open = app.classList.toggle("nav-open");
    $("#menuBtn").setAttribute("aria-expanded", open);
  });
  scrim.addEventListener("click", () => app.classList.remove("nav-open"));
  $$(".navsub,.navlink").forEach(a => a.addEventListener("click", () => { if (isMobileNav()) app.classList.remove("nav-open"); }));

  // sidebar accordion groups (independent expand/collapse)
  $$(".navgroup__head").forEach(h => h.addEventListener("click", () => {
    const open = h.closest(".navgroup").classList.toggle("is-open");
    h.setAttribute("aria-expanded", String(open));
  }));

  // desktop: retract / expand the sidebar (smooth grid-column transition)
  const sidebarToggle = $("#sidebarToggle");
  if (sidebarToggle) sidebarToggle.addEventListener("click", () => {
    const collapsed = app.classList.toggle("sidebar-collapsed");
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    sidebarToggle.querySelector("use").setAttribute("href", collapsed ? "#ic-chevR" : "#ic-chevL");
  });

  const chatToggle = $("#chatToggle");
  chatToggle.addEventListener("click", () => {
    const cls = isFloatChat() ? "chat-open" : "chat-collapsed";
    const on = grid2.classList.toggle(cls);
    chatToggle.setAttribute("aria-expanded", isFloatChat() ? on : !on);
  });

  // rail arrows
  $$("[data-rail]").forEach(btn => btn.addEventListener("click", () => {
    const r = $("#" + btn.dataset.rail);
    r.scrollBy({ left: (+btn.dataset.dir) * Math.min(r.clientWidth * .8, 600), behavior: "smooth" });
  }));

  // sidebar casino/sports
  $$(".seg [data-mode]").forEach(b => b.addEventListener("click", () => {
    $$(".seg [data-mode]").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
    b.classList.add("is-active"); b.setAttribute("aria-selected", "true");
    if (b.dataset.mode === "sports") toast("Sportsbook is coming soon to NodeRoll");
  }));

  // gift countdowns
  const pad = n => String(n).padStart(2, "0");
  $$("[data-countdown]").forEach(b => {
    let s = +b.dataset.countdown;
    const tick = () => {
      s = s <= 0 ? 3600 + (Math.random() * 1800 | 0) : s - 1;
      b.textContent = `${pad((s / 3600) | 0)}:${pad(((s % 3600) / 60) | 0)}:${pad(s % 60)}`;
    };
    tick(); setInterval(tick, 1000);
  });

  // online count gentle flicker
  const oc = $("#onlineCount");
  setInterval(() => {
    if (document.hidden) return;
    const base = 24318 + ((Math.random() * 600) | 0) - 200;
    oc.textContent = base.toLocaleString("en-US");
  }, 3500);

  // sidebar "total bets placed" ticks up
  const tb = $("#totalBets");
  if (tb) {
    let total = 14433926705;
    setInterval(() => {
      if (document.hidden) return;
      total += (Math.random() * 4200) | 0;
      tb.textContent = total.toLocaleString("en-US");
    }, 1500);
  }

})();
