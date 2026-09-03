/* =============================================================
   EXCURSIONS — shared catalog data, consumed by:
   - the horizontal carousel embedded on the homepage (index.html)
   - catalogue/index.html (the full catalog overview)
   Every excursion (flagship included) now renders through
   catalogue/fiche-template.html + assets/data/excursion-fiches.js.
   The old bespoke Normandy build (React app + multi-design fiche) is
   kept under catalogue/normandy-in-3-journeys/ but no longer linked.
   Entries were carried over from the previous site
   (uptempo.media/guide), translated into English, and their photos
   live in assets/images/excursions/.
   `image` is always written relative to the SITE ROOT; resolve it with
   excursionImage(ex) so it works from both / and /catalogue/. Every
   <img> using this data should keep the same onerror graceful-fallback
   pattern used everywhere else on the site.
   ============================================================= */

/* Directory the site is served from, derived from this script's own URL,
   so the same relative image paths work from any page depth. */
const EXCURSION_BASE = (() => {
  const src = document.currentScript && document.currentScript.src;
  return src ? src.replace(/assets\/data\/excursions-data\.js.*$/, "") : "";
})();
function excursionImage(ex) { return EXCURSION_BASE + ex.image; }

const EXCURSIONS = [
  {
    slug: "normandy-grand-tour",
    title: "The Normandy Grand Tour",
    region: "Normandy",
    stops: ["Rouen — Middle Ages", "Bayeux — The Tapestry", "Omaha — Remembrance", "Honfleur — Impressionism & the seaside"],
    blurb: "The complete first encounter with Normandy — medieval power in Rouen and Bayeux, remembrance at Omaha, and Impressionist light over the harbour of Honfleur.",
    image: "assets/images/excursions/normandy_rouen.jpg",
    link: "catalogue/fiche-template.html?slug=normandy-grand-tour",
    catalogueLink: "../catalogue/fiche-template.html?slug=normandy-grand-tour",
    hasFiche: true
  },
  {
    slug: "impressionist-normandy",
    title: "The Birthplace of Impressionism",
    region: "Normandy",
    stops: ["Rouen — Monet's cathedral", "Honfleur & Étretat — The painters' coast", "Giverny — Monet's house and gardens"],
    blurb: "Why did modern art happen here? Two days in the landscapes where painting learned to chase the light — from Monet's cathedral to his garden.",
    image: "assets/images/excursions/normandie_etretat.jpg",
    link: "catalogue/fiche-template.html?slug=impressionist-normandy",
    catalogueLink: "../catalogue/fiche-template.html?slug=impressionist-normandy",
    hasFiche: true
  },
  {
    slug: "d-day",
    title: "D-Day: The Five Beaches",
    region: "Normandy",
    stops: ["Caen — The Memorial", "Sword · Juno · Gold — The Allied east", "Omaha · Utah — The American west"],
    blurb: "Every D-Day beach in one journey — Sword, Juno, Gold, Omaha and Utah — with the stakes of each sector and every point of view, including the French civilians and the German soldiers.",
    image: "assets/images/excursions/normandie_ww2.jpeg",
    link: "catalogue/fiche-template.html?slug=d-day",
    catalogueLink: "../catalogue/fiche-template.html?slug=d-day",
    hasFiche: true
  },
  {
    slug: "medieval-normandy",
    title: "Normandy's Golden Age",
    region: "Normandy",
    stops: ["Rouen — The medieval capital", "Caen & Bayeux — The Conqueror's cities", "Mont Saint-Michel — The Wonder"],
    blurb: "The Middle Ages that made Normandy a power — the Conqueror's castle, the Tapestry, the great cathedral, and the abbey on the rock.",
    image: "assets/images/excursions/normandie_medieval.png",
    link: "catalogue/fiche-template.html?slug=medieval-normandy",
    catalogueLink: "../catalogue/fiche-template.html?slug=medieval-normandy",
    hasFiche: true
  },
  {
    slug: "loire-chateaux",
    title: "The Château Revolution",
    region: "Loire Valley",
    stops: ["Chambord — The manifesto in stone", "Blois — Four centuries in one courtyard", "Chenonceau — Pure elegance"],
    blurb: "How the Renaissance turned fortresses into palaces — two innovations, tuffeau stone and the mullioned window, and the whole paradigm flips.",
    image: "assets/images/excursions/loire_chambord.webp",
    link: "catalogue/fiche-template.html?slug=loire-chateaux",
    catalogueLink: "../catalogue/fiche-template.html?slug=loire-chateaux",
    hasFiche: true
  },
  {
    slug: "loire-renaissance",
    title: "Lights of the Renaissance",
    region: "Loire Valley",
    stops: ["Chenonceau — The ladies' château", "Amboise — Leonardo's last home", "Chambord — François I's dream"],
    blurb: "The intellectual, economic and artistic revolution of the Renaissance, told through three great châteaux — with Leonardo da Vinci at its heart.",
    image: "assets/images/excursions/loire_chenonceau.jpeg",
    link: "catalogue/fiche-template.html?slug=loire-renaissance",
    catalogueLink: "../catalogue/fiche-template.html?slug=loire-renaissance",
    hasFiche: true
  },
  {
    slug: "loire-gardens",
    title: "Gardens of the Renaissance",
    region: "Loire Valley",
    stops: ["Chenonceau — Gardens over the water", "Chambord — Nature on a royal scale", "Villandry — The formal garden, perfected"],
    blurb: "The whole Renaissance, read through its most photogenic invention: the garden — geometry, color and staging four centuries before Instagram.",
    image: "assets/images/excursions/loire_jardins.webp",
    link: "catalogue/fiche-template.html?slug=loire-gardens",
    catalogueLink: "../catalogue/fiche-template.html?slug=loire-gardens",
    hasFiche: true
  },
  {
    slug: "gothic-cathedrals",
    title: "Gothic at Its Peak: The Two Finest Cathedrals",
    region: "Northern France",
    stops: ["Saint-Denis — Where Gothic began", "Amiens — The Gothic summit", "Beauvais — The highest vault"],
    blurb: "Gothic through the places that determined its destiny — the basilica where it was invented, the cathedral where it peaked, and the choir that flew too high.",
    image: "assets/images/excursions/nord_cathedral.avif",
    link: "catalogue/fiche-template.html?slug=gothic-cathedrals",
    catalogueLink: "../catalogue/fiche-template.html?slug=gothic-cathedrals",
    hasFiche: true
  },
  {
    slug: "christmas-markets",
    title: "Christmas, the Flemish Way",
    region: "Northern France",
    stops: ["Arras — The Grand'Place market", "Lille — The European city", "Ghent & Bruges — Flanders under the lights"],
    blurb: "Four cities where the magic of Christmas is a local art form — markets, lights, beer and traditions with deep medieval roots.",
    image: "assets/images/excursions/nord_noel.jpeg",
    link: "catalogue/fiche-template.html?slug=christmas-markets",
    catalogueLink: "../catalogue/fiche-template.html?slug=christmas-markets",
    hasFiche: true
  },
  {
    slug: "flanders",
    title: "Lights of Flanders",
    region: "Northern France",
    stops: ["Lille — The European city", "Ghent & Bruges — Flemish splendour", "Ostend — The North Sea"],
    blurb: "A historic and cultural region straddling two countries — the great Flemish cities, their canals and belfries, and the light of the North Sea.",
    image: "assets/images/excursions/nord_bruges.jpeg",
    link: "catalogue/fiche-template.html?slug=flanders",
    catalogueLink: "../catalogue/fiche-template.html?slug=flanders",
    hasFiche: true
  },
  {
    slug: "reims",
    title: "Reims, Capital of Champagne",
    region: "Eastern France",
    stops: ["Reims — The coronation cathedral", "Reims — The chalk cellars", "Reims — Art Deco rebirth"],
    blurb: "From the coronation cathedral to the champagne cellars — one day to understand the place of Reims in French history and the Champagne art of living.",
    image: "assets/images/excursions/est_reims.webp",
    link: "catalogue/fiche-template.html?slug=reims",
    catalogueLink: "../catalogue/fiche-template.html?slug=reims",
    hasFiche: true
  },
  {
    slug: "troyes",
    title: "Troyes, City of Medieval Color",
    region: "Eastern France",
    stops: ["Troyes — Half-timbered houses", "Troyes — Flamboyant stained glass"],
    blurb: "Half-timbered houses, flamboyant stained glass and preserved lanes — a plunge into the medieval city and its recovered colors.",
    image: "assets/images/excursions/est_vitrail.jpeg",
    link: "catalogue/fiche-template.html?slug=troyes",
    catalogueLink: "../catalogue/fiche-template.html?slug=troyes",
    hasFiche: true
  },
  {
    slug: "great-war",
    title: "Memory of the Great War",
    region: "Eastern France",
    stops: ["Belleau Wood Cemetery — Remembrance", "Château-Thierry — The Western Front", "Museum of the Great War, Meaux — Collections"],
    blurb: "One day across the emblematic sites of the Western Front, to understand 1914–18: its battles, its memorials, and how remembrance was built.",
    image: "assets/images/excursions/est_ww1.png",
    link: "catalogue/fiche-template.html?slug=great-war",
    catalogueLink: "../catalogue/fiche-template.html?slug=great-war",
    hasFiche: true
  },
  {
    slug: "aix-calanques",
    title: "Aix-en-Provence and the Calanques",
    region: "Provence",
    stops: ["Aix-en-Provence — Cézanne and the art of living", "Cassis — The calanques"],
    blurb: "Between Aix, Cézanne and the calanques of Cassis — a journey linking the Provençal art of living, history, Mediterranean landscapes and southern light.",
    image: "assets/images/excursions/provence_aix.jpg",
    link: "catalogue/fiche-template.html?slug=aix-calanques",
    catalogueLink: "../catalogue/fiche-template.html?slug=aix-calanques",
    hasFiche: true
  },
  {
    slug: "marseille-calanques",
    title: "Marseille and the Calanques",
    region: "Provence",
    stops: ["Marseille — France's oldest city", "Cassis — The calanques"],
    blurb: "From France's oldest city to the calanques — an immersion in Mediterranean culture, its ports, its landscapes and its contrasts.",
    image: "assets/images/excursions/provence_marseille.jpeg",
    link: "catalogue/fiche-template.html?slug=marseille-calanques",
    catalogueLink: "../catalogue/fiche-template.html?slug=marseille-calanques",
    hasFiche: true
  },
  {
    slug: "provence-stones",
    title: "Stones of Provence",
    region: "Provence",
    stops: ["Avignon — The papal palace", "Arles — Roman heritage", "Pont du Gard — Roman engineering"],
    blurb: "From Avignon to the Pont du Gard — an itinerary between Roman heritage and papal palaces, reading Provence through its stones and its civilisations.",
    image: "assets/images/excursions/provence_pontdugard.jpeg",
    link: "catalogue/fiche-template.html?slug=provence-stones",
    catalogueLink: "../catalogue/fiche-template.html?slug=provence-stones",
    hasFiche: true
  },
  {
    slug: "bordeaux-estuary",
    title: "Bordeaux, City of Stone and Estuary",
    region: "Bordeaux",
    stops: ["Bordeaux — UNESCO-listed quays", "Arcachon — The basin", "Dune du Pilat — Ocean landscapes"],
    blurb: "From the UNESCO-listed quays to the Dune du Pilat — a journey linking the historic center, the Arcachon Basin and vast ocean landscapes.",
    image: "assets/images/excursions/bordeaux_arcachon.jpg",
    link: "catalogue/fiche-template.html?slug=bordeaux-estuary",
    catalogueLink: "../catalogue/fiche-template.html?slug=bordeaux-estuary",
    hasFiche: true
  },
  {
    slug: "bordeaux-vineyards",
    title: "Bordeaux, Vineyards and Landscapes",
    region: "Bordeaux",
    stops: ["Bordeaux — Cité du Vin", "Saint-Émilion — Classified vineyard landscapes"],
    blurb: "Between Bordeaux and Saint-Émilion — the classified vineyard landscapes, the Cité du Vin and the know-how that shapes the Bordeaux wine region.",
    image: "assets/images/excursions/bordeaux_vins.jpeg",
    link: "catalogue/fiche-template.html?slug=bordeaux-vineyards",
    catalogueLink: "../catalogue/fiche-template.html?slug=bordeaux-vineyards",
    hasFiche: true
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
    /* Carousel cards always land on the catalog (anchored to the
       excursion) — the fiche modal is opened from the catalog page. */
    const href = linkResolver(ex.slug);
    return `<a class="excursion-card" href="${href}">
      <div class="excursion-card__media"><img src="${excursionImage(ex)}" alt="${ex.title}" loading="lazy" onerror="this.closest('.excursion-card__media').classList.add('fallback');this.remove();"></div>
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
