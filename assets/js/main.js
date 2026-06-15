/* ============================================================
   Staack Casino — homepage interactions & generated art
============================================================ */
(function () {
  "use strict";

  /* ---------- inline SVG game-thumbnail factory ----------
     Each game gets a unique gradient + emblem so the page is
     fully self-contained (no external images / broken links). */
  function thumb(c1, c2, emoji, accent) {
    return `
    <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" role="img">
      <defs>
        <linearGradient id="g${accent}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
        <radialGradient id="r${accent}" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="rgba(255,255,255,.45)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill="url(#g${accent})"/>
      <rect width="200" height="240" fill="url(#r${accent})"/>
      <g opacity=".18" fill="#fff">
        <circle cx="34" cy="46" r="3"/><circle cx="168" cy="30" r="2.4"/>
        <circle cx="150" cy="92" r="2"/><circle cx="28" cy="130" r="2.6"/>
        <circle cx="176" cy="150" r="2"/><circle cx="60" cy="180" r="2.2"/>
      </g>
      <text x="100" y="120" font-size="86" text-anchor="middle" dominant-baseline="central">${emoji}</text>
    </svg>`;
  }

  const hotGames = [
    { n: "Gates of Olympus", p: "Pragmatic", e: "⚡", c: ["#3a2c7a", "#1a1140"], a: "go", b: "hot" },
    { n: "Sweet Bonanza", p: "Pragmatic", e: "🍭", c: ["#ff7eb3", "#7a2d6b"], a: "sb", b: "hot" },
    { n: "Empty the Bank", p: "Hacksaw", e: "💰", c: ["#2f6df0", "#15235e"], a: "eb" },
    { n: "Muertos Megaways", p: "BTG", e: "💀", c: ["#ff9d3d", "#7a2d2d"], a: "mu" },
    { n: "The Great Stick Up", p: "Hacksaw", e: "🎩", c: ["#7a5a3a", "#2a1a1a"], a: "gs" },
    { n: "Zombie Carnival", p: "Push", e: "🧟", c: ["#61f42d", "#1a3a1a"], a: "zc", b: "hot" },
    { n: "Buffalo King", p: "Pragmatic", e: "🐃", c: ["#e0a23a", "#5a3a14"], a: "bk" },
    { n: "Cash Bonanza", p: "Pragmatic", e: "🪙", c: ["#3aa34a", "#143a1a"], a: "cb" },
    { n: "Hot Fiesta", p: "Pragmatic", e: "💃", c: ["#ff5e5e", "#7a1f3a"], a: "hf" },
  ];

  const newGames = [
    { n: "Razor Shark", p: "Push", e: "🦈", c: ["#2fd0f0", "#14406e"], a: "rs", b: "new" },
    { n: "Fat Drac", p: "Push", e: "🧛", c: ["#8a5bff", "#2a1a5e"], a: "fd", b: "new" },
    { n: "Jammin' Jars", p: "Push", e: "🌈", c: ["#ff7eb3", "#3a2d7a"], a: "jj", b: "new" },
    { n: "Big Bamboo", p: "Push", e: "🐼", c: ["#3aa34a", "#143a2a"], a: "bb", b: "new" },
    { n: "Wild West Gold", p: "Pragmatic", e: "🤠", c: ["#e0a23a", "#5a2a14"], a: "ww" },
    { n: "Gates of Hades", p: "Pragmatic", e: "🔱", c: ["#ff5e3a", "#3a1414"], a: "gh", b: "new" },
    { n: "Sugar Rush", p: "Pragmatic", e: "🍬", c: ["#ff9de0", "#7a2d6b"], a: "sr" },
    { n: "Mental", p: "Nolimit", e: "🧠", c: ["#9d2dff", "#2a0a4a"], a: "mt", b: "new" },
    { n: "Le Bandit", p: "Hacksaw", e: "🎲", c: ["#2f6df0", "#142a5e"], a: "lb" },
  ];

  function gameCard(g) {
    const badge = g.b ? `<span class="game-badge ${g.b}">${g.b}</span>` : "";
    return `
      <article class="game" tabindex="0" aria-label="${g.n}">
        ${badge}
        <div class="game-thumb">${thumb(g.c[0], g.c[1], g.e, g.a)}</div>
        <div class="game-play"><span class="play-btn">▶ Play</span></div>
        <div class="game-name">${g.n}<span class="game-prov">${g.p}</span></div>
      </article>`;
  }

  function fill(id, list) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = list.map(gameCard).join("");
  }
  fill("hotRow", hotGames);
  fill("newRow", newGames);

  /* ---------- row navigation arrows ---------- */
  document.querySelectorAll(".rn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = document.getElementById(btn.dataset.row);
      if (row) row.scrollBy({ left: 380 * Number(btn.dataset.dir), behavior: "smooth" });
    });
  });

  /* ---------- live-wins ticker ---------- */
  const names = ["Evgeny_Sol", "LuckyKas", "NeonRider", "Vilnius777", "CryptoQueen", "SlotSensei",
    "MidnightFox", "GoldenToucan", "ZombieKing", "Batman_C", "SugarHigh", "WildWestWill"];
  const games = ["Big Bamboo", "Sweet Bonanza", "Gates of Olympus", "Razor Shark", "Mental",
    "Muertos", "Sugar Rush", "Empty the Bank", "Hot Fiesta", "Fat Drac"];
  const coins = ["LTC", "BTC", "ETH", "USDT", "DOGE"];
  function rng(a, b) { return Math.random() * (b - a) + a; }
  function tickItem() {
    const amt = rng(40, 980).toFixed(2);
    const n = names[(Math.random() * names.length) | 0];
    const g = games[(Math.random() * games.length) | 0];
    const c = coins[(Math.random() * coins.length) | 0];
    return `<span class="tk"><b>${n}</b> won <span class="amt">$${amt} ${c}</span> on ${g}<span class="dotsep"></span></span>`;
  }
  const track = document.getElementById("tickerTrack");
  if (track) {
    let s = "";
    for (let i = 0; i < 14; i++) s += tickItem();
    track.innerHTML = s + s; // duplicate for seamless loop
  }

  /* ---------- avatar grid ---------- */
  const faces = ["🦸", "🧛", "🤠", "🧟", "🦈", "🐼", "🐃", "🦜", "👑", "🤡",
    "🧙", "🦊", "🐯", "🦁", "🐺", "🦅", "🐉", "🦖", "🐙", "🐸"];
  const ag = document.getElementById("avatarGrid");
  if (ag) {
    ag.innerHTML = faces.map((f, i) =>
      `<button class="av${i === 0 ? " sel" : ""}" aria-label="avatar ${i + 1}">${f}</button>`).join("");
    ag.addEventListener("click", (e) => {
      const t = e.target.closest(".av");
      if (!t) return;
      ag.querySelectorAll(".av").forEach((a) => a.classList.remove("sel"));
      t.classList.add("sel");
    });
  }

  /* ---------- battle-pass levels ---------- */
  const bpLevels = [
    { n: 1, t: "FS\n5", k: "fs", p: "40 Points", s: "claimed" },
    { n: 2, t: "FS\n10", k: "fs", p: "100 Points", s: "claimed" },
    { n: 3, t: "FS\n15", k: "fs", p: "300 Points", s: "claimed" },
    { n: 4, t: "ND\n20", k: "nd", p: "1 000 Points", s: "claimed" },
    { n: 5, t: "ND\n30", k: "nd", p: "4 000 Points", s: "claimed" },
    { n: 6, t: "FS\n20", k: "fs", p: "6 000 Points", s: "claimed" },
    { n: 7, t: "FS\n30", k: "fs", p: "12 000 Points", s: "current" },
    { n: 8, t: "ND\n40", k: "nd", p: "20 000 Points", s: "locked" },
    { n: 9, t: "ND\n60", k: "nd", p: "30 000 Points", s: "locked" },
    { n: 10, t: "FS\n100", k: "fs", p: "44 000 Points", s: "locked" },
    { n: 11, t: "FS\n40", k: "fs", p: "60 000 Points", s: "locked" },
    { n: 12, t: "ND\n60", k: "nd", p: "80 000 Points", s: "locked" },
  ];
  const bp = document.getElementById("bpLevels");
  if (bp) {
    bp.innerHTML = bpLevels.map((l) => {
      const lock = l.s === "locked" ? `<div class="lvl-lock">🔒</div>` : "";
      const medal = l.s === "locked"
        ? lock
        : `<div class="lvl-medal ${l.k}">${l.t.replace("\n", "<br>")}</div>`;
      return `<div class="lvl ${l.s === "claimed" ? "claimed" : ""} ${l.s === "locked" ? "locked" : ""}">
                <div class="lvl-num">LVL ${l.n}</div>${medal}<div class="lvl-pts">${l.p}</div>
              </div>`;
    }).join("");
  }

  /* ---------- live countdown ---------- */
  (function countdown() {
    const root = document.getElementById("countdown");
    if (!root) return;
    let total = 2 * 3600 + 45 * 60 + 40; // 02:45:40
    const cells = root.querySelectorAll(".cd b");
    function tick() {
      if (total < 0) total = 24 * 3600;
      const d = Math.floor(total / 86400);
      const h = Math.floor((total % 86400) / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      const pad = (x) => String(x).padStart(2, "0");
      if (cells[0]) cells[0].textContent = pad(d);
      if (cells[1]) cells[1].textContent = pad(h);
      if (cells[2]) cells[2].textContent = pad(m);
      if (cells[3]) cells[3].textContent = pad(s);
      total--;
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ---------- confetti ambience ---------- */
  (function confetti() {
    const layer = document.getElementById("confetti");
    if (!layer) return;
    const palette = ["#ffb877", "#f58181", "#65ddf8", "#6355ff", "#61f42d", "#ffd27a"];
    const N = 26;
    for (let i = 0; i < N; i++) {
      const c = document.createElement("span");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = palette[(Math.random() * palette.length) | 0];
      c.style.animationDuration = rng(6, 13) + "s";
      c.style.animationDelay = -rng(0, 13) + "s";
      c.style.transform = `scale(${rng(0.6, 1.3)})`;
      layer.appendChild(c);
    }
  })();

  /* ---------- category tab toggle ---------- */
  document.querySelectorAll(".cat:not(.cat-providers)").forEach((c) => {
    c.addEventListener("click", () => {
      document.querySelectorAll(".cat").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
    });
  });
})();
