/* =============================================================
   EXCURSION FICHES — detailed content for the catalogue's modal.
   Consumed by catalogue/fiche-template.html?slug=<slug>, rendered
   with the same markup/skin as the Normandy flagship fiche (see
   catalogue/normandy-in-3-journeys/fiche.html + styles/base.css).

   Only the 17 catalogue-only excursions live here. "Normandy in 3
   Journeys" keeps its own bespoke, multi-design fiche and isn't
   duplicated in this file.

   Every excursion here is framed as a two-day, one-night trip
   departing from Paris — "Classic" by coach for closer regions,
   "Intrepid" by train + local coach for Provence and Bordeaux — per
   the two formats already presented on the homepage.
   ============================================================= */

const BUS_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11"/><path d="M4 11h16"/><path d="M6 17v2M18 17v2"/><circle cx="7.5" cy="14.5" r=".8" fill="currentColor" stroke="none"/><circle cx="16.5" cy="14.5" r=".8" fill="currentColor" stroke="none"/></svg>`;
const LUNCH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;

/* Reused verbatim on every fiche — the site's two signature formats. */
const DEFAULT_FORMATS = [
  { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
  { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to set up what comes next." }
];

const CLOSING_DEFAULT = "Tell us your dates, your group and what you'd like them to walk away understanding — we'll adjust the programme around it.";
const FINEPRINT_DEFAULT = "Educational journey designed by UpTempo — itinerary, timings and activities adjusted to each group's age, size and objectives.";

const EXCURSION_FICHES = {

  /* ================= NORMANDY ================= */

  monet: {
    eyebrow: "Educational journey · Normandy",
    title: "In the Footsteps of Claude Monet",
    sub: "Two days chasing the light that launched Impressionism, from Monet's own garden to the cliffs he painted fifty times.",
    heroImage: "assets/images/excursions/normandie_etretat.jpg",
    heroAlt: "The chalk cliffs of Étretat",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30" },
      { label: "Return", value: "Paris — before 20:00" }
    ],
    intro: [
      "A journey into the landscapes that gave birth to Impressionism, told through the places where it actually happened: Monet's own garden, the harbour where he learned to paint outdoors, and the cliffs he returned to again and again.",
      "Students move from a private, curated garden to a working harbour to an open coastline, and see how the same core idea — that light, not the subject, is what a painting captures — plays out differently in each."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Giverny → Honfleur",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Chasing the Light",
            casts: [{ tag: "clutch", title: "Impressionism, Explained on the Move" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1", title: "Giverny", sub: "Monet's Garden as a Laboratory",
            paragraphs: [
              "Monet's house and gardens at Giverny were not simply a home — the water-lily pond, the Japanese bridge and the flowerbeds were designed and replanted for decades so Monet could study how light changed a single motif across seasons and hours.",
              "Students walk the same paths Monet painted for over forty years, and see first-hand how a garden can double as a working instrument for observing colour."
            ],
            activities: [{ tag: "pulse", title: "Paint What You Actually See",
              paragraphs: ["A short guided observation exercise contrasting what students expect to see (green grass, blue sky) with the colours actually reflected in the changing light — the discovery that set off Impressionism in the first place."] }],
            listing: { label: "Highlights", items: ["Water garden and Japanese bridge", "Monet's house and print collection", "The Clos Normand flower garden"] } },
          { type: "transit", route: "Bus — Giverny to Honfleur", title: "Down the Seine Valley",
            casts: [{ tag: "clutch", title: "Who Actually Painted the First Impressionist Picture?" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 1 · Overnight", title: "Honfleur", sub: "Where the Impressionists First Gathered",
            paragraphs: [
              "Long before Giverny, painters gathered at Honfleur's Saint-Siméon farm to paint the harbour's shifting weather. Eugène Boudin, Monet's first teacher, worked here — this is where Monet learned to paint outdoors, directly from nature.",
              "The Vieux Bassin, its slate-fronted houses and the wooden Sainte-Catherine church give students a still-working harbour town that looks remarkably close to what 19th-century painters saw."
            ],
            activities: [{ title: "Harbour of Light",
              paragraphs: ["An observation walk comparing the same view of the Vieux Bassin at different times of day, tracing why painters became obsessed with capturing a fleeting moment rather than a fixed scene."] }],
            extra: { label: "Additional Activities", items: ["Sainte-Catherine wooden church and belfry", "Eugène Boudin Museum"] },
            closingNote: "Dinner and Overnight in Honfleur" }
        ]
      },
      {
        tag: "Day 2",
        route: "Honfleur → Étretat → Paris",
        steps: [
          { type: "transit", route: "Bus — Honfleur to Étretat", title: "Along the Alabaster Coast",
            casts: [{ tag: "clutch", title: "Guy de Maupassant's Cliffs" }] },
          { type: "stop", num: 3, image: "assets/images/excursions/normandie_etretat.jpg", alt: "Étretat cliffs",
            eyebrow: "Stop 3 · Day 2", title: "Étretat", sub: "Cliffs, Light and a Natural Cathedral of Stone",
            paragraphs: [
              "The chalk cliffs and the Porte d'Aval arch drew Monet back more than fifty times — he painted the same rock formations under storm light, sunset and fog, chasing an instant that never repeated itself twice.",
              "Students climb to the clifftop viewpoints to compare Monet's canvases with the real coastline, and see how weather, not the subject, was his true subject."
            ],
            activities: [{ tag: "pulse", title: "Fifty Paintings, One Cliff",
              paragraphs: ["A comparison exercise using reproductions of Monet's Étretat series to identify what light, tide and season changed from one version to the next."] }],
            closingNote: "Lunch and Free Time in Étretat" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "d-day": {
    eyebrow: "Educational journey · Normandy",
    title: "Memory of the Landings",
    sub: "Two days across the sites of June 6, 1944 — from the wider context to the beach itself.",
    heroImage: "assets/images/excursions/normandie_ww2.jpeg",
    heroAlt: "Omaha Beach, Normandy",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Before walking the beaches, students need the bigger picture: what led to D-Day, what it changed, and why it is remembered the way it is. This route moves from a museum that sets the full context to the shoreline where the landings actually happened.",
      "The goal is not a checklist of sites but an understanding of the military, diplomatic and deeply human stakes of the Battle of Normandy."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Caen",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Setting the Scene",
            casts: [{ tag: "clutch", title: "What Actually Happened on June 6, 1944?" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Caen Memorial", sub: "The War in Context",
            paragraphs: [
              "The Caen Memorial Museum sets the Normandy landings inside the full arc of the Second World War — its causes, the occupation of France, and the diplomatic calculations behind opening a Western Front.",
              "Its galleries move from the interwar years to the Cold War, showing D-Day as one hinge in a much longer conflict rather than an isolated event."
            ],
            activities: [{ title: "Five Objects, One War",
              paragraphs: ["A museum trail built around five artefacts, each one unlocking a different actor of the war — soldier, civilian, resistant, occupier, liberator."] }],
            closingNote: "Lunch and Free Time in Caen — Dinner and Overnight in Caen" },
        ]
      },
      {
        tag: "Day 2",
        route: "Caen → Omaha Beach → Paris",
        steps: [
          { type: "transit", route: "Bus — Caen to Omaha Beach", title: "To the Coast",
            casts: [{ tag: "clutch", title: "The Weather Report That Nearly Cancelled D-Day" }] },
          { type: "stop", num: 2, image: "assets/images/excursions/normandie_ww2.jpeg", alt: "Omaha Beach American Cemetery",
            eyebrow: "Stop 2 · Day 2", title: "Omaha Beach", sub: "The Landings, Where They Happened",
            paragraphs: [
              "On the beach itself, the scale of the operation becomes physical: the width of open sand, the height of the bluffs above it, the distance troops had to cross under fire.",
              "The American Cemetery overlooking the beach adds a second register — from strategy to the individual lives the strategy cost."
            ],
            activities: [{ tag: "pulse", title: "D-Day by the Tideline",
              paragraphs: ["A walking activity comparing period photographs to the current shoreline, to see exactly where and how the landing unfolded."] }],
            extra: { label: "Additional Activities", items: ["American Cemetery", "Overlook bunkers and remaining coastal defences"] },
            closingNote: "Lunch and Free Time near Omaha Beach" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "medieval-normandy": {
    eyebrow: "Educational journey · Normandy",
    title: "Medieval Normandy",
    sub: "From ducal power to the great abbey on the bay — two days between faith, politics and architecture.",
    heroImage: "assets/images/excursions/normandie_medieval.png",
    heroAlt: "Mont Saint-Michel",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30" },
      { label: "Return", value: "Paris — before 20:00" }
    ],
    intro: [
      "A journey into the Normandy that existed centuries before the beaches — the duchy that once conquered England, the cathedral city where Joan of Arc was tried, and the tidal abbey built as a physical argument for the power of faith.",
      "Students trace how three very different sources of power — dukes, bishops, and monks — each left a building built to be seen from miles away."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Rouen → Bayeux",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Into the Duchy",
            casts: [{ tag: "clutch", title: "The Duke Who Conquered a Kingdom" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/normandy_rouen.jpg", alt: "Rouen Cathedral",
            eyebrow: "Stop 1 · Day 1", title: "Rouen", sub: "Ducal Power and the Trial of Joan of Arc",
            paragraphs: [
              "Rouen was the seat of the dukes of Normandy — the same lineage that, as William the Conqueror, took the English throne in 1066. Its cathedral and historic streets carry that political weight, and its Old Market Square carries a very different one: it's where Joan of Arc was tried and executed in 1431.",
              "Students walk both stories in the same half-day — a duchy powerful enough to conquer a kingdom, and a trial that shows how fragile that power could look from the inside."
            ],
            activities: [{ tag: "pulse", title: "Debunk the Middle Ages",
              paragraphs: ["An engaging walking exploration of Rouen designed to challenge common misconceptions about medieval life, belief and everyday reality."] }],
            listing: { label: "3 Learning Points", items: ["Medieval Lifestyle: a Life to Envy — or Escape?", "Gothic Cathedral: a Spaceship to Heaven", "Joan of Arc: The Spy Who Ended the Middle Ages"] },
            closingNote: "Lunch and Free Time in Rouen" },
          { type: "transit", route: "Bus — Rouen to Bayeux", title: "Toward the Conquest",
            casts: [{ tag: "clutch", title: "1066, Told in 20 Minutes" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 1 · Overnight", title: "Bayeux", sub: "The Conquest, Woven in Wool",
            paragraphs: [
              "The Bayeux Tapestry is 70 metres of embroidered narrative telling the Norman conquest of England from the Norman point of view — one of Europe's oldest surviving pieces of political propaganda, and still riveting to read scene by scene.",
              "The town's preserved centre and cathedral give students a quieter medieval Normandy to end the day in, before an early start toward the coast tomorrow."
            ],
            activities: [{ title: "Read the Tapestry Like a Comic Strip",
              paragraphs: ["A guided reading of the Tapestry's key panels — omens, betrayals, the crossing, the battle — treating it as the graphic novel it essentially is."] }],
            closingNote: "Dinner and Overnight in Bayeux" }
        ]
      },
      {
        tag: "Day 2",
        route: "Bayeux → Mont Saint-Michel → Paris",
        steps: [
          { type: "transit", route: "Bus — Bayeux to Mont Saint-Michel", title: "Toward the Bay",
            casts: [{ tag: "clutch", title: "Why Build an Abbey on a Rock in the Sea?" }] },
          { type: "stop", num: 3, image: "assets/images/excursions/normandie_medieval.png", alt: "Mont Saint-Michel",
            eyebrow: "Stop 3 · Day 2", title: "Mont Saint-Michel", sub: "Faith and Architecture, Built to Be Seen",
            paragraphs: [
              "Mont Saint-Michel is a monastery, a fortress and a message all at once: a Benedictine abbey stacked upward over centuries on a tidal islet, visible for miles as a claim about the reach of faith.",
              "Students climb through the abbey's layered architecture — Romanesque nave, Gothic choir, the fortified ramparts — and see how each century added its own answer to the same ambition."
            ],
            activities: [{ tag: "pulse", title: "Build a Mountain into a Monastery",
              paragraphs: ["A guided climb through the abbey's levels, using the building itself to explain how medieval engineers solved the problem of building upward on an impossible site."] }],
            listing: { label: "Highlights", items: ["Abbey church and cloister", "The Great Wheel and store rooms", "Views across the tidal bay"] },
            closingNote: "Lunch and Free Time at Mont Saint-Michel" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  /* ================= LOIRE VALLEY ================= */

  "loire-chateaux": {
    eyebrow: "Educational journey · Loire Valley",
    title: "Châteaux and Architecture",
    sub: "Royal grandeur, sculpted façades, and the symbols of power built into stone.",
    heroImage: "assets/images/excursions/loire_chambord.webp",
    heroAlt: "Château de Chambord",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days among the châteaux that most openly turn architecture into a statement of power — a full day for each: Chambord's sheer excess, and Blois's four centuries of styles standing side by side in the same courtyard.",
      "Students learn to read a château the way its builders intended it to be read — not as decoration, but as a message about who was in charge."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Chambord → Blois",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Into the Loire",
            casts: [{ tag: "clutch", title: "A King Who Built a Palace Just to Hunt" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/loire_chambord.webp", alt: "Château de Chambord",
            eyebrow: "Stop 1 · Day 1", title: "Chambord", sub: "Royal Grandeur, Built to Impress",
            paragraphs: [
              "Commissioned by François I as a hunting lodge — though 'lodge' undersells 440 rooms and 84 staircases — Chambord was never really about hunting. It was built to be talked about, a physical demonstration of what a Renaissance king could command.",
              "Its double-helix spiral staircase, long attributed to ideas circulating around Leonardo da Vinci, lets two people climb at once without ever meeting — a piece of engineering as much as of theatre."
            ],
            activities: [{ tag: "pulse", title: "Climb the Staircase That Never Crosses",
              paragraphs: ["A hands-on investigation of the double-helix staircase — how it works, why it was built that way, and what it reveals about Renaissance ideas of cleverness and display."] }],
            listing: { label: "Highlights", items: ["Double-helix staircase", "Rooftop terraces and lantern tower", "François I's salamander emblem, everywhere"] },
            closingNote: "Lunch and Free Time at Chambord" },
          { type: "transit", route: "Bus — Chambord to Blois", title: "Evening Arrival in Blois — Dinner and Overnight",
            casts: [{ tag: "clutch", title: "Spot the Century" }] }
        ]
      },
      {
        tag: "Day 2",
        route: "Blois → Paris",
        steps: [
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Blois", sub: "Sculpted Façades and a Political Murder",
            paragraphs: [
              "Blois's courtyard is a rare thing: four wings built across four different centuries and styles, standing side by side without ever being unified — Gothic, Renaissance, Classical, all in one glance.",
              "It was also the stage for one of the Wars of Religion's most dramatic moments: the assassination of the Duke of Guise on the king's orders, right inside the château, in 1588."
            ],
            activities: [{ title: "One Courtyard, Four Centuries",
              paragraphs: ["A comparative reading of the four façades to identify what changed in taste, technique and ambition from one century to the next."] }],
            extra: { label: "Additional Activities", items: ["Sound-and-light evocation of the Duke of Guise's assassination (seasonal)", "Tasting of local products"] },
            closingNote: "Lunch and Free Time in Blois" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "loire-renaissance": {
    eyebrow: "Educational journey · Loire Valley",
    title: "Lights of the Renaissance",
    sub: "Between art, invention and elegance — a living tribute to Leonardo da Vinci and the humanist spirit.",
    heroImage: "assets/images/excursions/loire_chenonceau.jpeg",
    heroAlt: "Château de Chenonceau",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days pairing the Loire's most elegant château with the workshop of the mind that shaped an entire era: Chenonceau's architecture of power and taste, and Clos Lucé, where Leonardo da Vinci spent his final years.",
      "Together they trace the Renaissance as both a court style and an idea — invention, observation and beauty treated as a single pursuit."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Chenonceau → Amboise",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Two Women, One Château",
            casts: [{ tag: "clutch", title: "The Château Built by the Women Who Ran It" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/loire_chenonceau.jpeg", alt: "Château de Chenonceau",
            eyebrow: "Stop 1 · Day 1", title: "Chenonceau", sub: "Renaissance Elegance, Built Across a River",
            paragraphs: [
              "Chenonceau is unusual among the great Loire châteaux for having been shaped almost entirely by women — Catherine Briçonnet, then Diane de Poitiers, then Catherine de Médicis, each leaving a mark still visible today.",
              "Its gallery spanning the Cher river turns a defensive feature into a piece of pure architectural elegance — a bridge you can live in, built to be admired rather than defended."
            ],
            activities: [{ tag: "pulse", title: "A Château Shaped by Its Women",
              paragraphs: ["A guided reading of Chenonceau's rooms and gardens through the choices of the women who successively ran it — patronage, rivalry, and taste as forms of power."] }],
            listing: { label: "Highlights", items: ["Gallery over the Cher river", "Catherine de Médicis's gardens", "Diane de Poitiers's gardens"] },
            closingNote: "Lunch and Free Time at Chenonceau" },
          { type: "transit", route: "Bus — Chenonceau to Amboise", title: "Evening Arrival in Amboise — Dinner and Overnight",
            casts: [{ tag: "clutch", title: "Why Did Leonardo Da Vinci End Up in the Loire?" }] }
        ]
      },
      {
        tag: "Day 2",
        route: "Amboise → Clos Lucé → Paris",
        steps: [
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Clos Lucé", sub: "Leonardo da Vinci's Last Workshop",
            paragraphs: [
              "Invited by François I, Leonardo spent his final three years at Clos Lucé, reportedly connected to the royal château of Amboise by an underground passage. He came not just as a painter but as an engineer, inventor and stage designer for the court.",
              "The house and its park now hold working models built from his notebooks — flying machines, war machines, hydraulic devices — turning sketches into things students can actually see move."
            ],
            activities: [{ title: "Invent Like Leonardo",
              paragraphs: ["A hands-on session with models built from Leonardo's own notebooks, examining the difference between an idea that looks brilliant on paper and one that actually works."] }],
            extra: { label: "Additional Activities", items: ["Park of machines and inventions", "Tasting of local products"] },
            closingNote: "Lunch and Free Time in Amboise" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "loire-gardens": {
    eyebrow: "Educational journey · Loire Valley",
    title: "Gardens of the Loire Valley",
    sub: "The art of the French garden — symmetry, colour and harmony across two of the valley's finest estates.",
    heroImage: "assets/images/excursions/loire_jardins.webp",
    heroAlt: "Gardens of Villandry",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days devoted entirely to landscape as design: Villandry's geometric vegetable and ornamental gardens, and Cheverny's more relaxed English-influenced grounds and hunting tradition.",
      "Students learn to read a garden the way a 16th- or 19th-century visitor would have — as a controlled, deliberate statement about order, nature and taste."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Villandry → Tours",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "The Garden as Architecture",
            casts: [{ tag: "clutch", title: "A Vegetable Garden Fit for a King" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/loire_jardins.webp", alt: "Villandry gardens",
            eyebrow: "Stop 1 · Day 1", title: "Villandry", sub: "The French Formal Garden, Perfected",
            paragraphs: [
              "Villandry's terraced gardens are the clearest surviving example of the French formal garden: box hedges clipped into geometric patterns, an ornamental vegetable garden treated with the same design rigour as a flowerbed, and sightlines planned down to the metre.",
              "From the château's terrace, the whole design reveals itself at once — proof that a garden here was meant to be read from above as much as walked through."
            ],
            activities: [{ tag: "pulse", title: "Design Your Own Formal Garden",
              paragraphs: ["A short design exercise using Villandry's own grid as a model, exploring how symmetry, colour and proportion combine into a single visual argument."] }],
            listing: { label: "Highlights", items: ["Ornamental vegetable garden", "Sun garden and water garden", "Overview terrace"] },
            closingNote: "Lunch and Free Time at Villandry" },
          { type: "transit", route: "Bus — Villandry to Tours", title: "Evening in Tours — Dinner and Overnight",
            casts: [{ tag: "clutch", title: "How the Loire Became the Garden of France" }] }
        ]
      },
      {
        tag: "Day 2",
        route: "Tours → Cheverny → Paris",
        steps: [
          { type: "transit", route: "Bus — Tours to Cheverny", title: "From Formal to Familiar",
            casts: [{ tag: "clutch", title: "The Château That Inspired Tintin's Moulinsart" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Cheverny", sub: "Estate, Grounds and Living Tradition",
            paragraphs: [
              "Still lived in by the same family for over six centuries, Cheverny pairs a strikingly symmetrical Classical façade with grounds shaped for a different purpose: hunting, still practised on the estate today.",
              "Its interiors, its hound kennels and its long connection to French popular culture — the château is the acknowledged model for Moulinsart in Tintin — give students a Loire estate still very much alive rather than frozen as a monument."
            ],
            activities: [{ title: "A Château Still Lived In",
              paragraphs: ["A tour focused on what makes Cheverny different from a purely historic monument: continuous family ownership, a working hunting tradition, and a design meant for daily life."] }],
            extra: { label: "Additional Activities", items: ["Hound kennels and hunting tradition", "Tasting of local products"] },
            closingNote: "Lunch and Free Time near Cheverny" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  /* ================= NORTHERN FRANCE ================= */

  "gothic-cathedrals": {
    eyebrow: "Educational journey · Northern France",
    title: "Gothic at Its Peak: The Two Finest Cathedrals",
    sub: "Reading the great Gothic cathedrals as machines of light and stone — from where Gothic began to where it peaked.",
    heroImage: "assets/images/excursions/nord_cathedral.avif",
    heroAlt: "Amiens Cathedral",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days tracing Gothic architecture from its birthplace to its most extreme ambitions: Saint-Denis, where the style was invented; Beauvais, where engineers pushed height until the building itself protested; and Amiens, the largest Gothic cathedral in France.",
      "Students learn to see these buildings as engineering arguments as much as religious ones — every pointed arch and flying buttress a solution to the same obsession: more light, more height, less wall."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris (Saint-Denis) → Beauvais → Amiens",
        steps: [
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1", title: "Saint-Denis", sub: "Where Gothic Began",
            paragraphs: [
              "The Basilica of Saint-Denis, rebuilt from 1140 under Abbot Suger, is where the Gothic style was effectively invented: the first systematic use of pointed arches and ribbed vaults to open walls up to stained glass instead of stone.",
              "It's also the royal necropolis of France — nearly every French king from the Middle Ages onward is buried here, making it a monument to both an architectural revolution and a political one."
            ],
            activities: [{ tag: "pulse", title: "Spot the First Gothic Trick",
              paragraphs: ["A guided reading of Saint-Denis's choir, identifying the specific structural innovations that let architects start replacing wall with window."] }] },
          { type: "transit", route: "Bus — Paris to Beauvais", title: "Building Too High",
            casts: [{ tag: "clutch", title: "The Cathedral That Collapsed From Ambition" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 1", title: "Beauvais", sub: "The Highest Vault Ever Attempted",
            paragraphs: [
              "Beauvais Cathedral's choir vault reaches nearly 48 metres — still the highest Gothic vault ever built — and the ambition nearly ended in disaster: parts of it collapsed twice during and after construction.",
              "The cathedral was never finished; walking its truncated nave, students see Gothic architecture at the exact point where engineering outran what medieval stone could reliably hold."
            ],
            activities: [{ title: "How High Is Too High?",
              paragraphs: ["An activity comparing Beauvais's vault height to other Gothic cathedrals, and examining the reinforcements later added to keep the building standing at all."] }],
            closingNote: "Lunch and Free Time in Beauvais" },
          { type: "transit", route: "Bus — Beauvais to Amiens", title: "Evening Arrival in Amiens — Dinner and Overnight",
            casts: [{ tag: "clutch", title: "How to Build the Biggest Cathedral in France" }] }
        ]
      },
      {
        tag: "Day 2",
        route: "Amiens → Paris",
        steps: [
          { type: "stop", num: 3, image: "assets/images/excursions/nord_cathedral.avif", alt: "Amiens Cathedral",
            eyebrow: "Stop 3 · Day 2", title: "Amiens", sub: "Gothic at Full Scale",
            paragraphs: [
              "Amiens Cathedral is the largest Gothic cathedral in France by interior volume — its entire west front, in fact, is regularly used to test digital projection mapping precisely because of its scale and sculptural detail.",
              "Where Saint-Denis showed the idea and Beauvais showed the limit, Amiens shows the style at full, confident maturity: vast, coherent, and built to be finished."
            ],
            activities: [{ tag: "pulse", title: "Read the West Front",
              paragraphs: ["A close reading of the sculpted west façade — its Last Judgment tympanum and hundreds of figures — as a medieval encyclopedia meant to be understood by an illiterate public."] }],
            listing: { label: "Highlights", items: ["Sculpted west façade", "Choir stalls", "Labyrinth on the nave floor"] },
            closingNote: "Lunch and Free Time in Amiens" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "christmas-markets": {
    eyebrow: "Educational journey · Northern France",
    title: "Christmas Markets",
    sub: "A winter immersion in Flemish architecture, artisan markets and the Christmas traditions of the North.",
    heroImage: "assets/images/excursions/nord_noel.jpeg",
    heroAlt: "Christmas market in Arras",
    facts: [
      { label: "Duration", value: "2 days, 1 night (seasonal)" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 20:30" }
    ],
    intro: [
      "A seasonal two-day journey through two of the great Flemish town squares, dressed for winter: Arras's arcaded Grand'Place and Place des Héros, then Bruges's canals and medieval market square, both lined with wooden chalets.",
      "Beyond the festive atmosphere, students look at what makes these squares distinctly Flemish — a shared architectural language born of medieval trade wealth, still standing five centuries later."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1 (seasonal)",
        route: "Paris → Arras",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "Into Flemish Territory",
            casts: [{ tag: "clutch", title: "Why Do These Squares Look the Same in Two Countries?" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/nord_noel.jpeg", alt: "Grand'Place, Arras",
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Arras", sub: "Flemish Squares and Winter Lights",
            paragraphs: [
              "Arras's two central squares, the Grand'Place and the Place des Héros, are ringed by more than 150 near-identical Flemish Baroque façades — a rare case of coordinated urban planning surviving intact since the 17th and 18th centuries.",
              "For the market, the squares fill with wooden chalets and lights beneath the arcades, and the belfry — a UNESCO-listed symbol of the medieval cities' civic independence — anchors the whole scene."
            ],
            activities: [{ tag: "pulse", title: "One Square, 150 Matching Façades",
              paragraphs: ["A walking activity spotting the small variations hidden within Arras's apparently identical arcaded houses — and what that uniformity says about medieval urban regulation."] }],
            listing: { label: "Highlights", items: ["Grand'Place and Place des Héros", "Belfry (UNESCO)", "Artisan market chalets"] },
            closingNote: "Lunch and Free Time in Arras — Dinner and Overnight, with the market under the evening lights" },
        ]
      },
      {
        tag: "Day 2",
        route: "Arras → Bruges → Paris",
        steps: [
          { type: "transit", route: "Bus — Arras to Bruges", title: "Crossing into Belgium",
            casts: [{ tag: "clutch", title: "A City Frozen by Its Own River Silting Up" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Bruges", sub: "Artisan Markets on the Canals",
            paragraphs: [
              "Bruges owes its astonishingly preserved medieval centre to an accident of geography: its river silted up in the 15th century, cutting off its trade wealth and, inadvertently, freezing the city in place while others kept rebuilding.",
              "At Christmas, the Markt and Burg squares add an ice rink, artisan stalls and lights to canals already built for a different century — a market that feels layered on top of history rather than built for it."
            ],
            activities: [{ title: "A City the Modern World Passed By",
              paragraphs: ["A guided walk connecting Bruges's medieval street plan to the economic accident that preserved it, using the canals as the through-line."] }],
            extra: { label: "Additional Activities", items: ["Canal-side artisan stalls", "Belgian chocolate and waffle tasting"] },
            closingNote: "Lunch and Free Time in Bruges" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  flanders: {
    eyebrow: "Educational journey · Northern France",
    title: "Lights of Flanders",
    sub: "From Lille to Bruges — the great Flemish cities, shaped by trade, art and an urban culture at Europe's crossroads.",
    heroImage: "assets/images/excursions/nord_bruges.jpeg",
    heroAlt: "Canals of Bruges",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 20:00" }
    ],
    intro: [
      "Two days linking two Flemish cities either side of the French-Belgian border: Lille, a French city that still reads as unmistakably Flemish, and Bruges, one of the best-preserved medieval cities in Europe.",
      "Students see how a shared regional culture — brick architecture, canal trade, guild wealth — persisted across a border drawn centuries after the buildings were."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Lille",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "One Region, Two Countries",
            casts: [{ tag: "clutch", title: "What Makes a City 'Flemish'?" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Lille", sub: "Trade and Urban Culture",
            paragraphs: [
              "Lille's Vieux-Lille district — brick façades, ornate gables, the Vieille Bourse's carved courtyard — is the clearest evidence that the city belongs to the same architectural world as Belgium and the Netherlands, despite being French since 1667.",
              "Its wealth was built on textile trade and its old stock exchange still shows what merchant money looked like when it was spent on architecture rather than hidden."
            ],
            activities: [{ tag: "pulse", title: "Follow the Brick",
              paragraphs: ["A walking activity through Vieux-Lille identifying the Flemish architectural features — stepped gables, brick-and-stone façades — that a border on a map doesn't erase."] }],
            listing: { label: "Highlights", items: ["Vieille Bourse courtyard", "Grand'Place (Place du Général-de-Gaulle)", "Vieux-Lille façades"] },
            closingNote: "Lunch and Free Time in Lille — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Lille → Bruges → Paris",
        steps: [
          { type: "transit", route: "Bus — Lille to Bruges", title: "Further Into Flanders",
            casts: [{ tag: "clutch", title: "The Venice of the North" }] },
          { type: "stop", num: 2, image: "assets/images/excursions/nord_bruges.jpeg", alt: "Bruges canals",
            eyebrow: "Stop 2 · Day 2", title: "Bruges", sub: "Art of the Flemish Cities",
            paragraphs: [
              "Bruges was, for a stretch of the Middle Ages, one of the wealthiest trading cities in Europe — a hub for wool, banking and, crucially, for the Flemish primitive painters whose work still hangs in its churches and museums.",
              "Its canals, market square and belfry give students a complete, walkable version of what a great medieval Flemish city looked like at its peak, still functioning rather than reconstructed."
            ],
            activities: [{ title: "The City That Financed a Painting Style",
              paragraphs: ["A short museum visit connecting Bruges's medieval trade wealth to the rise of Flemish primitive painting — patronage as the engine behind an entire artistic movement."] }],
            listing: { label: "Highlights", items: ["Markt and Belfry", "Canal boat perspective", "Flemish primitive painting collections"] },
            closingNote: "Lunch and Free Time in Bruges" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  /* ================= EASTERN FRANCE ================= */

  reims: {
    eyebrow: "Educational journey · Eastern France",
    title: "Reims, Capital of Champagne",
    sub: "From the coronation cathedral to the champagne cellars — two days of French monarchy and Champagne savoir-faire.",
    heroImage: "assets/images/excursions/est_reims.webp",
    heroAlt: "Reims Cathedral",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days built around a single city carrying two very different kinds of French prestige: the cathedral where French kings were crowned for nearly a thousand years, and the cellars where champagne became a global symbol of celebration.",
      "Students see how one place can hold both a story of political legitimacy and a story of regional craft, often just streets apart."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Reims",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "The Coronation City",
            casts: [{ tag: "clutch", title: "Why Kings Were Crowned in Reims, Not Paris" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/est_reims.webp", alt: "Reims Cathedral",
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Reims — The Coronation Cathedral", sub: "Where French Kings Were Made Kings",
            paragraphs: [
              "From Clovis's baptism in 496 to Charles X in 1825, most French monarchs were crowned in Reims Cathedral — a tradition that turned the building into a site of political legitimacy as much as religious ceremony.",
              "Heavily damaged in the First World War and painstakingly restored, its west front's sculpted angels and its stained glass — including a modern window by Marc Chagall — still make the case for why this particular cathedral mattered so much."
            ],
            activities: [{ tag: "pulse", title: "Crown a King",
              paragraphs: ["A guided walk-through of the coronation ceremony itself — the objects, the order, the symbolism — reconstructed at the exact spots where it happened."] }],
            listing: { label: "Highlights", items: ["West front's Smiling Angel", "Chagall stained glass", "Nave and coronation route"] },
            closingNote: "Lunch and Free Time in Reims — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Reims → Paris",
        steps: [
          { type: "transit", route: "On foot / short transfer — Cathedral to the cellars", title: "From the Sacred to the Sparkling",
            casts: [{ tag: "clutch", title: "How a Regional Accident Became a Global Luxury" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Reims — Champagne Cellars", sub: "The Art of Living, Underground",
            paragraphs: [
              "Beneath Reims run miles of chalk cellars — some built over Roman quarries — where champagne houses age millions of bottles at a constant natural temperature, a piece of geology that quietly built an entire industry.",
              "A cellar visit connects the region's chalky soil, its double-fermentation method and centuries of house tradition into a single, tastable explanation of what makes champagne specifically Champagne."
            ],
            activities: [{ title: "Chalk, Cold and Bubbles",
              paragraphs: ["A cellar tour explaining the méthode champenoise step by step, from soil and grape to the second fermentation that gives champagne its bubbles."] }],
            closingNote: "Lunch in Reims" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  troyes: {
    eyebrow: "Educational journey · Eastern France",
    title: "Troyes, City of Medieval Colour",
    sub: "Half-timbered houses, flamboyant stained glass and preserved lanes — the medieval city and its recovered colours.",
    heroImage: "assets/images/excursions/est_vitrail.jpeg",
    heroAlt: "Stained glass, Troyes",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:30" }
    ],
    intro: [
      "Two days inside one of France's best-preserved medieval city centres — a street plan famously shaped like a champagne cork, lined with half-timbered houses and lit by some of the finest stained glass in the country.",
      "Students move from the town's timber-framed streets to the workshops that made its churches glow, tracing how a wool and textile fortune got spent on colour."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Troyes",
        steps: [
          { type: "transit", route: "Train — Departure from Paris", title: "A City Shaped Like a Cork",
            casts: [{ tag: "clutch", title: "Why Troyes's Streets Trace a Champagne Cork" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Troyes — Half-Timbered Houses", sub: "A Medieval Street Plan, Still Intact",
            paragraphs: [
              "Troyes's historic centre famously traces the outline of a champagne cork — a happy accident of medieval urban growth rather than deliberate design — and its half-timbered houses, leaning slightly with age, line lanes barely wide enough for two people to pass.",
              "Much of this survived because Troyes' textile wealth declined early enough that no one had the money to knock the old town down and rebuild it in a newer style."
            ],
            activities: [{ tag: "pulse", title: "Walk the Cork",
              paragraphs: ["A walking activity tracing the historic centre's cork-shaped street plan on foot, spotting the leaning timber frames and hidden courtyards along the way."] }],
            listing: { label: "Highlights", items: ["Rue des Chats and its narrow lanes", "Half-timbered merchant houses", "Saint-Jean-au-Marché church"] },
            closingNote: "Lunch and Free Time in Troyes — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Troyes → Paris",
        steps: [
          { type: "transit", route: "On foot — Old town to the cathedral quarter", title: "Glass, Not Paint",
            casts: [{ tag: "clutch", title: "The Workshop City of French Stained Glass" }] },
          { type: "stop", num: 2, image: "assets/images/excursions/est_vitrail.jpeg", alt: "Cathedral of Troyes",
            eyebrow: "Stop 2 · Day 2", title: "Troyes — Flamboyant Stained Glass", sub: "A City That Specialised in Light",
            paragraphs: [
              "Troyes was a major centre of stained-glass production from the 13th to the 16th century, and its churches still hold some of the finest Flamboyant Gothic glass in France — dense, narrative windows meant to be read like illustrated books.",
              "Comparing the cathedral's windows across centuries, students see the style shift from simple coloured patterns to the elaborate, almost theatrical scenes of the late Middle Ages."
            ],
            activities: [{ title: "Read a Window Like a Story",
              paragraphs: ["A guided reading of one narrative stained-glass window panel by panel, decoding a medieval visual language built for a largely illiterate congregation."] }],
            closingNote: "Lunch in Troyes" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "great-war": {
    eyebrow: "Educational journey · Eastern France",
    title: "Memory of the Great War",
    sub: "Two days across the emblematic sites of the Western Front, and how the duty of remembrance was built.",
    heroImage: "assets/images/excursions/est_ww1.png",
    heroAlt: "Belleau Wood, WWI memorial",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 8:00" },
      { label: "Return", value: "Paris — before 19:00" }
    ],
    intro: [
      "Two days close to Paris, along a stretch of the Western Front that saw some of 1918's most decisive fighting — American, French and German forces converging within a few dozen kilometres of the capital.",
      "Students move from a cemetery to a battlefield town to a purpose-built museum, examining not just what happened in 1914–18 but how it has been remembered ever since."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Belleau Wood → Château-Thierry",
        steps: [
          { type: "transit", route: "Bus — Departure from Paris", title: "The Front Nearest Paris",
            casts: [{ tag: "clutch", title: "How Close the Front Line Came to Paris" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/est_ww1.png", alt: "Belleau Wood American Cemetery",
            eyebrow: "Stop 1 · Day 1", title: "Belleau Wood Cemetery", sub: "Remembrance, in Rows",
            paragraphs: [
              "The Aisne-Marne American Cemetery at Belleau Wood holds over 2,000 American war dead from the 1918 battle fought in the surrounding forest — one of the U.S. Marine Corps' defining early engagements.",
              "Walking between the rows, students confront the scale of loss in a way that statistics alone don't convey, and start asking how, exactly, a cemetery is designed to be visited."
            ],
            activities: [{ tag: "pulse", title: "Read a Cemetery",
              paragraphs: ["An observation activity on how military cemeteries are deliberately designed — symmetry, materials, inscriptions — to shape how visitors feel and remember."] }] },
          { type: "transit", route: "Bus — Belleau to Château-Thierry", title: "Into the Battle Town",
            casts: [{ tag: "clutch", title: "A Town That Changed Hands Twice" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 1 · Overnight", title: "Château-Thierry", sub: "The Western Front, at Ground Level",
            paragraphs: [
              "Château-Thierry marked the furthest German advance toward Paris in 1918 and the site of a major American counter-offensive — a town that saw the war arrive on its own streets, twice.",
              "Its American Monument, overlooking the Marne valley, gives a clear view of terrain that shaped the fighting — and a chance to connect the memorials seen so far to the actual ground they commemorate."
            ],
            activities: [{ title: "Terrain as Strategy",
              paragraphs: ["A viewpoint activity using the Marne valley's landscape to explain why armies fought where they fought — geography as a military decision, not a backdrop."] }],
            closingNote: "Lunch and Free Time in Château-Thierry — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Château-Thierry → Meaux → Paris",
        steps: [
          { type: "transit", route: "Bus — Château-Thierry to Meaux", title: "From Battlefield to Museum",
            casts: [{ tag: "clutch", title: "How Do You Build a Museum About a War?" }] },
          { type: "stop", num: 3,
            eyebrow: "Stop 3 · Day 2", title: "Museum of the Great War, Meaux", sub: "Collections That Connect the Day's Sites",
            paragraphs: [
              "The Museum of the Great War at Meaux holds one of Europe's largest WWI collections, built specifically to explain the conflict's causes, daily life in the trenches, and its long aftermath — the context behind everything seen earlier in the day.",
              "Its scenography moves visitors chronologically through 1914 to the 1918 armistice, closing the day with the bigger picture the battlefield sites alone couldn't give."
            ],
            activities: [{ tag: "pulse", title: "One Object, One Story",
              paragraphs: ["A collections-based activity where students select a single object from the museum and reconstruct the individual story it represents."] }],
            closingNote: "Lunch in Meaux" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  /* ================= PROVENCE ================= */

  "aix-calanques": {
    eyebrow: "Educational journey · Provence",
    title: "Aix-en-Provence and the Calanques",
    sub: "Cézanne's city and the calanques of Cassis — Provençal art of living, landscape and southern light.",
    heroImage: "assets/images/excursions/provence_aix.jpg",
    heroAlt: "Aix-en-Provence",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30 (TGV)" },
      { label: "Return", value: "Paris — before 21:30 (TGV)" }
    ],
    intro: [
      "Two days linking the elegant streets that shaped Paul Cézanne's eye with the dramatic limestone inlets, the calanques, that painters and hikers alike still come south to see.",
      "Reached by high-speed train and local coach — UpTempo's 'Intrepid' format — students trade the urban art of living for a coastline carved by geology rather than architects."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Aix-en-Provence",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "South to Cézanne's City",
            casts: [{ tag: "clutch", title: "The City That Made Cézanne, Long Before He Was Famous" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/provence_aix.jpg", alt: "Cours Mirabeau, Aix-en-Provence",
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Aix-en-Provence", sub: "Cézanne and the Art of Living",
            paragraphs: [
              "Aix's shaded Cours Mirabeau, its fountains and its ochre façades are the streets Paul Cézanne walked daily, and the surrounding countryside — especially the Montagne Sainte-Victoire — appears in dozens of his canvases.",
              "Students see how a specific, unglamorous local landscape became, through one painter's obsessive repetition, one of the founding subjects of modern art."
            ],
            activities: [{ tag: "pulse", title: "Cézanne's Studio, As He Left It",
              paragraphs: ["A visit to Cézanne's studio (Atelier des Lauves), examining the objects and vantage points he actually used, and why he painted the same mountain dozens of times."] }],
            listing: { label: "Highlights", items: ["Cours Mirabeau and its fountains", "Cézanne's studio", "Old town's ochre façades"] },
            closingNote: "Lunch and Free Time in Aix-en-Provence — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Aix-en-Provence → Cassis → Paris",
        steps: [
          { type: "transit", route: "Local coach — Aix to Cassis", title: "Toward the Coast",
            casts: [{ tag: "clutch", title: "What Is a Calanque, Exactly?" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Cassis", sub: "The Calanques, Carved by Water and Time",
            paragraphs: [
              "The calanques are narrow, steep-walled limestone inlets carved by rivers that have long since dried up — a Mediterranean landscape found almost nowhere else at this scale in Europe.",
              "Seen from a boat out of Cassis harbour, the cliffs' scale and their turquoise water explain, more directly than any diagram, why this coastline is now a protected national park."
            ],
            activities: [{ title: "Water That Carved Stone",
              paragraphs: ["A short geology explainer using the calanques themselves to show how limestone, water and millions of years combine into a landscape."] }],
            closingNote: "Lunch and Free Time in Cassis" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "marseille-calanques": {
    eyebrow: "Educational journey · Provence",
    title: "Marseille and the Calanques",
    sub: "France's oldest city and the calanques — Mediterranean culture, ports, landscapes and contrasts.",
    heroImage: "assets/images/excursions/provence_marseille.jpeg",
    heroAlt: "Vieux-Port, Marseille",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30 (TGV)" },
      { label: "Return", value: "Paris — before 21:30 (TGV)" }
    ],
    intro: [
      "Two days in the city that has been a working Mediterranean port for over 2,600 years, followed by the calanques just beyond its edge — the same coastline the city has always looked out onto.",
      "Students see Marseille not as a single postcard image but as a layered port city, then step outside it into a landscape that hasn't changed nearly as much."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Marseille",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "France's Oldest City",
            casts: [{ tag: "clutch", title: "A Port Founded by Greek Sailors, 2,600 Years Ago" }] },
          { type: "stop", num: 1, image: "assets/images/excursions/provence_marseille.jpeg", alt: "Vieux-Port, Marseille",
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Marseille", sub: "France's Oldest City",
            paragraphs: [
              "Founded around 600 BCE by Greek sailors from Phocaea, Marseille is France's oldest city — and its Vieux-Port has stayed the working, layered heart of the city ever since, rebuilt after every war and every wave of new arrivals.",
              "From the Vieux-Port to the hilltop basilica of Notre-Dame de la Garde, students trace over two millennia of trade, immigration and Mediterranean exchange in a single walkable route."
            ],
            activities: [{ tag: "pulse", title: "A Port That Never Stopped Changing",
              paragraphs: ["A walking activity along the Vieux-Port tracing waves of arrival — Greek, Roman, colonial, postwar immigration — still visible in the city's neighbourhoods and street life."] }],
            listing: { label: "Highlights", items: ["Vieux-Port", "Notre-Dame de la Garde", "Le Panier historic district"] },
            closingNote: "Lunch and Free Time in Marseille — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Marseille → Cassis → Paris",
        steps: [
          { type: "transit", route: "Local coach — Marseille to Cassis", title: "Out of the City",
            casts: [{ tag: "clutch", title: "The Coastline the City Grew Beside" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Cassis", sub: "The Calanques and Their Contrasts",
            paragraphs: [
              "Just past Marseille's outer neighbourhoods, the calanques begin — steep white limestone cliffs plunging into turquoise water, part of a national park that starts almost at the edge of France's second-largest city.",
              "The contrast is the point: a dense, ancient port city giving way, within minutes, to some of the wildest coastline in mainland France."
            ],
            activities: [{ title: "City Edge, Wild Coast",
              paragraphs: ["A boat-based or clifftop observation session comparing the calanques' protected wilderness to the working port just kilometres away."] }],
            closingNote: "Lunch and Free Time in Cassis" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "provence-stones": {
    eyebrow: "Educational journey · Provence",
    title: "Stones of Provence",
    sub: "From Avignon to the Pont du Gard — Roman heritage, papal palaces, and Provence read through its stones.",
    heroImage: "assets/images/excursions/provence_pontdugard.jpeg",
    heroAlt: "Pont du Gard",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30 (TGV)" },
      { label: "Return", value: "Paris — before 21:30 (TGV)" }
    ],
    intro: [
      "Two days spanning two very different empires that both built to last: Rome, whose arena and aqueduct still stand after two thousand years, and the medieval Papacy, which briefly moved the centre of the Catholic Church to Provence.",
      "Students read three sites — a papal fortress, a Roman arena, and an aqueduct bridge — as three answers to the same question: how do you build something meant to outlast you?"
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Avignon → Arles",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "When the Popes Left Rome",
            casts: [{ tag: "clutch", title: "Why the Pope Lived in Provence for 67 Years" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1", title: "Avignon", sub: "The Papal Palace",
            paragraphs: [
              "Between 1309 and 1376, seven popes ruled the Catholic Church not from Rome but from Avignon — the Palais des Papes, the largest Gothic palace in Europe, is the physical result of that political relocation.",
              "Its scale and fortifications tell a story less about faith than about medieval power politics: a Church so entangled with French royal interests that it moved its own headquarters to prove it."
            ],
            activities: [{ tag: "pulse", title: "The Palace That Moved a Church",
              paragraphs: ["A guided walk through the Palais des Papes connecting its scale and defences to the political crisis that put the papacy in France for nearly seven decades."] }],
            listing: { label: "Highlights", items: ["Palais des Papes", "Pont Saint-Bénézet (the 'Pont d'Avignon')", "Ramparts of the old city"] },
            closingNote: "Lunch and Free Time in Avignon" },
          { type: "transit", route: "Local coach — Avignon to Arles", title: "Into Roman Provence",
            casts: [{ tag: "clutch", title: "The Arena Still in Use After 2,000 Years" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 1 · Overnight", title: "Arles", sub: "Roman Heritage, Still in Daily Use",
            paragraphs: [
              "Arles's Roman arena and theatre, built in the 1st century, are not sealed-off ruins — the arena has hosted events continuously for two thousand years and still does today, a rare case of Roman infrastructure never falling out of use.",
              "The city later drew Van Gogh, who painted here for over a year; students see both the Roman bones of the city and the light that later attracted an entirely different kind of attention."
            ],
            activities: [{ title: "Infrastructure That Never Retired",
              paragraphs: ["An activity examining what let the Roman arena keep functioning across two millennia, comparing Roman engineering choices to how the building is used today."] }],
            closingNote: "Dinner and Overnight in Arles" },
        ]
      },
      {
        tag: "Day 2",
        route: "Arles → Pont du Gard → Paris",
        steps: [
          { type: "transit", route: "Local coach — Arles to the Pont du Gard", title: "Roman Engineering, Full Scale",
            casts: [{ tag: "clutch", title: "50 Kilometres of Aqueduct for One City" }] },
          { type: "stop", num: 3, image: "assets/images/excursions/provence_pontdugard.jpeg", alt: "Pont du Gard",
            eyebrow: "Stop 3 · Day 2", title: "Pont du Gard", sub: "Roman Engineering at Its Most Visible",
            paragraphs: [
              "The Pont du Gard is the tallest surviving section of a nearly 50-kilometre Roman aqueduct that once carried water to Nîmes — built with a gradient so precise that water fell only 34 centimetres per kilometre across the entire route.",
              "Standing beneath its three tiers of arches, students confront Roman engineering not as an abstract achievement but as a physical structure they can walk under and measure with their own steps."
            ],
            activities: [{ tag: "pulse", title: "Engineer an Aqueduct",
              paragraphs: ["A hands-on problem-solving activity on how Roman engineers moved water across valleys using nothing but gravity and extremely precise measurement."] }],
            closingNote: "Lunch at the Pont du Gard" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  /* ================= BORDEAUX ================= */

  "bordeaux-estuary": {
    eyebrow: "Educational journey · Bordeaux",
    title: "Bordeaux, City of Stone and Estuary",
    sub: "From the UNESCO-listed quays to the Dune du Pilat — historic centre, the Arcachon Basin and ocean landscapes.",
    heroImage: "assets/images/excursions/bordeaux_arcachon.jpg",
    heroAlt: "Dune du Pilat",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30 (TGV)" },
      { label: "Return", value: "Paris — before 21:30 (TGV)" }
    ],
    intro: [
      "Two days linking Bordeaux's stone-quarried, UNESCO-listed 18th-century quays to Europe's largest sand dune and the oyster basin beside it — the port city's wealth, and the ocean landscape that made it possible.",
      "Students trace a single trade route in reverse: from the merchant façades built with colonial-era money, out to the water and dunes that route once departed from."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Bordeaux",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "The Port of the Moon",
            casts: [{ tag: "clutch", title: "Why Bordeaux's Quays Are a UNESCO World Heritage Site" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1 · Overnight", title: "Bordeaux", sub: "The UNESCO-Listed Quays",
            paragraphs: [
              "Bordeaux's 18th-century quays — nicknamed the 'Port of the Moon' for the crescent bend of the Garonne — form the largest urban ensemble of 18th-century architecture in France, built almost entirely on the wealth of Atlantic trade.",
              "The Place de la Bourse and the Water Mirror facing it give students a single frame for the city's ambition: a merchant class rich enough to rebuild an entire riverfront to look like Paris."
            ],
            activities: [{ tag: "pulse", title: "A Riverfront Built on Trade",
              paragraphs: ["A walking activity along the quays connecting the 18th-century façades to the Atlantic trade routes that financed them."] }],
            listing: { label: "Highlights", items: ["Place de la Bourse and the Water Mirror", "Grand Théâtre", "Rue Sainte-Catherine"] },
            closingNote: "Lunch and Free Time in Bordeaux — Dinner and Overnight" },
        ]
      },
      {
        tag: "Day 2",
        route: "Bordeaux → Arcachon → Dune du Pilat → Paris",
        steps: [
          { type: "transit", route: "Local coach — Bordeaux to Arcachon", title: "Out to the Basin",
            casts: [{ tag: "clutch", title: "A Basin That Grows Half the Oysters in France" }] },
          { type: "stop", num: 2,
            eyebrow: "Stop 2 · Day 2", title: "Arcachon", sub: "The Basin",
            paragraphs: [
              "The Arcachon Basin is one of France's largest oyster-farming regions, its shallow tidal waters lined with wooden oyster huts and cabins that have defined the local economy for over a century.",
              "Its 19th-century seaside town, built as a health resort, adds a second layer — Arcachon as both a working basin and one of France's earliest purpose-built beach towns."
            ],
            activities: [{ title: "A Basin Shaped by the Tide",
              paragraphs: ["A short explainer on oyster farming in the Arcachon Basin, and how tidal cycles shape both the industry and the landscape."] }],
            closingNote: "Lunch and Free Time in Arcachon" },
          { type: "transit", route: "Local coach — Arcachon to the Dune du Pilat", title: "Europe's Tallest Sand Dune",
            casts: [{ tag: "clutch", title: "A Dune That's Still Moving" }] },
          { type: "stop", num: 3, image: "assets/images/excursions/bordeaux_arcachon.jpg", alt: "Dune du Pilat",
            eyebrow: "Stop 3 · Day 2", title: "Dune du Pilat", sub: "Ocean Landscapes at Full Scale",
            paragraphs: [
              "At over 100 metres high, the Dune du Pilat is the tallest sand dune in Europe — and it isn't static: prevailing winds push it slowly inland, burying trees at its back edge year by year.",
              "From its summit, the view stretches from the Arcachon Basin to the Landes forest, giving students a single vantage point over everything the day has covered."
            ],
            activities: [{ tag: "pulse", title: "Climb a Moving Landscape",
              paragraphs: ["A guided climb to the dune's summit, examining how wind, sand and vegetation interact to keep the dune advancing rather than eroding away."] }] }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  },

  "bordeaux-vineyards": {
    eyebrow: "Educational journey · Bordeaux",
    title: "Bordeaux, Vineyards and Landscapes",
    sub: "Between Bordeaux and Saint-Émilion — classified vineyard landscapes, the Cité du Vin and Bordeaux know-how.",
    heroImage: "assets/images/excursions/bordeaux_vins.jpeg",
    heroAlt: "Vineyards near Saint-Émilion",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris — before 7:30 (TGV)" },
      { label: "Return", value: "Paris — before 21:30 (TGV)" }
    ],
    intro: [
      "Two days on wine as both culture and craft: an immersive museum built to explain wine to complete beginners, then a UNESCO-listed vineyard landscape shaped by a thousand years of continuous winemaking.",
      "Students leave with a working vocabulary for how wine is made, and a sense of what a 'classified' vineyard landscape actually looks like on the ground."
    ],
    formats: DEFAULT_FORMATS,
    days: [
      {
        tag: "Day 1",
        route: "Paris → Bordeaux → Saint-Émilion",
        steps: [
          { type: "transit", route: "Train (TGV) — Departure from Paris", title: "Wine, Explained",
            casts: [{ tag: "clutch", title: "Why Bordeaux Built an Entire Museum About Wine" }] },
          { type: "stop", num: 1,
            eyebrow: "Stop 1 · Day 1", title: "Bordeaux — Cité du Vin", sub: "Wine as a Global Culture",
            paragraphs: [
              "The Cité du Vin uses immersive, sensory exhibits — rather than rows of bottles — to explain wine as a global cultural and economic phenomenon, from ancient amphorae to today's international trade.",
              "For students with no prior knowledge of wine, it builds the basic vocabulary — terroir, appellation, vintage — needed to actually get something out of a vineyard visit that follows."
            ],
            activities: [{ tag: "pulse", title: "Terroir, Explained With Your Senses",
              paragraphs: ["A sensory workshop using the museum's own tools to demonstrate how soil, climate and grape variety combine into what tasters call terroir."] }],
            closingNote: "Lunch and Free Time in Bordeaux" },
          { type: "transit", route: "Local coach — Bordeaux to Saint-Émilion", title: "Evening Arrival in Saint-Émilion — Dinner and Overnight",
            casts: [{ tag: "clutch", title: "A Vineyard Landscape Old Enough to Be UNESCO-Listed" }] }
        ]
      },
      {
        tag: "Day 2",
        route: "Saint-Émilion → Paris",
        steps: [
          { type: "stop", num: 2, image: "assets/images/excursions/bordeaux_vins.jpeg", alt: "Saint-Émilion vineyards",
            eyebrow: "Stop 2 · Day 2", title: "Saint-Émilion", sub: "Classified Vineyard Landscapes",
            paragraphs: [
              "Saint-Émilion's vineyards have been cultivated continuously since Roman times, and the whole landscape — village, monolithic church and surrounding slopes — is UNESCO-listed as a living, working example of a historic wine-producing region.",
              "Walking the village's steep medieval streets and out into the vines themselves, students see the direct link between a specific slope of limestone soil and a bottle with that village's name on the label."
            ],
            activities: [{ title: "One Village, One Appellation",
              paragraphs: ["A vineyard walk connecting Saint-Émilion's soil, slope and monastic winemaking history to what an appellation actually guarantees about a bottle."] }],
            listing: { label: "Highlights", items: ["Monolithic church (carved from a single rock)", "Medieval village streets", "Classified vineyard slopes"] },
            closingNote: "Lunch and Free Time in Saint-Émilion" }
        ]
      }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: FINEPRINT_DEFAULT
  }

};
