/* =============================================================
   EXCURSIONS — shared catalogue data, consumed by:
   - the horizontal carousel embedded on the homepage (index.html)
   - catalogue/index.html (the full catalogue overview)
   Only "normandy" is a fully built product (React app + 10-brand
   design gallery, under catalogue/normandy-in-3-journeys/). All the
   others are catalogue-only entries: a teaser card that links to their
   anchor on catalogue/index.html. They were carried over from the
   previous site (uptempo.media/guide), translated into English, and
   their photos now live in assets/images/excursions/.
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
    slug: "normandy",
    title: "Normandy in 3 Journeys",
    region: "Normandy",
    stops: ["Rouen — Middle Ages", "Omaha — WWII", "Honfleur — Impressionism"],
    blurb: "A two-day journey through three of Normandy's most powerful legacies: the Middle Ages, the Second World War, and Impressionism.",
    image: "assets/images/excursions/normandy_rouen.jpg",
    link: "catalogue/normandy-in-3-journeys/gallery.html",
    catalogueLink: "../catalogue/normandy-in-3-journeys/gallery.html",
    built: true
  },
  {
    slug: "monet",
    title: "In the Footsteps of Claude Monet",
    region: "Normandy",
    stops: ["Giverny — Monet's house and gardens", "Honfleur — Harbour of the first Impressionists", "Étretat — Cliffs and light"],
    blurb: "Following Monet and the masters of light — an immersion in the Norman landscapes that shaped the Impressionist revolution.",
    image: "assets/images/excursions/normandie_etretat.jpg"
  },
  {
    slug: "d-day",
    title: "Memory of the Landings",
    region: "Normandy",
    stops: ["Caen Memorial — The war in context", "Omaha Beach — The landings"],
    blurb: "A complete route across the beaches and memorial sites of D-Day, to understand the military, diplomatic and human stakes of the Battle of Normandy.",
    image: "assets/images/excursions/normandie_ww2.jpeg"
  },
  {
    slug: "medieval-normandy",
    title: "Medieval Normandy",
    region: "Normandy",
    stops: ["Rouen — Ducal power", "Bayeux — The Tapestry", "Mont Saint-Michel — Faith and architecture"],
    blurb: "From the power of the dukes to the great cathedrals — a journey into medieval Normandy, between faith, politics and architectural masterpieces.",
    image: "assets/images/excursions/normandie_medieval.png"
  },
  {
    slug: "loire-chateaux",
    title: "Châteaux and Architecture",
    region: "Loire Valley",
    stops: ["Chambord — Royal grandeur", "Blois — Sculpted façades"],
    blurb: "A plunge into royal grandeur: sculpted façades, double-helix staircases and the symbols of power.",
    image: "assets/images/excursions/loire_chambord.webp"
  },
  {
    slug: "loire-renaissance",
    title: "Lights of the Renaissance",
    region: "Loire Valley",
    stops: ["Chenonceau — Renaissance elegance", "Clos Lucé — Leonardo da Vinci"],
    blurb: "Between art, invention and elegance — a living tribute to Leonardo da Vinci and the humanist spirit of the Renaissance.",
    image: "assets/images/excursions/loire_chenonceau.jpeg"
  },
  {
    slug: "loire-gardens",
    title: "Gardens of the Loire Valley",
    region: "Loire Valley",
    stops: ["Villandry — The French formal garden", "Cheverny — Estate and grounds"],
    blurb: "The art of the French garden: symmetry, colour and harmony across the valley's finest estates.",
    image: "assets/images/excursions/loire_jardins.webp"
  },
  {
    slug: "gothic-cathedrals",
    title: "Gothic at Its Peak: The Two Finest Cathedrals",
    region: "Northern France",
    stops: ["Amiens — The Gothic summit", "Beauvais — The highest vault", "Saint-Denis (Paris) — Where Gothic began"],
    blurb: "A reading of the great Gothic cathedrals as true machines of light and stone, at the heart of France's spiritual and political history.",
    image: "assets/images/excursions/nord_cathedral.avif"
  },
  {
    slug: "christmas-markets",
    title: "Christmas Markets",
    region: "Northern France",
    stops: ["Arras — Flemish squares and lights", "Bruges — Artisan markets"],
    blurb: "A winter immersion in Flemish architecture, lights, artisan markets and the Christmas traditions of northern France and Belgium.",
    image: "assets/images/excursions/nord_noel.jpeg"
  },
  {
    slug: "flanders",
    title: "Lights of Flanders",
    region: "Northern France",
    stops: ["Lille — Trade and urban culture", "Bruges — Art of the Flemish cities"],
    blurb: "From Lille to Bruges — the great Flemish cities, shaped by trade, art and an urban culture at the crossroads of northern Europe.",
    image: "assets/images/excursions/nord_bruges.jpeg"
  },
  {
    slug: "reims",
    title: "Reims, Capital of Champagne",
    region: "Eastern France",
    stops: ["Reims — The coronation cathedral", "Reims — Champagne cellars"],
    blurb: "From the coronation cathedral to the champagne cellars — a day to understand the place of Reims in French history and the Champagne art of living.",
    image: "assets/images/excursions/est_reims.webp"
  },
  {
    slug: "troyes",
    title: "Troyes, City of Medieval Colour",
    region: "Eastern France",
    stops: ["Troyes — Half-timbered houses", "Troyes — Flamboyant stained glass"],
    blurb: "Half-timbered houses, flamboyant stained glass and preserved lanes — a plunge into the medieval city and its recovered colours.",
    image: "assets/images/excursions/est_vitrail.jpeg"
  },
  {
    slug: "great-war",
    title: "Memory of the Great War",
    region: "Eastern France",
    stops: ["Belleau Wood Cemetery — Remembrance", "Château-Thierry — The Western Front", "Museum of the Great War, Meaux — Collections"],
    blurb: "A day across the emblematic sites of the Western Front, to understand 1914–18: its battles, its memorials, and how remembrance was built.",
    image: "assets/images/excursions/est_ww1.png"
  },
  {
    slug: "aix-calanques",
    title: "Aix-en-Provence and the Calanques",
    region: "Provence",
    stops: ["Aix-en-Provence — Cézanne and the art of living", "Cassis — The calanques"],
    blurb: "Between Aix, Cézanne and the calanques of Cassis — a journey linking the Provençal art of living, history, Mediterranean landscapes and southern light.",
    image: "assets/images/excursions/provence_aix.jpg"
  },
  {
    slug: "marseille-calanques",
    title: "Marseille and the Calanques",
    region: "Provence",
    stops: ["Marseille — France's oldest city", "Cassis — The calanques"],
    blurb: "From France's oldest city to the calanques — an immersion in Mediterranean culture, its ports, its landscapes and its contrasts.",
    image: "assets/images/excursions/provence_marseille.jpeg"
  },
  {
    slug: "provence-stones",
    title: "Stones of Provence",
    region: "Provence",
    stops: ["Avignon — The papal palace", "Arles — Roman heritage", "Pont du Gard — Roman engineering"],
    blurb: "From Avignon to the Pont du Gard — an itinerary between Roman heritage and papal palaces, reading Provence through its stones and its civilisations.",
    image: "assets/images/excursions/provence_pontdugard.jpeg"
  },
  {
    slug: "bordeaux-estuary",
    title: "Bordeaux, City of Stone and Estuary",
    region: "Bordeaux",
    stops: ["Bordeaux — UNESCO-listed quays", "Arcachon — The basin", "Dune du Pilat — Ocean landscapes"],
    blurb: "From the UNESCO-listed quays to the Dune du Pilat — a journey linking the historic centre, the Arcachon Basin and vast ocean landscapes.",
    image: "assets/images/excursions/bordeaux_arcachon.jpg"
  },
  {
    slug: "bordeaux-vineyards",
    title: "Bordeaux, Vineyards and Landscapes",
    region: "Bordeaux",
    stops: ["Bordeaux — Cité du Vin", "Saint-Émilion — Classified vineyard landscapes"],
    blurb: "Between Bordeaux and Saint-Émilion — the classified vineyard landscapes, the Cité du Vin and the know-how that shapes the Bordeaux wine region.",
    image: "assets/images/excursions/bordeaux_vins.jpeg"
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
