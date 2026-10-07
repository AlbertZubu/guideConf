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
// Les corrections viennent du plan de prospection (Pro1, onglet Brochure) :
//   2. « Hors de Paris » → « Hors de Toulouse » : Carcassonne · Albi · Cordes-sur-Ciel · Moissac
//   3. « le français comme langue de travail » → « en français ou en anglais, selon le niveau »
//   4. Classic en autocar et Intrepid en train, depuis Toulouse
//   5. Disponibilité : toute l'année sur réservation ; avril-juin et septembre-octobre se remplissent vite
//   6. Logo ACCENT : déjà absent du site (rien à faire)

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
  ['carcassonne', 'Carcassonne', 'The medieval walled city'],
  ['albi', 'Albi', 'The red-brick episcopal city'],
  ['cordes-sur-ciel', 'Cordes-sur-Ciel', 'The Gothic hilltop village'],
  ['moissac', 'Moissac', 'The Romanesque abbey cloister'],
];

// Photos Wikimedia Commons sous licence CC BY-SA : l'auteur doit être cité.
const CREDITS =
  '<br><small style="opacity:.7">Photos: Wikimedia Commons, CC BY-SA — Chensiyuan (Carcassonne), Krzysztof Golik (Albi), Carsten Steger (Cordes-sur-Ciel), Abxbay (Moissac).</small>';

const tuile = ([fichier, nom, accroche]) => `<div class="dest-mini">
          <div class="dest-mini__media"><img src="../assets/images/destinations/${fichier}.jpg" alt="${nom}" loading="lazy" onerror="this.parentElement.classList.add('fallback');this.remove();"></div>
          <div class="dest-mini__body"><b>${nom}</b><span>${accroche}</span></div>
        </div>`;

// Quatre destinations au lieu de huit : la grille prévue pour huit lignes étirait les
// cases. On leur donne plutôt une grande photo.
const STYLE_DESTINATIONS = `<style>
  /* occitanie : 4 destinations en grandes vignettes */
  .oot__dests{ grid-auto-rows:auto; align-content:start; }
  .dest-mini{ flex-direction:column; align-items:stretch; padding:0; overflow:hidden; gap:0; }
  .dest-mini__media{ width:100%; height:170px; border-radius:0; }
  .dest-mini__body{ padding:10px 12px 12px; }
  .dest-mini b{ font-size:14px; }
  .dest-mini span{ font-size:12px; }
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
      <span>Full Days run in French or in English, depending on your group’s level — several Toulouse study-abroad programs require no French at all. In French, they become immersion days: the language is not a subject added to the program but the working language of everything that happens in it, pitched at your group’s level, and participants practice it continuously because the day requires it.</span>`,
];

const HORS_VILLE = [
  'The same full-day depth, taken beyond the city — a château, a cathedral or a village reached by coach or train, then explored properly, in French, with the travel time itself put to use. Tell me where your group should go and I build the day around it.',
  `The same full-day depth, taken beyond the city — a walled city, a cathedral or a hilltop village reached by coach or train, then explored properly, in French or in English, with the travel time itself put to use. Tell me where your group should go and I build the day around it.${CREDITS}`,
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
        'By train from Toulouse, with local coach transfers on arrival.',
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
  if (p.destinations) {
    html = destinations(html, p.cible);
    html = remplacer(html, p.cible, ['</head>', STYLE_DESTINATIONS]);
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
