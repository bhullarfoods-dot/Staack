/* ============================================================
   NodeRoll — Crypto Casino & Sportsbook
   View rendering, generated art, Mines mini-game, live chat,
   winners feed, navigation & demo auth. Fully self-contained.
============================================================ */
(() => {
  "use strict";

  /* ---------- helpers ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => Math.random() * (b - a) + a;
  const ri   = (a, b) => Math.floor(rand(a, b + 1));
  const pick = a => a[ri(0, a.length - 1)];
  const money = n => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- brand palette ---------- */
  const C = { midnight:"#0a092c", twilight:"#33264a", plasma:"#4405e4", pulse:"#f50bba", neon:"#13aded", vapor:"#efedf6" };
  const PAIRS = [
    [C.plasma, C.pulse], [C.pulse, C.neon], [C.neon, C.plasma],
    [C.plasma, C.neon], [C.pulse, C.plasma], [C.neon, C.pulse],
  ];
  const grad = (i = ri(0, PAIRS.length - 1)) => `linear-gradient(135deg, ${PAIRS[i % PAIRS.length][0]}, ${PAIRS[i % PAIRS.length][1]})`;

  /* generated game-thumb art: layered brand blobs on a dark base */
  function artHTML(seed = ri(0, 5)) {
    const [a, b] = PAIRS[seed % PAIRS.length];
    const blobs = Array.from({ length: 3 }, () => {
      const s = ri(60, 130);
      return `<span class="blob" style="width:${s}px;height:${s}px;left:${ri(-20,80)}%;top:${ri(-20,70)}%;background:radial-gradient(circle, ${pick([a,b])}, transparent 70%)"></span>`;
    }).join("");
    return `<div class="art" style="background:linear-gradient(150deg, ${a}33, #0c0830 60%)">${blobs}</div><div class="shade"></div>`;
  }
  const avatar = (seed = ri(0, 5)) => grad(seed);

  /* ---------- data ---------- */
  const PROVIDERS = ["Pragmatic", "Hacksaw", "NolimitCity", "Push Gaming", "Relax", "Play'n GO", "NetEnt", "Evolution"];
  const GAME_NAMES = ["Gates of Olympus","Sweet Bonanza","Sugar Rush","Big Bass","Wanted Dead","Le Bandit","Mental","San Quentin","Fruit Party","The Dog House","Starlight Princess","Money Train","Book of Dead","Reactoonz","Razor Shark","Fire In The Hole","Wild West Gold","Gorilla Mayhem","Zeus vs Hades","Crazy Time","Aztec Gems","Bigger Bass","Dork Unit","Punk Rocker"];
  const ORIGINALS  = ["Mines","Crash","Plinko","Dice","Towers","Keno","Limbo","Wheel","Hilo","Coinflip"];
  const mkGame = (name, badge) => ({ name, prov: pick(PROVIDERS), badge, seed: ri(0, 5) });
  const DATA = {
    inhouse: [
      { n:"Mines", t:"" }, { n:"Crash", t:"" }, { n:"Plinko", t:"NEW" }, { n:"Dice", t:"" }, { n:"Towers", t:"x99" },
    ],
    hot:  GAME_NAMES.slice(0, 8).map(n => mkGame(n, "hot")),
    knew: GAME_NAMES.slice(8, 16).map(n => mkGame(n, "new")),
    orig: ORIGINALS.map(n => mkGame(n, "")),
    slots: GAME_NAMES.slice(2, 14).map(n => mkGame(n, ri(0,3) === 0 ? "hot" : "")),
  };
  const SPORTS_ICONS = ["⚽","🏀","🏈","🎾","⚾","⛳","🎮","🏒","🥊","🏐","🏉","🏓","🎱","🏸","🥅","🏆"];
  const CHAT_SEED = [
    { u:"cryptobog", t:"i didn't loose tip bcs i didn't get it", s:5 },
    { u:"mainuser", mod:true, reply:"Deadfire139: how u can say thaaaat", t:"just like that xD", s:1 },
    { u:"cryptobog", t:"My win in", win:{ g:"Zeus vs Hades", amt:"0.0004 ROLL" }, s:3 },
    { u:"cryptobog", t:"if people stopping to take pool everything would be norm lol", s:5 },
    { u:"mainuser", reply:"cryptobog: if people stopping to take pool…", t:"true true", s:2 },
    { u:"cryptobog", t:"of coursw", s:4 },
    { u:"cryptobog", t:"looool", s:0 },
    { u:"mainuser", mod:true, reply:"Deadfire139: true true", t:"winning and loosing is part of the game :))))", s:1 },
    { u:"cryptobog", t:"agree", s:3 },
  ];
  const LIVE_MSGS = ["gg wp","that mines hit was insane","when next rain?","up 3x on crash 🚀","new originals are clean","who's in the tournament","just cashed out","NEON theme is sick","big win incoming","lfg 🔥","plinko is calling me","ty for the rain"];
  const LIVE_USERS = ["satoshi_j","degenqueen","node_runner","pulsewave","vapor_kid","plasmaboi","cryptobog","midnight_owl","rollmaster","neonix"];

  /* ============================================================
     COMPONENT BUILDERS
  ============================================================ */
  function gameCard(g) {
    const badge = g.badge ? `<span class="gbadge ${g.badge}">${g.badge === "new" ? "NEW" : "HOT"}</span>` : "";
    const c = el("div", "gcard");
    c.innerHTML = `${artHTML(g.seed)}${badge}
      <div class="gname">${g.name}</div>
      <div class="gprov">${g.prov}</div>
      <div class="play"><span>▶</span></div>`;
    c.addEventListener("click", () => toast(`Launching “${g.name}” …`));
    return c;
  }
  function gameRow(list) {
    const row = el("div", "game-row");
    list.forEach(g => row.appendChild(gameCard(g)));
    return row;
  }
  function secHead(icon, title, opts = {}) {
    const h = el("div", "sec-head");
    h.innerHTML = `<h2><span class="sec-ico ${opts.cool ? "cool" : ""}">${icon}</span>${title}</h2>`;
    if (opts.rowId) h.innerHTML += `<div class="row-nav"><button class="rn" data-row="${opts.rowId}" data-dir="-1">‹</button><button class="rn" data-row="${opts.rowId}" data-dir="1">›</button></div>`;
    else if (opts.seeAll) h.innerHTML += `<a class="see-all" style="margin-left:auto">See all ›</a>`;
    return h;
  }

  /* ============================================================
     VIEW: CASINO HOME
  ============================================================ */
  function renderCasino() {
    const v = $("#view-casino");
    v.innerHTML = "";

    /* winners feed */
    const winners = el("div", "winners");
    winners.innerHTML = `<span class="winners-label"><span class="dot"></span> WINNERS LIVE FEED</span><div class="winners-track" id="winnersTrack"></div>`;
    v.appendChild(winners);

    /* hero (570×265) + side promos */
    const hero = el("div", "hero-wrap");
    hero.innerHTML = `
      <div class="hero-banner">
        ${orbSVG()}
        <p class="hero-kicker">SIGN UP &amp; GET</p>
        <h1>WELCOME BONUS UP TO
          <span class="hero-pills">
            <span class="bonus-pill fs">1000 FS</span>
            <span class="bonus-pill cash">$3 500</span>
          </span>
        </h1>
        <div class="hero-cta">
          <button class="btn btn-accent btn-lg" id="heroSignup">Go to sign up</button>
          <span class="hero-quick">OR QUICK
            <button class="q" title="Google">G</button>
            <button class="q" title="Wallet">◈</button>
            <button class="q" title="Telegram">✈</button>
          </span>
        </div>
      </div>
      <div class="hero-side">
        <div class="mini-promo"><span class="glow"></span><span class="mp-tag">LOYAL PROGRAM</span><h3>Level up · earn ROLL</h3><p>Climb ranks, unlock NFT perks &amp; weekly cashback.</p></div>
        <div class="mini-promo cool"><span class="glow"></span><span class="mp-tag">DROPS &amp; RAINS</span><h3>Daily free crypto</h3><p>Claim rains in chat &amp; open free cases every day.</p></div>
      </div>`;
    v.appendChild(hero);

    /* quick category cards */
    const quick = el("div", "quick-cards");
    quick.innerHTML = `
      <div class="qcard a"><span class="glow"></span><span class="qico">🎰</span><h3>Casino</h3><p>Our originals &amp; thousands of slots.</p><button class="btn btn-accent btn-sm" data-go="casino" style="align-self:flex-start">Try it out</button></div>
      <div class="qcard b"><span class="glow"></span><span class="qico">🏆</span><h3>Sports</h3><p>Pre-match &amp; live odds across 30+ sports.</p><button class="btn btn-accent btn-sm" data-go="sports" style="align-self:flex-start">Try it out</button></div>
      <div class="qcard c"><span class="glow"></span><span class="qico">📊</span><h3>Futures</h3><p>Trade price movements with ROLL.</p><span class="soon">COMING SOON</span></div>`;
    v.appendChild(quick);

    /* game rows */
    v.appendChild(secHead("◆", "NodeRoll Originals", { rowId: "rowOrig" }));
    const ro = gameRow(DATA.orig); ro.id = "rowOrig"; v.appendChild(ro);

    v.appendChild(secHead("♨", "Hot games", { rowId: "rowHot" }));
    const rh = gameRow(DATA.hot); rh.id = "rowHot"; v.appendChild(rh);

    v.appendChild(secHead("✦", "New games", { cool: true, rowId: "rowNew" }));
    const rn = gameRow(DATA.knew); rn.id = "rowNew"; v.appendChild(rn);

    v.appendChild(secHead("▦", "Slots", { seeAll: true }));
    const grid = el("div", "game-grid");
    DATA.slots.forEach(g => grid.appendChild(gameCard(g)));
    v.appendChild(grid);

    seedWinners();
    $("#heroSignup").addEventListener("click", login);
    $$("[data-go]", v).forEach(b => b.addEventListener("click", () => setView(b.dataset.go)));
    bindRowNav(v);
  }

  function bindRowNav(scope) {
    $$(".rn", scope).forEach(btn => btn.addEventListener("click", () => {
      const row = $("#" + btn.dataset.row);
      if (row) row.scrollBy({ left: +btn.dataset.dir * 340, behavior: "smooth" });
    }));
  }

  /* ============================================================
     VIEW: ORIGINALS — playable MINES
  ============================================================ */
  const mines = { betting: false, bombs: 16, grid: [], picks: 0, bet: 0, layout: [] };

  function renderOriginals() {
    const v = $("#view-originals");
    v.innerHTML = "";

    const top = el("div", "orig-top");
    top.innerHTML = `<button class="orig-back" id="origBack">‹ Back</button>`;
    v.appendChild(top);

    const wrap = el("div", "mines");
    wrap.innerHTML = `
      <div class="bet-panel">
        <span class="orig-tag">◆ NODEROLL ORIGINALS</span>
        <h2 class="game-title">Mines</h2>
        <div class="tabs"><button class="tab active">Manual</button><button class="tab">Auto</button></div>
        <div class="field">
          <label>Enter amount <span>Balance <b id="mBal">10.000</b></span></label>
          <div class="val"><span class="coin-mini"></span><input id="mBet" type="text" value="0.00" inputmode="decimal"></div>
        </div>
        <div class="amt-btns"><button data-amt="min">MIN</button><button data-amt="half">½</button><button data-amt="double">2×</button><button data-amt="max">MAX</button></div>
        <div class="field">
          <label>Number of bombs</label>
          <div class="bombs-row"><button class="step" data-b="-1">–</button><input id="mBombs" type="text" value="16" readonly style="text-align:center"><button class="step" data-b="1">+</button></div>
        </div>
        <div>
          <div class="risk-bar"></div>
          <div class="risk-legend"><span>x1 · Safe</span><span>Wild · x24</span></div>
        </div>
        <button class="btn btn-accent place-bet btn-block" id="mPlay">Place bet</button>
      </div>
      <div class="mines-stage">
        <div class="maxwin"><span>MAX WIN</span><b id="mMax">€ 100 924</b></div>
        <div class="mine-grid" id="mineGrid"></div>
      </div>`;
    v.appendChild(wrap);

    /* multiplier strip */
    const mr = el("div", "mult-row");
    [1.25,1.33,2.53,4.15,8.53,10.53,11.12,18.4,24].forEach((m,i) => {
      mr.appendChild(el("div", "mchip" + (i === 0 ? " on" : ""),
        `<div class="step-n"><span class="rc"></span>${i+1}</div><b>${m.toFixed(2)}x</b>`));
    });
    v.appendChild(mr);

    /* bets table */
    v.appendChild(betsTable());

    buildMineGrid();
    bindMines();
    $("#origBack").addEventListener("click", () => setView("casino"));
  }

  function buildMineGrid() {
    const g = $("#mineGrid"); g.innerHTML = "";
    mines.grid = [];
    for (let i = 0; i < 25; i++) {
      const c = el("div", "cell"); c.dataset.i = i;
      g.appendChild(c); mines.grid.push(c);
    }
  }
  function newLayout() {
    const bombs = new Set();
    while (bombs.size < mines.bombs) bombs.add(ri(0, 24));
    mines.layout = Array.from({ length: 25 }, (_, i) => bombs.has(i) ? "bomb" : "gem");
  }
  function bindMines() {
    $$(".amt-btns button").forEach(b => b.addEventListener("click", () => {
      const inp = $("#mBet"); let val = parseFloat(inp.value) || 0;
      if (b.dataset.amt === "min") val = 0.1;
      if (b.dataset.amt === "half") val = val / 2;
      if (b.dataset.amt === "double") val = val * 2 || 0.2;
      if (b.dataset.amt === "max") val = 10;
      inp.value = val.toFixed(2);
    }));
    $$(".bombs-row .step").forEach(b => b.addEventListener("click", () => {
      mines.bombs = Math.min(24, Math.max(1, mines.bombs + (+b.dataset.b)));
      $("#mBombs").value = mines.bombs;
    }));
    $("#mPlay").addEventListener("click", toggleMines);
    mines.grid.forEach(c => c.addEventListener("click", () => revealCell(c)));
  }
  function toggleMines() {
    const btn = $("#mPlay");
    if (!mines.betting) {
      mines.bet = parseFloat($("#mBet").value) || 1;
      mines.picks = 0; mines.betting = true;
      newLayout(); buildMineGrid();
      mines.grid.forEach(c => c.addEventListener("click", () => revealCell(c)));
      btn.textContent = "Cash out"; btn.classList.add("btn-primary"); btn.classList.remove("btn-accent");
      toast("Bet placed — pick the gems 💎");
    } else {
      const mult = (1 + mines.picks * 0.28).toFixed(2);
      endMines(false);
      if (mines.picks > 0) toast(`Cashed out at ${mult}× 🎉`);
    }
  }
  function revealCell(c) {
    if (!mines.betting || c.classList.contains("gem") || c.classList.contains("bomb")) return;
    const kind = mines.layout[+c.dataset.i];
    c.classList.add(kind, "pop");
    if (kind === "bomb") { toast("Boom! 💥 better luck next round"); endMines(true); }
    else {
      mines.picks++;
      const idx = Math.min(8, mines.picks - 1);
      $$(".mchip").forEach((m, i) => m.classList.toggle("on", i === idx));
    }
  }
  function endMines(revealAll) {
    mines.betting = false;
    const btn = $("#mPlay");
    btn.textContent = "Place bet"; btn.classList.add("btn-accent"); btn.classList.remove("btn-primary");
    if (revealAll) mines.grid.forEach(c => {
      if (!c.classList.contains("gem") && !c.classList.contains("bomb")) c.classList.add(mines.layout[+c.dataset.i]);
    });
  }

  function betsTable() {
    const rows = [
      ["Crazy Time","@casper","10 sec ago","109.99","4.55","+ 109.99"],
      ["Gates of Olympus","@amazingbets","13 sec ago","1 375.20","1.50","+ 700.00"],
      ["Starlight Princess","@alexsky","15 sec ago","90.00","12.30","+ 4 889.16"],
      ["Mines","@node_runner","21 sec ago","250.00","3.04","+ 760.00"],
      ["Sweet Bonanza","@pulsewave","28 sec ago","42.10","0.00","— 42.10"],
    ];
    const t = el("div", "bets-table");
    t.innerHTML = `
      <div class="bets-tabs">
        <span class="bt-label">Bets</span>
        <button class="bt active">All bets</button><button class="bt">High rollers</button>
        <button class="bt">Lucky bets</button><button class="bt">Trades</button>
      </div>
      <table class="bets">
        <thead><tr><th>GAME</th><th>USER</th><th>TIME</th><th class="col-r">WAGER</th><th class="col-r">MULTIPLIER</th><th class="col-r">PAYOUT</th></tr></thead>
        <tbody>${rows.map((r,i) => `
          <tr>
            <td><span class="g"><span class="t" style="background:${grad(i)}"></span>${r[0]}</span></td>
            <td>${r[1]}</td><td>${r[2]}</td>
            <td class="col-r"><span class="rc-inline"></span>${r[3]}</td>
            <td class="col-r mx">${r[4]}×</td>
            <td class="col-r ${r[5].startsWith("—") ? "" : "pay"}">${r[5]}</td>
          </tr>`).join("")}
        </tbody>
      </table>`;
    $$(".bt", t).forEach(b => b.addEventListener("click", () => { $$(".bt", t).forEach(x => x.classList.remove("active")); b.classList.add("active"); }));
    return t;
  }

  /* ============================================================
     VIEW: SPORTS
  ============================================================ */
  function renderSports() {
    const v = $("#view-sports");
    v.innerHTML = "";

    const icons = el("div", "sport-icons");
    icons.innerHTML = SPORTS_ICONS.map((s, i) => `<button class="${i === 0 ? "active" : ""}">${s}</button>`).join("");
    v.appendChild(icons);
    $$("button", icons).forEach(b => b.addEventListener("click", () => { $$("button", icons).forEach(x => x.classList.remove("active")); b.classList.add("active"); }));

    /* sports hero 570×265-style banner */
    const hero = el("div", "hero-wrap");
    hero.innerHTML = `
      <div class="hero-banner">
        ${orbSVG()}
        <p class="hero-kicker">SPORTSBOOK</p>
        <h1>PLACE YOUR FIRST BET AND
          <span class="hero-pills"><span class="bonus-pill fs">WIN UP TO 1000 FS</span></span>
        </h1>
        <div class="hero-cta"><button class="btn btn-accent btn-lg" data-go="account">Claim bonus</button></div>
      </div>
      <div class="hero-side">
        <div class="mini-promo cool"><span class="glow"></span><span class="mp-tag">LIVE NOW</span><h3>34 live matches</h3><p>In-play odds updating in real time.</p></div>
        <div class="mini-promo"><span class="glow"></span><span class="mp-tag">COMBO BOOST</span><h3>Up to +23%</h3><p>Bigger payouts on multi-leg accumulators.</p></div>
      </div>`;
    v.appendChild(hero);
    $$("[data-go]", hero).forEach(b => b.addEventListener("click", () => setView(b.dataset.go)));

    const teams = [["Rayo Vallecano","Real Madrid"],["Arsenal","Chelsea"],["Barcelona","Sevilla"],["Liverpool","Everton"],["Bayern","Dortmund"],["PSG","Lyon"]];
    v.appendChild(secHead("👑", "Top matches", { seeAll: true }));
    const grid = el("div", "match-grid");
    teams.forEach((m, i) => grid.appendChild(matchCard(m, i, false)));
    v.appendChild(grid);

    v.appendChild(secHead("📡", "Live matches", { cool: true }));
    const live = el("div", "match-grid");
    teams.slice(0, 3).forEach((m, i) => live.appendChild(matchCard(m, i, true)));
    v.appendChild(live);

    const combo = el("div", "combo-bar");
    combo.innerHTML = `<span style="font-size:24px">🔥</span><h3>Hot Combos</h3><span class="boost">2.23 Comboboost</span>`;
    v.appendChild(combo);
  }
  function matchCard([a, b], i, isLive) {
    const c = el("div", "match");
    const odds = [rand(2, 4), rand(2.8, 3.9), rand(3, 5)].map(o => o.toFixed(2));
    c.innerHTML = `
      <div class="league"><span>England · Premier League</span>${isLive ? `<span class="live">● LIVE</span>` : `<span class="time">16:00</span>`}</div>
      <div class="teams">
        <span class="team"><span class="crest" style="background:${grad(i)}"></span>${a}</span>
        <span class="team"><span class="crest" style="background:${grad(i + 2)}"></span>${b}</span>
      </div>
      <div class="odds">
        <div class="odd"><i>1</i><b>${odds[0]}</b></div>
        <div class="odd"><i>X</i><b>${odds[1]}</b></div>
        <div class="odd"><i>2</i><b>${odds[2]}</b></div>
      </div>`;
    $$(".odd", c).forEach(o => o.addEventListener("click", () => toast(`Added to bet slip · ${$("b", o).textContent}×`)));
    return c;
  }

  /* ============================================================
     VIEW: ACCOUNT
  ============================================================ */
  function renderAccount() {
    const v = $("#view-account");
    v.innerHTML = "";

    const head = el("div", "acct-head");
    head.innerHTML = `<h1>Your account</h1><span class="days">⏱ 10 DAYS WITH NODEROLL</span><button class="btn btn-ghost logout" id="acctLogout">Log out</button>`;
    v.appendChild(head);

    const tiles = el("div", "acct-tiles");
    tiles.innerHTML = `
      <div class="atile a"><span class="ai">👤</span><div><h4>My profile</h4><p>Check your personal info</p></div></div>
      <div class="atile b"><span class="ai">🕹</span><div><h4>Game history</h4><p>Review your sessions</p></div></div>
      <div class="atile c"><span class="ai">💳</span><div><h4>Transactions</h4><p>Deposits &amp; withdrawals</p></div></div>
      <div class="atile a"><span class="ai">🛡</span><div><h4>Security</h4><p>Keep your account safe</p></div></div>`;
    v.appendChild(tiles);

    /* level system */
    const level = el("div", "panel level-card");
    level.innerHTML = `
      <h3>◆ Level progression</h3>
      <div class="level-now">
        <span class="level-badge">🏅</span>
        <div class="level-meta"><b>Level 4th</b><span>109 / 1000 EXP · 891 left to Level 5</span></div>
      </div>
      <div class="xp-bar"><span style="width:11%"></span></div>
      <div class="level-track">
        <div class="lv passed"><div class="lt">Passed</div><b>Lv 1</b></div>
        <div class="lv passed"><div class="lt">Passed</div><b>Lv 2</b></div>
        <div class="lv passed"><div class="lt">Passed</div><b>Lv 3</b></div>
        <div class="lv"><div class="lt">Current</div><b>Lv 4</b></div>
        <div class="lv"><div class="lt">Upcoming</div><b>Lv 5</b></div>
        <div class="lv premium"><div class="lt">Premium</div><b>VIP</b></div>
      </div>`;

    /* profile + settings */
    const profile = el("div", "panel");
    profile.innerHTML = `
      <h3>👤 @greatuser <span class="verified">✓ E-mail verified</span></h3>
      <div class="set-row" style="margin-bottom:12px">user@noderoll.io</div>
      <div class="set-row">Streamer mode <span class="toggle" data-toggle></span></div>
      <div class="set-row" style="margin-top:10px">Hide my username <span class="toggle on" data-toggle></span></div>
      <div style="margin-top:16px;display:flex;gap:9px;flex-wrap:wrap">
        <button class="btn btn-outline btn-sm">Change e-mail</button>
        <button class="btn btn-outline btn-sm">Personal settings</button>
      </div>`;

    const cols = el("div", "acct-cols");
    cols.append(level, profile);
    v.appendChild(cols);

    /* stats */
    v.appendChild(statPanel());

    /* security + NFT */
    const cols2 = el("div", "acct-cols");

    const security = el("div", "panel");
    security.innerHTML = `
      <h3>🛡 Security</h3>
      <div class="sec-rows">
        <div class="sec-item"><div class="top">🔒 <b>Password</b></div><span class="warn">⚠ Password is not set</span><button class="btn btn-accent btn-sm">Set password</button></div>
        <div class="sec-item"><div class="top">🔑 <b>2FA</b></div><span class="warn">⚠ 2FA is not set</span><button class="btn btn-accent btn-sm">Activate</button></div>
      </div>`;

    const nft = el("div", "panel");
    nft.innerHTML = `
      <h3>⬡ NFT collection <a class="see-all" style="margin-left:auto">All ›</a></h3>
      <div class="nft-strip" id="nftStrip"></div>
      <p style="color:var(--muted);font-size:14px;margin:12px 0 0">Combine NFTs of the same level to upgrade · 25% chance per merge.</p>`;
    cols2.append(security, nft);
    v.appendChild(cols2);

    const strip = $("#nftStrip", nft);
    [["5th",5],["3rd",3],["1st",1],["2nd",2],["4th",4]].forEach(([lbl, s]) => {
      const card = el("div", "nft-card");
      card.style.background = `linear-gradient(160deg, ${PAIRS[s % PAIRS.length][0]}, ${PAIRS[s % PAIRS.length][1]})`;
      card.innerHTML = `<span class="lbl">${lbl}</span>`;
      strip.appendChild(card);
    });

    $$("[data-toggle]", v).forEach(t => t.addEventListener("click", () => t.classList.toggle("on")));
    $("#acctLogout").addEventListener("click", logout);
  }
  function statPanel() {
    const p = el("div", "panel");
    p.innerHTML = `<h3>📊 Gaming statistics &amp; activity</h3>
      <div class="stat-grid">
        <div class="stat"><span class="si">🎯</span><div><b>304,345</b><span>Total wager</span></div></div>
        <div class="stat cool"><span class="si">💰</span><div><b>90,345</b><span>Total deposits</span></div></div>
        <div class="stat"><span class="si">🏆</span><div><b>9,839</b><span>Total wins</span></div></div>
        <div class="stat cool"><span class="si">🌧</span><div><b>10,943</b><span>Rains &amp; drops</span></div></div>
        <div class="stat"><span class="si">🎲</span><div><b>120</b><span>Total bets</span></div></div>
        <div class="stat cool"><span class="si">💬</span><div><b>120</b><span>Messages in chat</span></div></div>
      </div>`;
    return p;
  }

  /* ============================================================
     SHARED SVG ORB (hero decoration)
  ============================================================ */
  function orbSVG() {
    return `<svg class="hero-orb" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${C.pulse}"/><stop offset=".5" stop-color="${C.plasma}"/><stop offset="1" stop-color="${C.neon}"/>
        </linearGradient>
        <radialGradient id="orbGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="30%" stop-color="${C.pulse}" stop-opacity=".5"/><stop offset="100%" stop-color="${C.plasma}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="62" fill="url(#orb)"/>
      <circle cx="100" cy="100" r="92" fill="url(#orbGlow)"/>
      <g fill="#0a092c">
        <circle cx="80" cy="80" r="8"/><circle cx="120" cy="120" r="8"/>
        <circle cx="120" cy="80" r="6" opacity=".5"/><circle cx="80" cy="120" r="6" opacity=".5"/><circle cx="100" cy="100" r="7"/>
      </g>
      <ellipse cx="86" cy="74" rx="16" ry="9" fill="#fff" opacity=".35"/>
    </svg>`;
  }

  /* ============================================================
     WINNERS FEED (seed + live)
  ============================================================ */
  function winnerEl(u, amt, seed) {
    const w = el("div", "winner");
    w.innerHTML = `<span class="wthumb" style="background:${grad(seed)}"></span>
      <span class="wmeta"><b>${u}</b><i><span class="rc"></span>${amt} ROLL</i></span>`;
    return w;
  }
  function seedWinners() {
    const track = $("#winnersTrack"); if (!track) return;
    track.innerHTML = "";
    for (let i = 0; i < 8; i++) track.appendChild(winnerEl(pick(LIVE_USERS), money(rand(5, 9000)), ri(0, 5)));
  }
  function pushWinner() {
    const track = $("#winnersTrack"); if (!track) return;
    track.prepend(winnerEl(pick(LIVE_USERS), money(rand(5, 9000)), ri(0, 5)));
    while (track.children.length > 9) track.lastChild.remove();
  }

  /* ============================================================
     CHAT (seed + live + send)
  ============================================================ */
  function msgEl(m, seed = ri(0, 5)) {
    const wrap = el("div", "msg" + (m.win ? " win" : ""));
    const time = `0${ri(1,9)}:${ri(10,59)} PM`;
    let body = `<div class="m-top"><span class="m-name">${m.u}</span>${m.mod ? `<span class="m-mod">MODER</span>` : ""}<span class="m-time">${time}</span></div>`;
    if (m.reply) body += `<div class="m-reply">${m.reply}</div>`;
    body += `<div class="m-text">${m.t}</div>`;
    if (m.win) body += `<div class="win-embed"><span class="we-t" style="background:${grad(seed)}"></span><div><b>${m.win.g}</b><br><i><span class="rc" style="width:11px;height:11px;border-radius:50%;background:var(--grad-accent);display:inline-block"></span> ${m.win.amt}</i></div></div>`;
    wrap.innerHTML = `<span class="m-ava" style="background:${avatar(seed)}"></span><div class="m-body">${body}</div>`;
    return wrap;
  }
  function seedChat() {
    const body = $("#chatBody"); body.innerHTML = "";
    CHAT_SEED.forEach(m => body.appendChild(msgEl(m, m.s)));
    body.scrollTop = body.scrollHeight;
  }
  function pushChat(m) {
    const body = $("#chatBody");
    const atBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 60;
    body.appendChild(msgEl(m));
    if (atBottom) body.scrollTop = body.scrollHeight;
    while (body.children.length > 40) body.firstChild.remove();
  }

  /* ============================================================
     NAVIGATION
  ============================================================ */
  const VIEWS = ["casino", "originals", "sports", "account"];
  function setView(name) {
    if (!VIEWS.includes(name)) name = "casino";
    VIEWS.forEach(x => $("#view-" + x).hidden = x !== name);

    /* seg + casino/sports nav swap */
    const isSports = name === "sports";
    $$(".seg-btn").forEach(b => b.classList.toggle("active", b.dataset.view === (isSports ? "sports" : "casino")));
    $("#sideNavCasino").hidden = isSports;
    $("#sideNavSports").hidden = !isSports;

    /* active side-link highlight */
    $$(".side-link").forEach(l => l.classList.toggle("active",
      l.dataset.view === name && (name === "originals" || name === "account")));

    $("#main").scrollTop = 0;
    closeDrawers();
  }

  /* ============================================================
     AUTH (demo)
  ============================================================ */
  function login() {
    $("#authOut").hidden = true;
    $("#authIn").hidden = false;
    toast("Welcome back, cryptojohn 👋");
  }
  function logout() {
    $("#authIn").hidden = true;
    $("#authOut").hidden = false;
    setView("casino");
    toast("Logged out");
  }

  /* ============================================================
     COIN TICKER + COUNTDOWN
  ============================================================ */
  function tickCoin() {
    const priceEl = $("#coinPrice"), chEl = $("#coinChange");
    let price = 7.05;
    setInterval(() => {
      const delta = rand(-0.18, 0.2);
      price = Math.max(3, price + delta);
      const pct = (rand(-3, 14)).toFixed(1);
      const up = +pct >= 0;
      priceEl.textContent = "$" + price.toFixed(2);
      chEl.textContent = (up ? "▲ " : "▼ ") + Math.abs(pct) + "%";
      chEl.className = up ? "up" : "down";
    }, 2600);
  }
  function countdowns() {
    let total = 24 * 3600 + 5 * 3600 + 35 * 60;
    const fmt = s => `${Math.floor(s/86400)}d : ${Math.floor(s%86400/3600)}h : ${Math.floor(s%3600/60)}m`;
    setInterval(() => {
      total = total > 0 ? total - 60 : 24 * 3600;
      $$(".bonus-chip .t").forEach(e => e.textContent = fmt(total));
    }, 60000);
  }

  /* ============================================================
     DRAWERS (mobile) + TOAST
  ============================================================ */
  function openDrawer(side) {
    if (side === "nav") $("#sidebar").classList.add("open");
    if (side === "chat") $("#chat").classList.add("open");
    $("#scrim").classList.add("show");
  }
  function closeDrawers() {
    $("#sidebar").classList.remove("open");
    $("#chat").classList.remove("open");
    $("#scrim").classList.remove("show");
  }
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------- in-house icons ---------- */
  function renderInhouse() {
    const row = $("#inhouseRow");
    DATA.inhouse.forEach((g, i) => {
      const a = el("a", null, `${g.t ? `<span class="tag">${g.t}</span>` : ""}<span style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))">🎲</span>`);
      a.style.background = `linear-gradient(160deg, ${PAIRS[i % PAIRS.length][0]}, ${PAIRS[i % PAIRS.length][1]})`;
      a.title = g.n;
      a.addEventListener("click", () => setView("originals"));
      row.appendChild(a);
    });
  }

  /* ============================================================
     WIRE-UP
  ============================================================ */
  function bindGlobalNav() {
    /* anything with data-view switches views */
    $$("[data-view]").forEach(elm => {
      if (elm.classList.contains("seg-btn") || elm.classList.contains("side-link")
          || elm.classList.contains("logo") || elm.classList.contains("user-pill")) {
        elm.addEventListener("click", e => { e.preventDefault(); setView(elm.dataset.view); });
      }
    });
    $("#signupBtn").addEventListener("click", login);
    $("#loginBtn").addEventListener("click", login);

    /* drawers */
    $("#navToggle").addEventListener("click", () =>
      $("#sidebar").classList.contains("open") ? closeDrawers() : openDrawer("nav"));
    $("#chatToggle").addEventListener("click", () =>
      $("#chat").classList.contains("open") ? closeDrawers() : openDrawer("chat"));
    $("#scrim").addEventListener("click", closeDrawers);

    /* chat send */
    $("#chatForm").addEventListener("submit", e => {
      e.preventDefault();
      const txt = $("#chatText").value.trim();
      if (!txt) return;
      pushChat({ u: "cryptojohn", t: txt });
      $("#chatText").value = "";
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    renderInhouse();
    renderCasino();
    renderOriginals();
    renderSports();
    renderAccount();
    seedChat();
    bindGlobalNav();
    setView("casino");

    tickCoin();
    countdowns();

    /* live loops */
    setInterval(pushWinner, 3200);
    setInterval(() => pushChat({ u: pick(LIVE_USERS), t: pick(LIVE_MSGS) }), 4200);
  }
  document.addEventListener("DOMContentLoaded", init);
})();
