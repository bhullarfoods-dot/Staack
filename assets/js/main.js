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
  const AV_GRADS = ["#4405e4,#13aded","#f50bba,#5a1bff","#13aded,#36e0a0","#7a1366,#f50bba","#5a14b8,#13507f","#f5a300,#f50bba"];
  const avatar = seed => `background:linear-gradient(135deg,${AV_GRADS[seed % AV_GRADS.length]})`;
  const initials = n => n.replace(/[@_]/g, "").slice(0, 2).toUpperCase();

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
    { n: "Mines", ic: "ic-diamond" }, { n: "Crash", ic: "ic-rocket" }, { n: "Dice", ic: "ic-dice" },
    { n: "Plinko", ic: "ic-plinko" }, { n: "HILO", ic: "ic-cards" }
  ];
  const strip = $("#ingameStrip");
  inhouse.forEach((it, i) => {
    const t = el("button", "ingame", `<svg class="ic"><use href="#${it.ic}"/></svg>`);
    t.style.background = GRADS[i % GRADS.length];
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
     Game cards (rails + grids)
  ================================================================== */
  const card = (g, i) => {
    const c = el("a", "gcard"); c.href = "#play";
    const art = el("div", "gcard__art");
    art.innerHTML = NR_ART.gameArt(g.key);
    if (g.tag) art.appendChild(el("span", "gcard__tag", g.tag));
    if (g.mult) art.appendChild(el("span", "gcard__mult", g.mult));
    art.insertAdjacentHTML("beforeend",
      `<div class="gcard__foot"><span class="gcard__name">${g.n}</span>
       <span class="gcard__meta"><span class="dot dot--live"></span>${g.p} playing</span></div>
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
      const g = { n: slotNames[(i + off) % slotNames.length], key: NR_ART.slotKey(i + off), p: players() };
      if (tags && i % 3 === 0) g.tag = pick(tags);
      host.appendChild(card(g, i + off));
    }
  };
  fillGrid("#topGrid", ["HOT", "TOP"]);
  fillGrid("#newGrid", ["NEW"], 4);
  fillGrid("#slotGrid", ["LIVE"], 8);

  const heroArtEl = $("#heroArt");
  if (heroArtEl && window.NR_ART) heroArtEl.innerHTML = NR_ART.heroArt();

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
    const av = el("span", "msg__av", initials(msg.u)); av.style.cssText = avatar(seedN);
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
  $$(".nav__item").forEach(a => a.addEventListener("click", () => { if (isMobileNav()) app.classList.remove("nav-open"); }));

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

})();
