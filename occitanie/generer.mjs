#!/usr/bin/env node
// Génère la version « Occitanie » du site (dossier occitanie/) à partir des pages du site
// principal. Rien n'est recopié à la main : chaque page source est relue, ses chemins sont
// adaptés au sous-dossier, puis une liste de remplacements précis est appliquée.
//
// Chaque remplacement doit trouver EXACTEMENT le nombre d'occurrences attendu dans la
// source. Si le site principal a changé à cet endroit, le script s'arrête et dit lequel :
// on corrige la règle, on ne publie jamais une page à moitié adaptée.
//
//   node occitanie/generer.mjs
//
// La déclinaison Occitanie remplace les exemples par six zones autour de Toulouse.
// Les sorties proches se prêtent à la journée ; les secteurs plus éloignés sont présentés
// comme des inspirations, sans publier de circuits détaillés ni promettre un transport fixe.

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(RACINE, 'occitanie');

/** Applique une règle : texte ou expression, nombre d'occurrences attendu. */
function remplacer(html, page, [avant, apres, attendu = 1]) {
  const re =
    avant instanceof RegExp
      ? new RegExp(avant.source, avant.flags.includes('g') ? avant.flags : avant.flags + 'g')
      : new RegExp(avant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const n = (html.match(re) || []).length;
  if (n !== attendu) {
    throw new Error(`${page} : « ${String(avant).slice(0, 70)} » trouvé ${n} fois, ${attendu} attendu.`);
  }
  return html.replace(re, apres);
}

// ------------------------------------------------------------------ textes communs

const DESTINATIONS = [
  ['north', 'Montauban & the Quercy', 'Romanesque heritage · river towns · limestone villages', 'north'],
  ['east', 'Albi & the Tarn', 'Brick heritage · medieval towns · vineyard culture', 'east'],
  ['west', 'Agen & Bordeaux', 'Garonne cities · architecture · wine landscapes', 'west'],
  ['ariege', 'Ariège & the Pyrenees', 'Fortresses · prehistory · mountain landscapes', 'south'],
  ['bearn', 'Pau, Béarn & Lourdes', 'Royal history · pilgrimage · Pyrenean horizons', 'southwest'],
  ['basque', 'Bayonne, Biarritz & the Basque coast', 'Basque culture · coastal heritage · Atlantic life', 'coast'],
];

const ICONS = {
  north: '<path d="M12 3v18M5 10l7-7 7 7M5 14l7 7 7-7"/>',
  east: '<path d="M4 21h16M6 21V8l6-5 6 5v13M9 11h6M9 15h6"/>',
  west: '<path d="M3 18h18M5 18V9l7-5 7 5v9M8 18v-5h8v5"/>',
  south: '<path d="M3 19l6-8 4 5 3-4 5 7M3 21h18"/>',
  southwest: '<path d="M3 18l6-8 4 5 3-4 5 7M3 21h18M5 5l4 4M5 5v4M5 5h4"/>',
  coast: '<path d="M3 8c3-3 5 3 8 0s5 3 10 0M3 14c3-3 5 3 8 0s5 3 10 0M3 20c3-3 5 3 8 0s5 3 10 0"/>',
};

const tuile = ([slug, nom, accroche, icone]) => `<a class="dest-mini" href="excursions.html#${slug}">
          <span class="dest-mini__media" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[icone]}</svg></span>
          <span class="dest-mini__body"><b>${nom}</b><span>${accroche}</span></span>
        </a>`;

const STYLE_DESTINATIONS = `<style>
  .oot__dests{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:auto;align-content:start;gap:9px}
  .dest-mini{min-height:94px;align-items:flex-start;padding:13px 12px;text-decoration:none;color:var(--ink);transition:background .18s ease,border-color .18s ease}
  .dest-mini:hover{background:var(--canvas-soft);border-color:var(--ink)}
  .dest-mini:focus-visible{outline:3px solid var(--secondary);outline-offset:2px}
  .dest-mini__media{display:grid;place-items:center;width:36px;height:36px;border-radius:0;background:var(--canvas-soft);color:var(--secondary);flex:none}
  .dest-mini__media svg{width:24px;height:24px}
  .dest-mini__body{display:block;min-width:0}
  .dest-mini b{font-size:16px;line-height:1.2}
  .dest-mini span{font-size:13px;line-height:1.4}
  header.top{padding:28px 0 6px}
  header.top p{margin-bottom:10px}
  .quicknav{padding-bottom:24px;margin-bottom:30px}
  .immersion span{font-size:16px;line-height:1.55}
  .occ-region-access{display:inline-flex;align-items:center;gap:8px;margin:0 0 18px;padding:0;color:var(--secondary);font-size:16px;font-weight:800;text-underline-offset:4px}
  .occ-region-access:hover,.occ-region-access:focus-visible{color:var(--ink);text-decoration:underline}
  @media(max-width:560px){.oot__dests{grid-template-columns:1fr}.dest-mini{min-height:72px}}
</style>
</head>`;

const RE_TUILE =
  /<div class="dest-mini">\s*<div class="dest-mini__media">.*?<\/div>\s*<div class="dest-mini__body">.*?<\/div>\s*<\/div>/s;

/** Les huit destinations autour de Paris laissent place aux quatre du plan. */
function destinations(html, page) {
  let i = 0;
  const re = new RegExp(RE_TUILE.source, 'gs');
  const n = (html.match(re) || []).length;
  if (n !== 8) throw new Error(`${page} : 8 destinations attendues, ${n} trouvées.`);
  return html.replace(re, () => (i++ === 0 ? DESTINATIONS.map(tuile).join('\n        ') : '')).replace(/\n\s*\n(\s*<\/div>\s*<\/div>)/, '\n$1');
}

const LANGUE_PLEINE_JOURNEE = [
  /<b>French at the center<\/b>\s*<span>Full Days are immersion days\.[^<]*<\/span>/,
  `<b>French or English</b>
      <span>Full Days can run in French or English, at your group’s level. When in French, the language becomes part of the activity throughout the day.</span>`,
];

const HORS_VILLE = [
  'The same full-day depth, taken beyond the city — a château, a cathedral or a village reached by coach or train, then explored properly, in French, with the travel time itself put to use. Tell me where your group should go and I build the day around it.',
  'A full day beyond Toulouse, built around one clear subject and a small number of connected experiences. Nearby destinations suit a day out; farther regions can be shaped as a longer escape. The group’s interests set the direction.',
];

// Pages du catalogue : même profondeur (un dossier sous la racine), seuls les liens
// vers l'accueil et vers le catalogue des excursions changent.
const LIENS_CATALOGUE = [
  ['href="index.html"', 'href="../catalogue/index.html"', null],
  ['href="../index.html#services"', 'href="index.html#services"', null],
];

function liens(html, page, regles) {
  for (const [a, b, n] of regles) {
    const compte = html.split(a).length - 1;
    if (n !== null && compte !== n) throw new Error(`${page} : « ${a} » trouvé ${compte} fois, ${n} attendu.`);
    html = html.split(a).join(b);
  }
  return html;
}

function remplacerBlocDiv(html, classe, contenu) {
  const debut = html.indexOf(`<div class="${classe}"`);
  if (debut < 0) throw new Error(`bloc .${classe} absent`);
  const tags = /<div\b[^>]*>|<\/div>/g;
  tags.lastIndex = debut;
  let profondeur = 0;
  let fin = -1;
  let m;
  while ((m = tags.exec(html))) {
    profondeur += m[0].startsWith('</') ? -1 : 1;
    if (profondeur === 0) { fin = tags.lastIndex; break; }
  }
  if (fin < 0) throw new Error(`bloc .${classe} incomplet`);
  return html.slice(0, debut) + contenu + html.slice(fin);
}

// ------------------------------------------------------------------ pages

const PAGES = [
  {
    source: 'index.html',
    cible: 'index.html',
    chemins: (html) =>
      html
        .replaceAll('"assets/', '"../assets/')
        .replaceAll('"catalogue/services', '"services')
        .replaceAll('"catalogue/index.html', '"../catalogue/index.html')
        .replaceAll("'catalogue/index.html", "'../catalogue/index.html"),
    regles: [
      ['<title>UpTempo — Cultural &amp; Educational Journeys</title>', '<title>UpTempo — Educational Journeys in Toulouse &amp; Occitanie</title>'],
      [
        'UpTempo designs educational journeys, day trips and workshops that turn destinations into understanding.',
        'UpTempo designs educational journeys, day trips and workshops in Toulouse and across Occitanie that turn destinations into understanding.',
      ],
      ['for study-abroad groups in France —', 'for study-abroad groups in Toulouse and across Occitanie —'],
      [
        'for study-abroad groups in Toulouse and across Occitanie — turning a destination into a lesson worth remembering, built on field knowledge, participatory formats and a genuine sense of place.',
        'for study-abroad groups in Toulouse and across Occitanie, shaped around local culture and your group’s learning goals.',
      ],
      [
        'one subject, several connected places, and French as the working language from morning to evening. Participants pick up a skill or a subject, and practice the language without ever sitting down to study it.',
        'one subject, several connected places, in French or in English, depending on the group’s level. Participants pick up a skill or a subject — and, in French, practice the language without ever sitting down to study it.',
      ],
      ['The same full day, taken outside Paris — for example:', 'The same full day, taken outside Toulouse — for example:'],
      ['>Versailles</a>', '>Carcassonne</a>'],
      ['>Giverny</a>', '>Albi</a>'],
      ['>Chartres</a>', '>Cordes-sur-Ciel</a>'],
      ['>Reims</a>', '>Moissac</a>'],
      ['Round-trip by coach from Paris.', 'Round-trip by coach from Toulouse.'],
      [
        'High-speed train from Paris, with local coach transfers on arrival.',
        'Rail-led departures from Toulouse, with local transfers at destination where practical.',
      ],
      [
        'I am Albert Tshizubu, the guide behind UpTempo — one contact',
        'I am Albert Tshizubu, the guide behind UpTempo, based in Montauban, half an hour from Toulouse by train — one contact',
      ],
      [
        'I’ll come back with a tailored program.</p>',
        'I’ll come back with a tailored program. Available year-round, on request — April to June and September to October fill up fast: book early.</p>',
      ],
    ],
  },
  {
    source: 'catalogue/services.html',
    cible: 'services.html',
    chemins: (html) => liens(html, 'services.html', LIENS_CATALOGUE),
    regles: [LANGUE_PLEINE_JOURNEE, HORS_VILLE],
    destinations: true,
  },
  {
    source: 'catalogue/services-full-days.html',
    cible: 'services-full-days.html',
    chemins: (html) => liens(html, 'services-full-days.html', LIENS_CATALOGUE),
    regles: [LANGUE_PLEINE_JOURNEE, HORS_VILLE],
    destinations: true,
  },
  {
    source: 'catalogue/services-visits.html',
    cible: 'services-visits.html',
    chemins: (html) => liens(html, 'services-visits.html', LIENS_CATALOGUE),
    regles: [],
  },
  {
    source: 'catalogue/services-workshops.html',
    cible: 'services-workshops.html',
    chemins: (html) => liens(html, 'services-workshops.html', LIENS_CATALOGUE),
    regles: [],
  },
];

const AVERTISSEMENT = (source) =>
  `<!-- Page générée par occitanie/generer.mjs depuis ${source}. Ne pas modifier ici : modifier la source ou les règles, puis relancer. -->\n`;

for (const p of PAGES) {
  let html = readFileSync(path.join(RACINE, p.source), 'utf8');
  html = p.chemins(html);
  for (const r of p.regles) html = remplacer(html, p.cible, r);
  html = html.replaceAll('../catalogue/index.html', 'excursions.html');
  if (p.cible === 'index.html') {
    html = remplacerBlocDiv(html, 'excursions', `<div class="excursions">
              <div class="excursions__head"><h3>From Toulouse</h3><a href="excursions.html" class="card-link">Explore all six regions →</a></div>
              <p class="body-md">Nearby day explorations and longer escapes farther afield. Browse broad themes and places, without a fixed route.</p>
            </div>`);
    const chips = `<div class="dest-chips">
                  <a class="dest-chip" href="excursions.html#north">Montauban &amp; Quercy</a>
                  <a class="dest-chip" href="excursions.html#east">Albi &amp; Tarn</a>
                  <a class="dest-chip" href="excursions.html#west">Agen &amp; Bordeaux</a>
                  <a class="dest-chip" href="excursions.html#ariege">Ariège</a>
                  <a class="dest-chip" href="excursions.html#bearn">Pau &amp; Lourdes</a>
                  <a class="dest-chip" href="excursions.html#basque">Basque Coast</a>
                </div>`;
    const chipsRe = /<div class="dest-chips">[\s\S]*?<\/div>/g;
    if ((html.match(chipsRe) || []).length !== 1) throw new Error('index.html : bloc dest-chips inattendu');
    html = html.replace(chipsRe, chips);
    const cta = '<div class="hero__ctas"><a href="#services" class="btn btn--ghost">Services</a><a href="#formats" class="btn btn--ghost">Booster Activities</a></div>';
    if ((html.split(cta).length - 1) !== 1) throw new Error('index.html : groupe de boutons du hero inattendu');
    html = html.replace(cta, cta + '<a class="occ-region-home" href="excursions.html">Explore Toulouse excursion regions →</a>');
    html = html.replace('</head>', '<style>.hero{padding-top:calc(var(--nav-h) + 48px);padding-bottom:58px}.hero__sub{margin-top:18px}.hero__ctas{margin-top:22px}.hero__frame{margin-top:38px}.occ-region-home{display:block;width:fit-content;margin:10px auto 0;color:var(--on-dark);font-size:16px;font-weight:800;text-decoration:underline;text-decoration-color:var(--accent);text-underline-offset:5px}.occ-region-home:hover{color:var(--accent)}</style>\n</head>');
    html = html.replace('<script src="../assets/data/excursions-data.js"></script>\n', '');
    html = html.replace("renderExcursionCarousel('excursionCarousel', (slug) => 'excursions.html#excursion-' + slug);\n(() => { const c = document.getElementById('excursionCarousel'); if (c) c.innerHTML += c.innerHTML; })();\n", '');
  }
  if (p.destinations) {
    html = destinations(html, p.cible);
    html = remplacer(html, p.cible, ['</head>', STYLE_DESTINATIONS]);
    const regionLink = '<a class="occ-region-access" href="excursions.html">Browse the six excursion regions from Toulouse →</a>';
    const heads = html.split('</header>').length - 1;
    if (heads !== 1) throw new Error(p.cible + ' : en-tête inattendu (' + heads + ').');
    html = html.replace('</header>', '</header>\n' + regionLink);
  }
  // Contrôle sur le texte visible : scripts, styles et commentaires exclus.
  const visible = html.replace(/<(script|style)[\s\S]*?<\/\1>|<!--[\s\S]*?-->/g, '');
  if (/\bParis\b/.test(visible)) {
    throw new Error(`${p.cible} : une mention de Paris reste dans la page.`);
  }
  html = html.replace(/<!doctype html>\n?/i, (m) => m + AVERTISSEMENT(p.source));
  writeFileSync(path.join(SORTIE, p.cible), html);
  console.log(`occitanie/${p.cible}`);
}
