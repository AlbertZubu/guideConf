/* =============================================================
   EXCURSIONS — shared catalogue data, consumed by:
   - the horizontal carousel embedded on the homepage (index.html)
   - catalogue/index.html (the full catalogue overview)
   Only "normandy" is a fully built product (React app + 10-brand
   design gallery, under catalogue/normandy-in-3-journeys/). The other
   11 are catalogue-only entries: a teaser card that links to their
   anchor on catalogue/index.html.
   Image URLs are real Wikimedia Commons photos; every <img> using
   this data should keep the same onerror graceful-fallback pattern
   used everywhere else on the site.
   ============================================================= */
const EXCURSIONS = [
  {
    slug: "normandy",
    title: "Normandy in 3 Journeys",
    region: "Normandy",
    stops: ["Rouen — Middle Ages", "Omaha — WWII", "Honfleur — Impressionism"],
    blurb: "A two-day journey through three of Normandy's most powerful legacies: the Middle Ages, the Second World War, and Impressionism.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rouen_-_Gros_horloge_%282%29.jpg",
    link: "catalogue/normandy-in-3-journeys/gallery.html",
    catalogueLink: "../catalogue/normandy-in-3-journeys/gallery.html",
    built: true
  },
  {
    slug: "loire-valley",
    title: "The Loire in 3 Chapters",
    region: "Loire Valley",
    stops: ["Chambord — Royal Architecture", "Chenonceau — Renaissance Gardens", "Clos Lucé — Da Vinci's Renaissance"],
    blurb: "A journey through the Loire Valley's royal age — three chapters of architecture, gardens and Renaissance genius.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ch%C3%A2teau_de_Chambord._France.jpg"
  },
  {
    slug: "provence",
    title: "Provence in Light and Stone",
    region: "Provence",
    stops: ["Pont du Gard — Roman Heritage", "Arles — Van Gogh & Impressionism", "Gordes — Hilltop Villages"],
    blurb: "Three layers of Provence — Roman engineering, Impressionist light and hilltop village life.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gordes_pano.jpg"
  },
  {
    slug: "alsace",
    title: "Alsace: Borders and Bread",
    region: "Alsace",
    stops: ["Strasbourg — European History", "Colmar — Half-Timbered Old Town", "Natzweiler-Struthof — WWII Memory"],
    blurb: "A journey along France's eastern border — European history, half-timbered heritage and the memory of war.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Little_Venice_in_Colmar_01.jpg"
  },
  {
    slug: "brittany",
    title: "Brittany: Stones and Tides",
    region: "Brittany",
    stops: ["Carnac — Megaliths", "Saint-Malo — Corsairs & Maritime History", "Quimper — Breton Culture"],
    blurb: "Three faces of Brittany — deep prehistory, maritime history and living Breton culture.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Carnac_M%C3%A9nec_alignments.jpg"
  },
  {
    slug: "paris",
    title: "Paris in a Day: Power, Faith & Art",
    region: "Paris",
    stops: ["Notre-Dame & Louvre — Power & Faith", "Eiffel Tower & Trocadéro — Modern History", "Montmartre — Impressionism"],
    blurb: "A single day across Paris — royal and religious power, modern history and the birth of Impressionism.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Eiffel_tower_from_trocadero.jpg"
  },
  {
    slug: "burgundy",
    title: "Burgundy: Monks, Wine & Dukes",
    region: "Burgundy",
    stops: ["Vézelay — Pilgrimage & Romanesque", "Beaune — Hospices & Wine Route", "Cluny — Monastic History"],
    blurb: "Three chapters of Burgundy — pilgrimage roads, ducal wealth and monastic influence.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hospices_de_beaune_toit.jpg"
  },
  {
    slug: "champagne",
    title: "Champagne: Kings and Cellars",
    region: "Champagne",
    stops: ["Reims — Coronation Cathedral", "WWI Battlefields — Memory", "Champagne Cellars — Know-How"],
    blurb: "A journey through Champagne — coronation history, the memory of the Great War and centuries of cellar craft.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Facade_of_Reims_Cathedral.jpg"
  },
  {
    slug: "dordogne",
    title: "Dordogne: Deep Time",
    region: "Dordogne",
    stops: ["Lascaux — Prehistoric Caves", "Sarlat — Medieval Town", "Château de Beynac — Castles"],
    blurb: "A journey into deep time — prehistoric art, a perfectly preserved medieval town and clifftop castles.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ch%C3%A2teau_de_Beynac_6.jpg"
  },
  {
    slug: "riviera",
    title: "The Riviera: Belle Époque to Modern Art",
    region: "French Riviera",
    stops: ["Nice — Belle Époque Promenade", "Vence & Cimiez — Matisse & Chagall", "Monaco — Principality History"],
    blurb: "Three eras of the French Riviera — Belle Époque grandeur, modern art and a small principality's history.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Promenade_des_Anglais_(Nice),_France.jpg"
  },
  {
    slug: "nantes",
    title: "Nantes & the Atlantic: Memory and Machines",
    region: "Nantes / Atlantic Coast",
    stops: ["Nantes — Slave Trade Memory", "Machines de l'Île — Industrial Art", "Saint-Nazaire — WWII Submarine Base"],
    blurb: "A journey along the Atlantic — memory, industrial imagination and wartime history.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Elephant_de_nantes.jpg"
  },
  {
    slug: "cathar-country",
    title: "Cathar Country: Castles and Crusades",
    region: "Occitanie",
    stops: ["Carcassonne — Fortress City", "Peyrepertuse — Cathar Castles", "Toulouse — Occitan Capital"],
    blurb: "A journey through Cathar country — a fortress city, mountaintop ruins and the Occitan capital.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cit%C3%A9_de_Carcassonne_%E2%80%93_Porte_d%E2%80%99Aude.jpg"
  }
];

/* Renders the horizontal carousel used on the homepage (index.html).
   `linkResolver` lets each page point non-built excursions at its own
   relative path to catalogue/index.html#slug.
   The "built" excursion (Normandy) opens in the fiche modal instead of
   navigating away — see openFicheModal()/closeFicheModal() below. */
function renderExcursionCarousel(containerId, linkResolver) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = EXCURSIONS.map((ex) => {
    const href = ex.built ? ex.link : linkResolver(ex.slug);
    const onclick = ex.built ? ` onclick="event.preventDefault(); openFicheModal('${href}');"` : "";
    return `<a class="excursion-card" href="${href}"${onclick}>
      <div class="excursion-card__media"><img src="${ex.image}" alt="${ex.title}" loading="lazy" onerror="this.closest('.excursion-card__media').classList.add('fallback');this.remove();"></div>
      <div class="excursion-card__body">
        <span class="excursion-card__region">${ex.region}</span>
        <h4>${ex.title}</h4>
      </div>
    </a>`;
  }).join("");
}

/* Fiche modal — every page that includes this script must also include
   the #ficheModalOverlay / #ficheModalFrame markup (see the shared
   .fiche-modal-overlay block on the homepage, index.html).
   Closes on close-button click, backdrop click, or Escape. */
function openFicheModal(url) {
  const overlay = document.getElementById("ficheModalOverlay");
  const frame = document.getElementById("ficheModalFrame");
  if (!overlay || !frame) return;
  frame.src = url;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeFicheModal() {
  const overlay = document.getElementById("ficheModalOverlay");
  const frame = document.getElementById("ficheModalFrame");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  if (frame) frame.src = "about:blank";
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("ficheModalOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeFicheModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFicheModal();
  });
});
