/* ============================================================
   NodeRoll — SVG art library (self-contained, brand-themed)
   Exposes window.NR_ART:
     gameArt(key)  -> full card illustration (300x400) for a game
     heroArt()     -> hero banner scene
   All scenes use unique gradient ids (@ -> uid) so many can live
   on one page without id collisions. No external images.
   ============================================================ */
window.NR_ART = (() => {
  const C = { mid:"#0a092c", sur:"#1b1746", sur2:"#241d56", pl:"#4405e4", pl1:"#5a1bff",
    pu:"#f50bba", pu1:"#ff5ccf", ne:"#13aded", ne1:"#7ee6ff", gold:"#ffd54a", gold2:"#f5a300", vp:"#efedf6" };
  let n = 0;

  // 4-point sparkle
  const spark = (x, y, s, o = .9) =>
    `<path transform="translate(${x} ${y})" opacity="${o}" fill="#fff"
      d="M0 ${-s}C${s*.12} ${-s*.3} ${s*.3} ${-s*.12} ${s} 0 ${s*.3} ${s*.12} ${s*.12} ${s*.3} 0 ${s}-${s*.12} ${s*.3}-${s*.3} ${s*.12}-${s} 0-${s*.3}-${s*.12}-${s*.12}-${s*.3} 0 ${-s}Z"/>`;

  // wrap a motif in a backdrop scene
  const scene = (bgA, bgB, glow, defs, motif) => {
    const u = "u" + (n++);
    const fix = s => s.replaceAll("@", u);
    return `<svg class="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<linearGradient id="bg@" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/></linearGradient>
<radialGradient id="gl@" cx="50%" cy="33%" r="65%"><stop offset="0" stop-color="${glow}" stop-opacity=".6"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
${defs}
</defs>
<rect width="300" height="400" fill="url(#bg@)"/>
<rect width="300" height="400" fill="url(#gl@)"/>
${motif}`.replace(/@/g, u) + `</svg>`;
  };

  const G = {
    /* ---- Mines: teal gem + bomb over faint grid ---- */
    mines: () => scene("#241a5e", "#0e0d33", C.ne,
      `<linearGradient id="gem@" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ne1}"/><stop offset="1" stop-color="${C.ne}"/></linearGradient>`,
      `<g opacity=".16" fill="none" stroke="#fff" stroke-width="2">
         ${[0,1,2].flatMap(r=>[0,1,2].map(c=>`<rect x="${78+c*52}" y="${96+r*52}" width="44" height="44" rx="10"/>`)).join("")}
       </g>
       <g transform="translate(150 168)">
         <path d="M-30 -18L30 -18L40 -2L0 50L-40 -2Z" fill="url(#gem@)"/>
         <path d="M-30 -18L30 -18L18 -2L-18 -2Z" fill="#fff" opacity=".35"/>
         <path d="M-18 -2L18 -2L0 50Z" fill="#0a092c" opacity=".18"/>
         <path d="M-30 -18L-40 -2L-18 -2Z" fill="#fff" opacity=".18"/>
       </g>
       <g transform="translate(206 244)">
         <circle r="30" fill="#15123a" stroke="${C.pu}" stroke-width="3"/>
         <circle cx="-9" cy="-9" r="7" fill="#fff" opacity=".5"/>
         <path d="M16 -20q14 -10 18 -26" fill="none" stroke="${C.gold}" stroke-width="4" stroke-linecap="round"/>
         ${spark(36, -50, 9, 1)}
       </g>
       ${spark(70, 250, 7, .8)}${spark(232, 120, 6, .7)}`),

    /* ---- Crash: rocket + dashed trajectory ---- */
    crash: () => scene("#3a0f6e", "#12093a", C.pu,
      "",
      `<path d="M30 360C120 330 150 230 250 70" fill="none" stroke="${C.pu1}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 16" opacity=".8"/>
       <g transform="translate(196 150) rotate(38)">
         <path d="M0 -46C16 -30 16 6 0 26C-16 6 -16 -30 0 -46Z" fill="#eef0ff"/>
         <path d="M0 -46C12 -32 13 -4 8 18L0 26Z" fill="#c7ccf0"/>
         <circle cy="-14" r="9" fill="${C.ne}"/><circle cy="-14" r="4.5" fill="#0a092c" opacity=".5"/>
         <path d="M-12 14L-26 34L-8 26Z" fill="${C.pu}"/><path d="M12 14L26 34L8 26Z" fill="${C.pu}"/>
         <path d="M-7 26L0 56L7 26Z" fill="${C.gold}"/><path d="M-3.5 26L0 44L3.5 26Z" fill="#fff"/>
       </g>
       ${spark(80, 120, 7)}${spark(120, 250, 6, .8)}${spark(240, 250, 8, .9)}`),

    /* ---- Dice: two 3D dice ---- */
    dice: () => scene("#2a1656", "#0e0d33", C.pl1,
      "",
      `<g transform="translate(108 150) rotate(-10)">
         <rect x="-44" y="-44" width="88" height="88" rx="20" fill="#f3f1fb"/>
         <rect x="-44" y="-44" width="88" height="88" rx="20" fill="#000" opacity=".06"/>
         ${[[-22,-22],[22,-22],[0,0],[-22,22],[22,22]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="${C.pl}"/>`).join("")}
       </g>
       <g transform="translate(196 222) rotate(12)">
         <rect x="-38" y="-38" width="76" height="76" rx="18" fill="#fff"/>
         <rect x="-38" y="-38" width="76" height="76" rx="18" fill="${C.pu}" opacity=".08"/>
         ${[[-18,-18],[18,18],[0,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="${C.pu}"/>`).join("")}
       </g>
       ${spark(70, 250, 7)}${spark(236, 130, 6, .8)}`),

    /* ---- Plinko: peg pyramid + ball + bins ---- */
    plinko: () => scene("#221a5a", "#0e0d33", C.ne,
      "",
      `<g fill="#fff" opacity=".5">
        ${[0,1,2,3,4].flatMap(r=>Array.from({length:r+3},(_,c)=>`<circle cx="${150-(r+2)*15+c*30}" cy="${120+r*34}" r="5"/>`)).join("")}
       </g>
       <circle cx="150" cy="92" r="13" fill="${C.gold}"/><circle cx="146" cy="88" r="4" fill="#fff" opacity=".7"/>
       <g>${["#4405e4","#f50bba","#13aded","#f50bba","#4405e4"].map((c,i)=>`<rect x="${66+i*34}" y="296" width="28" height="44" rx="7" fill="${c}" opacity=".85"/>`).join("")}</g>
       ${spark(64, 110, 6)}${spark(236, 250, 7, .8)}`),

    /* ---- HILO: card + up/down ---- */
    hilo: () => scene("#311a5e", "#10093a", C.pu,
      "",
      `<g transform="translate(150 170) rotate(-6)">
         <rect x="-58" y="-78" width="116" height="156" rx="16" fill="#f5f3fc"/>
         <rect x="-58" y="-78" width="116" height="156" rx="16" fill="${C.pl}" opacity=".05"/>
         <text x="-44" y="-44" font-family="Bebas Neue,sans-serif" font-size="34" fill="${C.pu}">A</text>
         <path transform="translate(0 6)" d="M0 -22C-14 -40 -40 -22 0 18C40 -22 14 -40 0 -22Z" fill="${C.pu}"/>
         <text x="44" y="62" text-anchor="end" font-family="Bebas Neue,sans-serif" font-size="34" fill="${C.pu}">A</text>
       </g>
       <g transform="translate(232 120)"><circle r="20" fill="${C.ne}"/><path d="M-9 5L0 -8L9 5Z" fill="#fff"/></g>
       <g transform="translate(68 240)"><circle r="20" fill="${C.pu}"/><path d="M-9 -5L0 8L9 -5Z" fill="#fff"/></g>`),

    /* ---- Wheel ---- */
    wheel: () => scene("#241a5e", "#0e0d33", C.pl1,
      "",
      `<g transform="translate(150 178)">
        ${Array.from({length:8},(_,i)=>{const a=i*45*Math.PI/180,b=(i+1)*45*Math.PI/180,r=74,col=[C.pl,C.pu,C.ne,C.gold][i%4];return `<path d="M0 0L${(r*Math.cos(a)).toFixed(1)} ${(r*Math.sin(a)).toFixed(1)}A${r} ${r} 0 0 1 ${(r*Math.cos(b)).toFixed(1)} ${(r*Math.sin(b)).toFixed(1)}Z" fill="${col}" opacity=".92"/>`;}).join("")}
        <circle r="74" fill="none" stroke="#fff" stroke-width="3" opacity=".4"/>
        <circle r="16" fill="#fff"/><circle r="8" fill="${C.pl}"/>
       </g>
       <path d="M150 86L140 108L160 108Z" fill="${C.gold}"/>`),

    /* ---- Tower ---- */
    tower: () => scene("#2a1656", "#0e0d33", C.ne,
      "",
      `<g>${[0,1,2,3].map(i=>`<rect x="${100+i*4}" y="${300-i*58}" width="${100-i*8}" height="48" rx="10" fill="${[C.pl,C.pl1,C.pu,C.ne][i]}" opacity=".92"/>`).join("")}</g>
       <g transform="translate(150 96)"><path d="M-20 0L20 0L26 12L0 40L-26 12Z" fill="${C.gold}"/><path d="M-20 0L20 0L10 12L-10 12Z" fill="#fff" opacity=".4"/></g>
       ${spark(86, 150, 6)}${spark(220, 210, 7, .8)}`),

    /* ---- Keno: balls ---- */
    keno: () => scene("#221a5a", "#0e0d33", C.pu,
      "",
      `<g opacity=".14" fill="none" stroke="#fff" stroke-width="2">${[0,1,2].flatMap(r=>[0,1,2,3].map(c=>`<rect x="${60+c*48}" y="${100+r*48}" width="40" height="40" rx="9"/>`)).join("")}</g>
       ${[[110,150,C.ne,"7"],[178,196,C.pu,"21"],[132,250,C.gold,"4"]].map(([x,y,c,t])=>`<g transform="translate(${x} ${y})"><circle r="28" fill="${c}"/><circle cx="-9" cy="-9" r="8" fill="#fff" opacity=".5"/><text y="9" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="26" fill="#0a092c">${t}</text></g>`).join("")}`),

    /* ---- Limbo: rising multiplier graph ---- */
    limbo: () => scene("#3a0f6e", "#12093a", C.ne,
      "",
      `<path d="M28 350L120 300L180 210L260 70" fill="none" stroke="${C.ne1}" stroke-width="6" stroke-linecap="round"/>
       <path d="M28 350L120 300L180 210L260 70L260 360L28 360Z" fill="${C.ne}" opacity=".12"/>
       <circle cx="260" cy="70" r="10" fill="#fff"/><circle cx="260" cy="70" r="18" fill="none" stroke="${C.ne1}" stroke-width="3" opacity=".6"/>
       <g transform="translate(96 150)"><rect x="-34" y="-22" width="68" height="44" rx="12" fill="${C.gold}"/><text y="9" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="28" fill="#0a092c">10x</text></g>`),

    /* ---- Coinflip ---- */
    coinflip: () => scene("#2a1656", "#0e0d33", C.gold,
      `<linearGradient id="coin@" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>`,
      `<g transform="translate(150 176)">
         <ellipse cx="22" cy="6" rx="58" ry="74" fill="${C.pl}" opacity=".35"/>
         <circle r="74" fill="url(#coin@)"/>
         <circle r="60" fill="none" stroke="#0a092c" stroke-width="3" opacity=".25"/>
         <text y="22" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="70" fill="#0a092c" opacity=".8">B</text>
         <path d="M-40 -36A60 60 0 0 1 30 -52" fill="none" stroke="#fff" stroke-width="7" opacity=".6" stroke-linecap="round"/>
       </g>
       ${spark(70, 250, 7)}${spark(236, 120, 6, .8)}`),

    /* ----------------- slot themes ----------------- */
    seven: () => scene("#3a0f6e", "#10093a", C.gold,
      `<linearGradient id="g7@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>`,
      `<text x="150" y="248" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="200" fill="url(#g7@)">7</text>
       ${spark(96, 130, 9)}${spark(214, 150, 7, .8)}${spark(150, 300, 6, .7)}`),
    cherry: () => scene("#311a5e", "#10093a", C.pu,
      "",
      `<path d="M150 110C170 150 210 150 214 196" fill="none" stroke="${C.gold}" stroke-width="6" stroke-linecap="round"/>
       <path d="M150 110C130 150 96 150 92 196" fill="none" stroke="${C.gold}" stroke-width="6" stroke-linecap="round"/>
       <circle cx="92" cy="214" r="30" fill="${C.pu}"/><circle cx="84" cy="206" r="8" fill="#fff" opacity=".6"/>
       <circle cx="214" cy="214" r="30" fill="${C.pu1}"/><circle cx="206" cy="206" r="8" fill="#fff" opacity=".6"/>
       <path d="M150 110l28 -22 18 10" fill="none" stroke="#36e0a0" stroke-width="7" stroke-linecap="round"/>`),
    bell: () => scene("#241a5e", "#0e0d33", C.gold,
      `<linearGradient id="be@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>`,
      `<g transform="translate(150 168)"><path d="M0 -64C40 -64 46 -20 54 16C58 34 70 40 70 52L-70 52C-70 40 -58 34 -54 16C-46 -20 -40 -64 0 -64Z" fill="url(#be@)"/><circle cy="-64" r="9" fill="${C.gold2}"/><ellipse cy="64" rx="16" ry="10" fill="${C.gold2}"/><path d="M-30 -40C-20 -10 -22 20 -28 40" fill="none" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/></g>`),
    crown: () => scene("#3a0f6e", "#10093a", C.pu,
      `<linearGradient id="cr@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>`,
      `<g transform="translate(150 176)"><path d="M-80 40L-66 -40L-30 6L0 -50L30 6L66 -40L80 40Z" fill="url(#cr@)"/><rect x="-80" y="40" width="160" height="20" rx="6" fill="${C.gold2}"/><circle cx="0" cy="-50" r="9" fill="${C.pu}"/><circle cx="-66" cy="-40" r="7" fill="${C.ne}"/><circle cx="66" cy="-40" r="7" fill="${C.ne}"/><circle cx="0" cy="22" r="8" fill="${C.pu}"/></g>`),
    gem: () => scene("#221a5a", "#0e0d33", C.ne,
      `<linearGradient id="gm@" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ne1}"/><stop offset="1" stop-color="${C.pl1}"/></linearGradient>`,
      `<g transform="translate(150 172)"><path d="M-46 -24L46 -24L62 -2L0 64L-62 -2Z" fill="url(#gm@)"/><path d="M-46 -24L46 -24L24 -2L-24 -2Z" fill="#fff" opacity=".35"/><path d="M-24 -2L24 -2L0 64Z" fill="#0a092c" opacity=".15"/></g>
       <g transform="translate(96 250) scale(.5)"><path d="M-46 -24L46 -24L62 -2L0 64L-62 -2Z" fill="${C.pu}" opacity=".8"/></g>
       ${spark(218, 250, 7)}`),
    bolt: () => scene("#241a5e", "#0e0d33", C.ne,
      `<linearGradient id="bo@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ne1}"/><stop offset="1" stop-color="${C.ne}"/></linearGradient>`,
      `<path transform="translate(150 176)" d="M14 -78L-34 18L-2 18L-16 78L40 -22L4 -22Z" fill="url(#bo@)"/>
       <path transform="translate(150 176)" d="M14 -78L-34 18L-2 18Z" fill="#fff" opacity=".3"/>
       ${spark(92, 140, 7)}${spark(214, 230, 6, .8)}`)
  };

  const SLOTS = ["seven", "cherry", "bell", "crown", "gem", "bolt"];

  /* ------------------------- HERO scene ------------------------- */
  const hero = () => {
    const u = "h" + (n++);
    const g = s => s.replace(/@/g, u);
    return g(`<svg class="art" viewBox="0 0 460 265" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<radialGradient id="hg@" cx="60%" cy="40%" r="70%"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="coin@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>
<linearGradient id="die@" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8d3ee"/></linearGradient>
</defs>
<rect width="460" height="265" fill="url(#hg@)"/>
<!-- gems -->
<g transform="translate(96 70)"><path d="M-16 -9L16 -9L22 -1L0 24L-22 -1Z" fill="${C.ne1}"/><path d="M-16 -9L16 -9L9 -1L-9 -1Z" fill="#fff" opacity=".4"/></g>
<g transform="translate(360 60) scale(.8)"><path d="M-16 -9L16 -9L22 -1L0 24L-22 -1Z" fill="${C.pu1}"/></g>
<!-- die -->
<g transform="translate(150 150) rotate(-14)"><rect x="-46" y="-46" width="92" height="92" rx="22" fill="url(#die@)"/><rect x="-46" y="-46" width="92" height="92" rx="22" fill="${C.pl}" opacity=".06"/>${[[-22,-22],[22,-22],[0,0],[-22,22],[22,22]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8.5" fill="${C.pl}"/>`).join("")}</g>
<!-- coin stack -->
<g transform="translate(312 168)">
  <ellipse cx="6" cy="58" rx="74" ry="20" fill="${C.pl}" opacity=".35"/>
  ${[40,20,0].map((dy,i)=>`<g transform="translate(0 ${dy})"><ellipse rx="58" ry="22" fill="${C.gold2}"/><ellipse cy="-7" rx="58" ry="22" fill="url(#coin@)"/><ellipse cy="-7" rx="44" ry="15" fill="none" stroke="#0a092c" stroke-width="2" opacity=".2"/>${i===2?`<text y="1" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="30" fill="#0a092c" opacity=".75">B</text>`:""}</g>`).join("")}
</g>
${spark(70, 150, 9)}${spark(250, 60, 8, .85)}${spark(410, 150, 10)}${spark(220, 220, 6, .7)}
</svg>`);
  };

  return {
    gameArt: key => (G[key] || G[SLOTS[0]])(),
    slotKey: i => SLOTS[i % SLOTS.length],
    heroArt: hero
  };
})();
