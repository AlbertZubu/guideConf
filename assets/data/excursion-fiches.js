/* =============================================================
   EXCURSION FICHES — detailed content for the catalog's modal.
   Consumed by catalogue/fiche-template.html?slug=<slug>, rendered
   with the same markup/skin as the Normandy flagship fiche (see
   catalogue/normandy-in-3-journeys/fiche.html + styles/base.css).

   All catalog excursions live here. Two data shapes coexist:
   - OVERVIEW fiches (the redesigned Normandy four): no day-by-day
     itinerary — instead `destinations`, `highlights` and a flat
     `activities` list of optional modules. This is the target format.
   - LEGACY fiches (the rest): a `days` array rendered as a two-day
     itinerary, kept until each excursion is redesigned in turn.
   The template picks the layout from the presence of `days`.
   The old bespoke Normandy build is kept under
   catalogue/normandy-in-3-journeys/ but is no longer linked.

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
  { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
];

const CLOSING_DEFAULT = "Tell us your dates, your group and what you'd like them to walk away understanding — we'll adjust the program around it.";
const FINEPRINT_DEFAULT = "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives.";

const EXCURSION_FICHES = {

  /* ================= NORMANDY — FLAGSHIP ================= */

  "normandy-grand-tour": {
    eyebrow: "Educational journey · Normandy",
    title: "The Normandy Grand Tour",
    sub: "Two days, three faces of one region — medieval power, Impressionist light, and the coast that invented the French seaside escape.",
    heroImage: "catalogue/normandy-in-3-journeys/images/honfleur.jpg",
    heroAlt: "The old harbour of Honfleur",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Bayeux or Honfleur" }
    ],
    intro: [
      "A complete first encounter with Normandy, built around the three legacies that define it: the Middle Ages that made it a power, the Impressionism it inspired, and the seaside villégiature that made it France's favorite escape.",
      "Across Rouen, Bayeux, Omaha and Honfleur, students keep meeting the same lesson from different angles: one region, layered by a thousand years of very different ambitions."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A moment of remembrance — letters, ceremonies and silences that let a place speak for itself." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Rouen", image: "assets/images/excursions/normandy_rouen.jpg" },
      { name: "Bayeux", image: "catalogue/normandy-in-3-journeys/images/bayeux.jpg" },
      { name: "Omaha", image: "catalogue/normandy-in-3-journeys/images/omaha.jpg" },
      { name: "Honfleur", image: "catalogue/normandy-in-3-journeys/images/honfleur.jpg" }
    ],
    highlights: [
      { text: "Rouen Cathedral", desc: "The Gothic giant Monet painted thirty times.", image: "catalogue/normandy-in-3-journeys/images/rouen.jpg" },
      { text: "Omaha Beach and the American Cemetery", desc: "Where history's greatest landing is remembered, name by name.", image: "catalogue/normandy-in-3-journeys/images/omaha.jpg" },
      { text: "The Bayeux Tapestry", desc: "Seventy meters of embroidery telling the conquest of England.", image: "assets/images/excursions/normandie_medieval.png" },
      { text: "Boat cruise on the Seine estuary", desc: "Normandy from the water, the way painters and sailors saw it first.", image: "assets/images/excursions/wiki/seine_estuary.jpg" },
      { text: "The old harbour of Honfleur", desc: "The postcard port where Impressionism learned to paint.", image: "catalogue/normandy-in-3-journeys/images/honfleur.jpg" },
      { text: "Cider tasting", desc: "Normandy's signature drink, straight from the orchard.", image: "assets/images/excursions/wiki/cider.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Debunk the Middle Ages",
        text: "A walking exploration built to dismantle the clichés — dark, dirty, ignorant — one street at a time. Confronted with what the medieval city actually built, traded and believed, students rebuild a far more surprising picture of the era." },
      { tag: "pulse", title: "Spaceship Cathedral",
        text: "What is a cathedral, really? This activity recontextualises the building as the most ambitious machine of its century — an engineering project so far beyond its time that today's honest comparison isn't another monument, but a rocket or a flying saucer." },
      { tag: "echo", title: "Ceremony",
        text: "An American remembrance ceremony organized with the American Cemetery: colors, silence, and the weight of a ritual performed where it means the most." },
      { tag: "echo", title: "Letters to a Soldier",
        text: "Readings from real wartime correspondence — soldiers writing to their families, their friends, each other — read aloud above the beach they were written about." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus in the museum: instead of trying to see everything, students commit to a very small number of works — sometimes just one — and give it everything: time, questions, close reading. Learning to let the rest go is the skill." },
      { tag: "unbound", title: "Speed Control",
        text: "Students change their relationship to time in the museum: the pace of the visit is deliberately accelerated and varied, forcing a different eye — less lingering, more pattern-spotting — until the museum can be grasped as a whole rather than one work at a time." },
      { tag: "unbound", title: "The Battle of the Museums",
        text: "A participative finale: groups each take on a different museum, then meet to defend their museum's experience in a structured debate. Arguing about what a museum made them feel turns a visit into a position — and a group into critics." },
      { tag: "clutch", title: "Middle Ages Experts in Twenty Minutes",
        text: "A fast, precise onboard briefing that hands students the essential keys — feudal society, the Church, the city — so they step off the bus already equipped to read what they see." },
      { tag: "clutch", title: "Art Theory Explained: Impressionism",
        text: "A compact onboard masterclass: what Impressionism actually changed, why it scandalised, and the handful of keys — light, instant, touch — that unlock every canvas waiting in Honfleur." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Bayeux or Honfleur depending on season and availability."
  },

  "d-day": {
    eyebrow: "Educational journey · Normandy",
    title: "D-Day: The Five Beaches",
    sub: "The complete Overlord route — Sword, Juno, Gold, Omaha and Utah — told through every point of view, including the two everyone forgets.",
    heroImage: "assets/images/excursions/normandie_ww2.jpeg",
    heroAlt: "The D-Day memorial on Omaha Beach",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Arromanches or Bayeux" }
    ],
    intro: [
      "Most D-Day tours show one beach. This journey covers all five — Sword, Juno, Gold, Omaha and Utah, in the order they line the coast — so students grasp what each beach was for, what could go wrong there, and how five separate landings added up to one operation.",
      "And because an invasion has more than two sides, the journey deliberately includes every point of view: American, British and Canadian — but also the French civilians who lived through it and the German soldiers who faced it, the two populations most tellings of D-Day leave out."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A moment of remembrance — letters, ceremonies and silences that let a place speak for itself." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Caen", image: "assets/images/excursions/wiki/caen_memorial.jpg" },
      { name: "Sword", image: "assets/images/excursions/wiki/sword.jpg" },
      { name: "Juno", image: "assets/images/excursions/wiki/juno.jpg" },
      { name: "Gold", image: "assets/images/excursions/wiki/gold.jpg" },
      { name: "Omaha", image: "catalogue/normandy-in-3-journeys/images/omaha.jpg" },
      { name: "Utah", image: "assets/images/excursions/wiki/utah.jpg" }
    ],
    highlights: [
      { text: "Mémorial de Caen", desc: "The whole Second World War, explained before you walk its beaches.", image: "assets/images/excursions/wiki/caen_memorial.jpg" },
      { text: "The Normandy American Cemetery", desc: "Nine thousand white headstones above Omaha — remembrance at full scale.", image: "assets/images/excursions/wiki/omaha_cemetery.jpg" },
      { text: "Pegasus Bridge", desc: "The first ground liberated in France, minutes after midnight.", image: "assets/images/excursions/wiki/pegasus_bridge.jpg" },
      { text: "The Pointe du Hoc", desc: "Sheer cliffs the Rangers scaled under fire — the scars still visible.", image: "assets/images/excursions/wiki/pointe_du_hoc.jpg" },
      { text: "Ranville Commonwealth War Cemetery", desc: "The British register of mourning: personal words on every headstone.", image: "assets/images/excursions/wiki/ranville.jpg" },
      { text: "The Mulberry harbour at Arromanches", desc: "An entire port, built in Britain and towed across the sea.", image: "assets/images/excursions/wiki/mulberry.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Ride in a WWII Jeep",
        text: "A convoy of restored Second World War jeeps takes students along the dunes and lanes the vehicles were built for — the operation's logistics made physical, and a ride nobody forgets." },
      { tag: "pulse", title: "Cinéma 360°",
        text: "In the circular cinema above Arromanches, archive footage plays on every side at once — a short, immersive plunge into the hundred days of the Battle of Normandy, on the very spot it overlooks." },
      { tag: "echo", title: "Ceremony",
        text: "An American remembrance ceremony organized with the American Cemetery: colors, silence, and the weight of a ritual performed where it means the most." },
      { tag: "echo", title: "Letters to a Soldier",
        text: "Readings from real wartime correspondence — soldiers writing to their families, their friends, each other — read aloud above the beach they were written about." },
      { tag: "clutch", title: "The Most Complex Operation in War History",
        text: "An onboard deep-dive into the real military stakes of the operation — deception plans, logistics, tides, timing, and the razor-thin margins that made June 6 the most complex operation ever attempted." },
      { tag: "clutch", title: "War, Then and Now",
        text: "An onboard comparison of war in 1944 and war today — technology, strategy, intelligence, logistics — tracing what has transformed beyond recognition and what, strikingly, has not." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Arromanches or Bayeux depending on season and availability."
  },

  "impressionist-normandy": {
    eyebrow: "Educational journey · Normandy",
    title: "The Birthplace of Impressionism",
    sub: "Rouen, Honfleur, Étretat, Giverny — two days in the landscapes where painting learned to chase the light.",
    heroImage: "assets/images/excursions/normandie_etretat.jpg",
    heroAlt: "Monet's cliffs of Étretat",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Honfleur or Le Havre" }
    ],
    intro: [
      "Why did modern art happen here? This journey answers on location: Normandy's water, weather and shifting light made it the laboratory where painting broke its rules — and where Impressionism was born.",
      "From Monet's cathedral in Rouen to the harbour that taught him, the cliffs that obsessed him and the garden he built to paint, students follow the movement to the exact places that made it possible."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Rouen", image: "assets/images/excursions/normandy_rouen.jpg" },
      { name: "Honfleur", image: "catalogue/normandy-in-3-journeys/images/honfleur.jpg" },
      { name: "Étretat", image: "assets/images/excursions/normandie_etretat.jpg" },
      { name: "Giverny", image: "assets/images/excursions/wiki/giverny.jpg" }
    ],
    highlights: [
      { text: "Monet's house and gardens", desc: "The garden a painter built in order to paint it.", image: "assets/images/excursions/wiki/giverny.jpg" },
      { text: "Rouen Cathedral — Monet's série", desc: "One façade, thirty canvases — a manifesto in stone.", image: "catalogue/normandy-in-3-journeys/images/rouen.jpg" },
      { text: "The cliffs of Étretat", desc: "The chalk arches Monet chased through fifty paintings.", image: "assets/images/excursions/normandie_etretat.jpg" },
      { text: "Boat cruise from the Vieux Bassin", desc: "The estuary in changing light — an Impressionist canvas you can board.", image: "catalogue/normandy-in-3-journeys/images/honfleur.jpg" },
      { text: "Musée Eugène Boudin", desc: "Where Monet's first teacher taught him to paint the sky.", image: "catalogue/normandy-in-3-journeys/images/honfleur.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "You Are the Artist",
        text: "A photography workshop on the go: armed with the Impressionists' own questions — where is the light, what is the instant, what do I leave out? — students shoot the landscape the way Monet painted it, and discover their eye has already changed." },
      { tag: "pulse", title: "The Watercolor Challenge",
        text: "A series of fast, easy watercolor mini-challenges running all along the excursion — thirty seconds of sky here, a harbour in three colors there — with the final round painted in Monet's own garden. No skill required: the point is to look the way painters look." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus in the museum: students commit to a single work — Monet's cathedral, say — and give it everything: time, questions, close reading, then the walk outside to face its subject. Learning to let the rest go is the skill." },
      { tag: "unbound", title: "Speed Control",
        text: "Students change their relationship to time in the museum: the pace of the visit is deliberately accelerated and varied, forcing a different eye — less lingering, more pattern-spotting — until the museum can be grasped as a whole." },
      { tag: "unbound", title: "The Battle of the Museums",
        text: "A participative evening: groups each take on a different museum, then meet to defend their museum's experience in a structured debate. Arguing about what a museum made them feel turns a visit into a position — and a group into critics." },
      { tag: "clutch", title: "Art Theory Explained: Impressionism",
        text: "A compact onboard masterclass: what Impressionism actually changed, why it scandalised, and the handful of keys — light, instant, touch — that unlock every canvas of the journey." },
      { tag: "clutch", title: "Claude Monet, Your Worst Best Friend",
        text: "Genius, tyrant, charmer, recluse — an onboard portrait of Monet's famously complicated personality, so that students arrive at his house knowing the man, not just the brand." },
      { tag: "clutch", title: "The End of an Eternal Debate",
        text: "For centuries art fought over one question: color or line? Colorists against draftsmen, from the Renaissance to the Academy. This onboard sequence shows how Impressionism finally answered the oldest argument in art history." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Honfleur or Le Havre depending on season and availability."
  },

  "medieval-normandy": {
    eyebrow: "Educational journey · Normandy",
    title: "Normandy's Golden Age",
    sub: "Rouen, Caen, Bayeux, Mont Saint-Michel — the Middle Ages that made Normandy a power, at full scale.",
    heroImage: "assets/images/excursions/normandie_medieval.png",
    heroAlt: "The Bayeux Tapestry",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Granville or Saint-Malo" }
    ],
    intro: [
      "In the Middle Ages, Normandy was not a region — it was a power: a duchy rich enough to conquer England, build some of Europe's greatest churches, and stack an abbey on a rock in the sea. This journey explores the heritage of that golden age at full scale.",
      "From the cathedral city of Rouen to the Conqueror's castle in Caen, the Tapestry in Bayeux and the Mont Saint-Michel itself, students read power, faith and ambition straight off the stone."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A moment of remembrance — encounters and silences that let a place speak for itself." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Rouen", image: "assets/images/excursions/normandy_rouen.jpg" },
      { name: "Caen", image: "assets/images/excursions/wiki/caen_castle.jpg" },
      { name: "Bayeux", image: "catalogue/normandy-in-3-journeys/images/bayeux.jpg" },
      { name: "Mont Saint-Michel", image: "assets/images/excursions/wiki/msm.jpg" }
    ],
    highlights: [
      { text: "Mont Saint-Michel", desc: "An abbey stacked on a rock in the sea — the Wonder of the West.", image: "assets/images/excursions/wiki/msm.jpg" },
      { text: "Rouen Cathedral", desc: "Gothic ambition at full height, in the dukes' own capital.", image: "assets/images/excursions/wiki/rouen_cathedral.jpg" },
      { text: "Caen Castle", desc: "William the Conqueror's fortress — one of the largest in Europe.", image: "assets/images/excursions/wiki/caen_castle.jpg" },
      { text: "The Bayeux Tapestry", desc: "The conquest of England, told in seventy meters of wool.", image: "assets/images/excursions/normandie_medieval.png" }
    ],
    activities: [
      { tag: "pulse", title: "Debunk the Middle Ages",
        text: "A walking exploration built to dismantle the clichés — dark, dirty, ignorant — one street at a time. Confronted with what the medieval city actually built, traded and believed, students rebuild a far more surprising picture of the era." },
      { tag: "pulse", title: "Spaceship Cathedral",
        text: "What is a cathedral, really? This activity recontextualises the building as the most ambitious machine of its century — an engineering project so far beyond its time that today's honest comparison isn't another monument, but a rocket or a flying saucer." },
      { tag: "echo", title: "Meet the Monks",
        text: "An encounter with the monastic community that still lives and prays in the abbey — a rare chance to ask, in person, what a thousand-year-old vocation means today, in the very rooms it was built for." },
      { tag: "echo", title: "A Night in an Old Monastery",
        text: "For groups who choose it, the hotel is swapped for a night in an old monastery guesthouse: stone corridors, silence, and lights-out the way the Middle Ages actually sounded. The most direct way to feel monastic life — sleep inside it." },
      { tag: "clutch", title: "Middle Ages Experts in Twenty Minutes",
        text: "A fast, precise onboard briefing that hands students the essential keys — feudal society, the Church, the city — so they step off the bus already equipped to read what they see." },
      { tag: "clutch", title: "Art Theory Explained: Gothic",
        text: "A compact onboard masterclass on the Gothic style — pointed arches, ribbed vaults, walls of glass — and the obsession behind it all: more light, more height, less stone." },
      { tag: "clutch", title: "The Normans: Invaders, Defenders, Traitors",
        text: "Vikings turned vassals, conquerors turned rivals of their own king — an onboard tour of the very different political roles the duchy of Normandy played through the history of France, and why the kingdom never quite trusted it." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Granville or Saint-Malo depending on season and availability."
  },

  "loire-chateaux": {
    eyebrow: "Educational journey · Loire Valley",
    title: "The Château Revolution",
    sub: "Chambord, Blois, Chenonceau — how the Renaissance turned fortresses into palaces, and defense into delight.",
    heroImage: "assets/images/excursions/loire_chambord.webp",
    heroAlt: "Château de Chambord",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Tours or Blois" }
    ],
    intro: [
      "The Renaissance was a revolution you can read in stone. In one generation, the Loire's buildings stopped being fortresses and became residences — walls opened into windows, towers into staircases, defense into comfort and display.",
      "Through Chambord, Blois and Chenonceau, students learn to see that paradigm shift with their own eyes — down to the two innovations that made it possible: tuffeau stone and the mullioned window."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Chambord", image: "assets/images/excursions/loire_chambord.webp" },
      { name: "Blois", image: "assets/images/excursions/wiki/blois.jpg" },
      { name: "Chenonceau", image: "assets/images/excursions/loire_chenonceau.jpeg" }
    ],
    highlights: [
      { text: "Château de Chambord", desc: "440 rooms and 84 staircases — the Renaissance showing off.", image: "assets/images/excursions/loire_chambord.webp" },
      { text: "Château de Chenonceau", desc: "A palace arched across a river — defense turned into pure grace.", image: "assets/images/excursions/loire_chenonceau.jpeg" },
      { text: "Château de Blois", desc: "Four centuries of architecture facing each other in one courtyard.", image: "assets/images/excursions/wiki/blois.jpg" },
      { text: "Boat ride on the Loire", desc: "Europe's last wild river, drifting past the châteaux.", image: "assets/images/excursions/wiki/loire_river.jpg" },
      { text: "Wine tasting", desc: "The valley's terroir, glass in hand.", image: "assets/images/excursions/wiki/wine_tasting.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: mullioned windows, rooflines, stair turrets, masonry. By the end, students can date a building at a single glance — and sort the Middle Ages from the Renaissance anywhere they travel next." },
      { tag: "pulse", title: "Picnic: Before & After the Renaissance",
        text: "Students build a picnic with two baskets: one holding only what Europe ate before the Renaissance, the other everything that arrived with it. Laying the two side by side on the grass makes the era's contribution to daily life instantly, deliciously visible." },
      { tag: "pulse", title: "Kayak the Château",
        text: "Canoes and kayaks on the river, and a château explored from the water — the angle it was designed to be admired from. Paddling under the arches turns architecture into an experience no courtyard visit can match." },
      { tag: "echo", title: "A Night in a Renaissance Château",
        text: "For groups who choose it, the hotel is swapped for a night inside a Renaissance château: stone stairs, creaking parquet, and lights-out in the very architecture the journey is about. The most direct way to understand a château — sleep in it." },
      { tag: "echo", title: "The Tuffeau Quarries: Misery Behind the Beauty",
        text: "Testimonies from the quarries where the white tuffeau stone was cut — the crushing, dangerous human reality behind the valley's most beautiful façades. A necessary counterpoint: every wonder was paid for by someone." },
      { tag: "echo", title: "A Boat on the Loire",
        text: "A slow boat ride on the river that made the valley: no commentary race, just the current, the sandbanks and the châteaux drifting past the way travelers saw them for five centuries." },
      { tag: "clutch", title: "The Renaissance Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on the intellectual, economic and artistic revolution — humanism, printing, banking, perspective — so students step off the bus already equipped to read what they see." },
      { tag: "clutch", title: "François I: The Renaissance Superstar",
        text: "Patron, builder, rival of emperors, collector of Leonardo — an onboard portrait of the king who turned the Loire Valley into the showroom of the French Renaissance, and knew exactly what he was doing." },
      { tag: "clutch", title: "From Fortress to Palace",
        text: "Two innovations — soft white tuffeau stone and the mullioned window — and the entire paradigm flips: architecture stops defending and starts living. An onboard key that unlocks every façade of the journey." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Tours or Blois depending on season and availability."
  },

  "loire-renaissance": {
    eyebrow: "Educational journey · Loire Valley",
    title: "Lights of the Renaissance",
    sub: "Chenonceau, Amboise, Chambord — the intellectual, economic and artistic revolution, told where it was at its most dazzling.",
    heroImage: "assets/images/excursions/loire_chenonceau.jpeg",
    heroAlt: "Château de Chenonceau",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Tours or Amboise" }
    ],
    intro: [
      "The Renaissance was not a style — it was a revolution of the mind, of money and of art, and the Loire Valley is where France staged it. This journey explains what actually changed: how people thought, traded, built and saw the world.",
      "Through Chenonceau, Amboise and Chambord — with Leonardo da Vinci's last home as its beating heart — students meet the era's ideas, its superstars, and the human price behind its beauty."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Chenonceau", image: "assets/images/excursions/loire_chenonceau.jpeg" },
      { name: "Amboise", image: "assets/images/excursions/wiki/amboise.jpg" },
      { name: "Chambord", image: "assets/images/excursions/loire_chambord.webp" }
    ],
    highlights: [
      { text: "Château de Chambord", desc: "François I's dream in stone — the Renaissance at full power.", image: "assets/images/excursions/loire_chambord.webp" },
      { text: "Château de Chenonceau", desc: "The château of the ladies, mirrored in the Cher.", image: "assets/images/excursions/loire_chenonceau.jpeg" },
      { text: "Clos Lucé", desc: "Leonardo da Vinci's last home — his machines, his gardens, his mind.", image: "assets/images/excursions/wiki/clos_luce.jpg" },
      { text: "Boat ride on the Loire", desc: "Europe's last wild river, drifting past the châteaux.", image: "assets/images/excursions/wiki/loire_river.jpg" },
      { text: "Wine tasting", desc: "Loire whites and reds, tasted where they are grown.", image: "assets/images/excursions/wiki/wine_tasting.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Kayak the Château",
        text: "Canoes and kayaks on the river, and a château explored from the water — the angle it was designed to be admired from. Paddling under the arches turns architecture into an experience no courtyard visit can match." },
      { tag: "pulse", title: "Inside Leonardo's Head",
        text: "A hands-on session with Leonardo's own writings and inventions — mirror script, machines, anatomical obsessions — revealing just how singular the man behind the myth really was. Students don't study Leonardo; they briefly become him." },
      { tag: "pulse", title: "Picnic: Before & After the Renaissance",
        text: "Students build a picnic with two baskets: one holding only what Europe ate before the Renaissance, the other everything that arrived with it. Laying the two side by side on the grass makes the era's contribution to daily life instantly, deliciously visible." },
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: mullioned windows, rooflines, stair turrets, masonry. By the end, students can date a building at a single glance — and sort the Middle Ages from the Renaissance anywhere they travel next." },
      { tag: "echo", title: "A Night in a Renaissance Château",
        text: "For groups who choose it, the hotel is swapped for a night inside a Renaissance château: stone stairs, creaking parquet, and lights-out in the very architecture the journey is about. The most direct way to understand a château — sleep in it." },
      { tag: "echo", title: "The Tuffeau Quarries: Misery Behind the Beauty",
        text: "Testimonies from the quarries where the white tuffeau stone was cut — the crushing, dangerous human reality behind the valley's most beautiful façades. A necessary counterpoint: every wonder was paid for by someone." },
      { tag: "echo", title: "A Boat on the Loire",
        text: "A slow boat ride on the river that made the valley: no commentary race, just the current, the sandbanks and the châteaux drifting past the way travelers saw them for five centuries." },
      { tag: "clutch", title: "The Renaissance Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on the intellectual, economic and artistic revolution — humanism, printing, banking, perspective — so students step off the bus already equipped to read what they see." },
      { tag: "clutch", title: "François I: The Renaissance Superstar",
        text: "Patron, builder, rival of emperors, collector of Leonardo — an onboard portrait of the king who turned the Loire Valley into the showroom of the French Renaissance, and knew exactly what he was doing." },
      { tag: "clutch", title: "Women Step Out of the Shadows",
        text: "Diane de Poitiers, Catherine de Médicis, the builders of Chenonceau — an onboard sequence on the women who ran estates, patronage and politics, and how the Renaissance began, slowly, to let them be seen." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Tours or Amboise depending on season and availability."
  },

  "loire-gardens": {
    eyebrow: "Educational journey · Loire Valley",
    title: "Gardens of the Renaissance",
    sub: "Chenonceau, Chambord, Villandry — the whole Renaissance, read through its most photogenic invention: the garden.",
    heroImage: "assets/images/excursions/loire_jardins.webp",
    heroAlt: "The gardens of Villandry",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Tours" }
    ],
    intro: [
      "Same revolution, different lens: this journey explains the Renaissance — its ideas, its trade, its taste for control and display — through the gardens it invented.",
      "From Chenonceau's riverside parterres to Villandry's geometric perfection, students discover that a Renaissance garden is not decoration: it's a worldview, planted in rows."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Chenonceau", image: "assets/images/excursions/loire_chenonceau.jpeg" },
      { name: "Chambord", image: "assets/images/excursions/loire_chambord.webp" },
      { name: "Villandry", image: "assets/images/excursions/loire_jardins.webp" }
    ],
    highlights: [
      { text: "Château de Chenonceau", desc: "Gardens mirrored in the river, staged by rival queens.", image: "assets/images/excursions/loire_chenonceau.jpeg" },
      { text: "Château de Villandry and its gardens", desc: "Nine salons of greenery — the formal garden at its absolute peak.", image: "assets/images/excursions/loire_jardins.webp" },
      { text: "Château de Chambord", desc: "A royal park the size of inner Paris, walled like a kingdom.", image: "assets/images/excursions/loire_chambord.webp" },
      { text: "Wine tasting", desc: "The Loire's terroir, judged like professionals.", image: "assets/images/excursions/wiki/wine_tasting.jpg" },
      { text: "Boat ride on the Loire", desc: "The valley's calm artery, seen from the water.", image: "assets/images/excursions/wiki/loire_river.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Picnic: Before & After the Renaissance",
        text: "Students build a picnic with two baskets: one holding only what Europe ate before the Renaissance, the other everything that arrived with it. Laying the two side by side on the grass makes the era's contribution to daily life instantly, deliciously visible." },
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: mullioned windows, rooflines, stair turrets, masonry. By the end, students can date a building at a single glance — and sort the Middle Ages from the Renaissance anywhere they travel next." },
      { tag: "pulse", title: "The Wine Jury",
        text: "A tasting session run the way professionals run one: students sit as a jury — eye, nose, vocabulary, verdict — and discover that tasting is a method, not a mystery. The terroir of the Loire becomes the case to judge." },
      { tag: "pulse", title: "Made for Instagram",
        text: "A photo workshop with a thesis: the French formal garden was designed for the perfect shot four centuries before the feed existed. Axes, frames, viewpoints — students shoot the gardens like a grid and prove that staging an image is a Renaissance invention." },
      { tag: "echo", title: "A Night in a Renaissance Château",
        text: "For groups who choose it, the hotel is swapped for a night inside a Renaissance château: stone stairs, creaking parquet, and lights-out in the very architecture the journey is about. The most direct way to understand a château — sleep in it." },
      { tag: "echo", title: "A Boat on the Loire",
        text: "A slow boat ride on the river that made the valley: no commentary race, just the current, the sandbanks and the châteaux drifting past the way travelers saw them for five centuries." },
      { tag: "clutch", title: "The Renaissance Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on the intellectual, economic and artistic revolution — humanism, printing, banking, perspective — so students step off the bus already equipped to read what they see." },
      { tag: "clutch", title: "The Renaissance Shopping List",
        text: "Tomatoes, maize, chocolate, new fabrics, new luxuries — an onboard tour of everything that arrived in Europe with the Renaissance. The era stops being abstract the moment students realize how empty the table was before it." },
      { tag: "clutch", title: "Art Theory Explained: The French Garden",
        text: "A compact onboard masterclass on the French formal garden — geometry, perspective, the mastery of nature as a statement of power — the keys that turn every parterre of the journey into a readable text." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Tours depending on season and availability."
  },

  "gothic-cathedrals": {
    eyebrow: "Educational journey · Northern France",
    title: "Gothic at Its Peak: The Two Finest Cathedrals",
    sub: "Saint-Denis, Amiens, Beauvais — from the birthplace of Gothic to its most daring heights.",
    heroImage: "assets/images/excursions/wiki/amiens.jpg",
    heroAlt: "Amiens Cathedral",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Amiens or Beauvais" }
    ],
    intro: [
      "Gothic architecture was born, perfected and pushed to its breaking point within a hundred kilometers of Paris. This journey visits the three places that determined the art's destiny: the basilica where it was invented, the cathedral where it reached perfection, and the choir where it flew too high.",
      "Along the way, students discover that Gothic is more than an architecture — it's the mentality of an entire era, readable in stone, glass and light."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Saint-Denis", image: "assets/images/excursions/wiki/saint_denis.jpg" },
      { name: "Amiens", image: "assets/images/excursions/wiki/amiens.jpg" },
      { name: "Beauvais", image: "assets/images/excursions/wiki/beauvais.jpg" }
    ],
    highlights: [
      { text: "Basilica of Saint-Denis", desc: "Where Gothic was invented — and the kings of France are buried.", image: "assets/images/excursions/wiki/saint_denis.jpg" },
      { text: "Amiens Cathedral", desc: "The largest Gothic cathedral in France — twice the volume of Notre-Dame.", image: "assets/images/excursions/wiki/amiens.jpg" },
      { text: "Beauvais Cathedral", desc: "The highest vault ever attempted — ambition at the edge of collapse.", image: "assets/images/excursions/wiki/beauvais.jpg" },
      { text: "Boat ride in the hortillonnages", desc: "Amiens' floating gardens, drifting beneath the cathedral.", image: "assets/images/excursions/wiki/hortillonnages.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: pointed arches, vault ribs, window tracery, buttresses. By the end, students can date a church at a single glance — Romanesque, early Gothic, high Gothic or flamboyant — anywhere they travel next." },
      { tag: "pulse", title: "Shoot the Sky",
        text: "A photo workshop on height and perspective: how do you photograph a building designed to overwhelm you? Lines, angles, distortion — students learn to master the vertical, and understand in passing why these buildings were made to be looked up at." },
      { tag: "pulse", title: "Debunk the Middle Ages",
        text: "A walking exploration built to dismantle the clichés — dark, dirty, ignorant — one street at a time. Confronted with what the medieval city actually built, traded and believed, students rebuild a far more surprising picture of the era." },
      { tag: "pulse", title: "Spaceship Cathedral",
        text: "What is a cathedral, really? This activity recontextualises the building as the most ambitious machine of its century — an engineering project so far beyond its time that today's honest comparison isn't another monument, but a rocket or a flying saucer." },
      { tag: "echo", title: "A Boat in the Floating Gardens",
        text: "A slow boat ride through the hortillonnages of Amiens — centuries-old market gardens threaded by canals, with the cathedral on the skyline. No commentary race: just water, birdsong and the city the builders knew." },
      { tag: "echo", title: "A Night in an Old Monastery",
        text: "For groups who choose it, the hotel is swapped for a night in an old monastery guesthouse: stone corridors, silence, and lights-out the way the Middle Ages actually sounded. The most direct way to feel monastic life — sleep inside it." },
      { tag: "echo", title: "Meet the Monks",
        text: "An encounter with a living monastic community — a rare chance to ask, in person, what a thousand-year-old vocation means today, inside the very kind of building the journey is about." },
      { tag: "clutch", title: "Gothic Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on the Gothic system — pointed arches, ribbed vaults, flying buttresses, walls of glass — and the obsession behind it all: more light, more height, less stone." },
      { tag: "clutch", title: "The Gothic Mind",
        text: "Gothic isn't just an architecture — it's the mentality of an era. An onboard plunge into how people of the time spoke, thought and believed: their fears, their sense of time, their idea of God and light — the worldview these buildings were built to express." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Amiens or Beauvais depending on season and availability."
  },

  "christmas-markets": {
    eyebrow: "Educational journey · Northern France",
    title: "Christmas, the Flemish Way",
    sub: "Arras, Lille, Ghent, Bruges — four cities where the magic of Christmas is a local art form.",
    heroImage: "assets/images/excursions/nord_noel.jpeg",
    heroAlt: "A Christmas market under the lights",
    facts: [
      { label: "Duration", value: "2 days, 1 night (seasonal)" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Ghent or Lille" }
    ],
    intro: [
      "Nowhere does Christmas quite like the North. Between France and Belgium, Flanders has built a culture entirely its own — markets, lights, beer, Saint Nicholas — that turns the darkest weeks of the year into the warmest.",
      "Across Arras, Lille, Ghent and Bruges, students discover that this magic isn't decoration: it's a regional identity with deep medieval roots, staged anew every winter."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Arras", image: "assets/images/excursions/wiki/arras.jpg" },
      { name: "Lille", image: "assets/images/excursions/wiki/lille.jpg" },
      { name: "Ghent", image: "assets/images/excursions/wiki/ghent.jpg" },
      { name: "Bruges", image: "assets/images/excursions/nord_bruges.jpeg" }
    ],
    highlights: [
      { text: "The Arras Christmas Market", desc: "Wooden chalets beneath 150 Flemish Baroque façades — one of France's most authentic markets.", image: "assets/images/excursions/wiki/arras.jpg" },
      { text: "Lille, the European City", desc: "The great Flemish metropolis — European, festive and proudly northern.", image: "assets/images/excursions/wiki/lille.jpg" },
      { text: "The Ghent Christmas Market", desc: "Lights and stalls beneath the belfry of Flanders' proudest city.", image: "assets/images/excursions/wiki/ghent.jpg" },
      { text: "The Magnificent City of Bruges", desc: "The Venice of the North, at its most magical under winter lights.", image: "assets/images/excursions/nord_bruges.jpeg" },
      { text: "Boat ride on the canals", desc: "Medieval façades gliding past, seen from the water." }
    ],
    activities: [
      { tag: "pulse", title: "Brew Your Own Beer",
        text: "A hands-on brewing workshop in the land that perfected the craft: malt, hops, yeast and centuries of Flemish know-how. Students follow the process from grain to glass — and leave understanding why beer here is heritage, not just a drink." },
      { tag: "pulse", title: "The Perfect Pour",
        text: "Part of a guided tasting: how to serve a beer the way Flanders insists it be served — the right glass, the right angle, the right head — then how to taste it like the locals. A small ritual that says everything about a culture of craft and pride." },
      { tag: "echo", title: "A Boat on the Canals",
        text: "A slow boat ride on the canals of Bruges: no commentary race, just water, stone bridges and medieval façades drifting past the way merchants saw them six centuries ago." },
      { tag: "clutch", title: "A Very Flemish Christmas",
        text: "Saint Nicholas before Santa, lights against the northern dark, markets born of medieval fairs — an onboard tour of the Christmas traditions specific to Flanders, and why this region stages the season like nowhere else in Europe." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Seasonal journey (late November to late December). Accommodation in Ghent or Lille depending on season and availability."
  },

  flanders: {
    eyebrow: "Educational journey · Northern France",
    title: "Lights of Flanders",
    sub: "Lille, Ghent, Bruges, Ostend — one Flemish culture, two countries, and the light of the North.",
    heroImage: "assets/images/excursions/nord_bruges.jpeg",
    heroAlt: "The canals of Bruges",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" },
      { label: "Overnight", value: "Ghent or Ostend" }
    ],
    intro: [
      "Flanders is a region that ignores its own border: a historic and cultural world straddling France and Belgium, held together by brick façades, belfries, canals and five centuries of trading wealth.",
      "From Lille to Ghent, Bruges and the beach at Ostend, students discover how one culture can live across two countries — and what a border does, and doesn't, change."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Lille", image: "assets/images/excursions/wiki/lille.jpg" },
      { name: "Ghent", image: "assets/images/excursions/wiki/ghent.jpg" },
      { name: "Bruges", image: "assets/images/excursions/nord_bruges.jpeg" },
      { name: "Ostend", image: "assets/images/excursions/wiki/ostend.jpg" }
    ],
    highlights: [
      { text: "The Beach of Ostend", desc: "The 'Queen of Beaches' — Flanders wide open onto the North Sea.", image: "assets/images/excursions/wiki/ostend.jpg" },
      { text: "The Magnificent City of Bruges", desc: "The Venice of the North, preserved like nowhere else in Europe.", image: "assets/images/excursions/nord_bruges.jpeg" },
      { text: "Lille, the European City", desc: "The great Flemish metropolis — French on the map, Flemish at heart, European by vocation.", image: "assets/images/excursions/wiki/lille.jpg" },
      { text: "Beer Tasting", desc: "Flanders' liquid heritage, tasted at the source.", image: "assets/images/excursions/wiki/beer.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Brew Your Own Beer",
        text: "A hands-on brewing workshop in the land that perfected the craft: malt, hops, yeast and centuries of Flemish know-how. Students follow the process from grain to glass — and leave understanding why beer here is heritage, not just a drink." },
      { tag: "pulse", title: "The Perfect Pour",
        text: "Part of a guided tasting: how to serve a beer the way Flanders insists it be served — the right glass, the right angle, the right head — then how to taste it like the locals. A small ritual that says everything about a culture of craft and pride." },
      { tag: "echo", title: "A Boat on the Canals",
        text: "A slow boat ride on the canals of Bruges: no commentary race, just water, stone bridges and medieval façades drifting past the way merchants saw them six centuries ago." },
      { tag: "clutch", title: "A Very Flemish Christmas",
        text: "Saint Nicholas before Santa, lights against the northern dark, markets born of medieval fairs — an onboard tour of the Christmas traditions specific to Flanders, and why this region stages the season like nowhere else in Europe." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Ghent or Ostend depending on season and availability."
  },

  /* ================= EASTERN FRANCE ================= */

  reims: {
    eyebrow: "Educational journey · Eastern France",
    title: "Reims, Capital of Champagne",
    sub: "One city, two crowns — the cathedral of the kings and the world capital of champagne.",
    heroImage: "assets/images/excursions/est_reims.webp",
    heroAlt: "Reims Cathedral",
    facts: [
      { label: "Duration", value: "1 day" },
      { label: "Departure", value: "Paris (train)" },
      { label: "Return", value: "Paris (train)" }
    ],
    intro: [
      "Reims holds two of France's proudest stories in one city: the cathedral where its kings were crowned for a thousand years, and the cellars where champagne became the world's synonym for celebration.",
      "A single day, entirely in one city, means depth instead of distance: under the streets into the chalk galleries, up into the Gothic stone, and through the Art Deco rebirth that followed the First World War."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Reims", image: "assets/images/excursions/est_reims.webp" }
    ],
    highlights: [
      { text: "Reims Cathedral", desc: "Where the kings of France were crowned for a thousand years.", image: "assets/images/excursions/est_reims.webp" },
      { text: "Champagne Tasting", desc: "The world's most celebrated wine, tasted in its own capital.", image: "assets/images/excursions/wiki/champagne_glass.jpg" },
      { text: "The Carnegie Library", desc: "An Art Deco jewel, born of the city's rebirth after 1918.", image: "assets/images/excursions/wiki/carnegie.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Spaceship Cathedral",
        text: "What is a cathedral, really? This activity recontextualises the building as the most ambitious machine of its century — an engineering project so far beyond its time that today's honest comparison isn't another monument, but a rocket or a flying saucer." },
      { tag: "pulse", title: "The Millésime Tasting",
        text: "A guided tasting built around vintage champagne: what a millésime is, why some years earn one and others don't, and how weather, chalk and patience end up in the glass. Tasting becomes a lesson in terroir and time." },
      { tag: "pulse", title: "Down in the Crayères",
        text: "A descent into the underground champagne cellars — Gallo-Roman chalk quarries turned into kilometers of galleries where millions of bottles sleep at a constant temperature. Geology, history and craft, thirty meters below the street." },
      { tag: "echo", title: "A Boat on the Canal",
        text: "A slow boat ride on the water that threads the city: no commentary race, just the current, the banks and the skyline the winegrowers and merchants have always known." },
      { tag: "clutch", title: "Dom Pérignon: The Monk Behind the Bubbles",
        text: "An onboard portrait of the Benedictine cellar master whose obsessive rigor helped turn a flawed local wine into a global legend — and how much of his story is history, and how much is very good marketing." },
      { tag: "clutch", title: "Champagne Expert in Twenty Minutes",
        text: "A fast, precise onboard briefing on how champagne is actually made — grapes, blending, second fermentation, riddling, dosage — so students walk into the cellars already able to ask the right questions." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives."
  },

  troyes: {
    eyebrow: "Educational journey · Eastern France",
    title: "Troyes, City of Medieval Color",
    sub: "Half-timbered lanes, flamboyant glass and a street plan shaped like a champagne cork — the Middle Ages in color.",
    heroImage: "assets/images/excursions/est_vitrail.jpeg",
    heroAlt: "Stained glass in Troyes",
    facts: [
      { label: "Duration", value: "1 day" },
      { label: "Departure", value: "Paris (train)" },
      { label: "Return", value: "Paris (train)" }
    ],
    intro: [
      "Troyes is what a great medieval city looked like when it was alive: leaning half-timbered houses, lanes barely two shoulders wide, and churches glowing with the finest stained glass in France — the craft the city still calls its own.",
      "One day in the old capital of the Counts of Champagne, to read a preserved medieval town the way its merchants, artisans and glassmakers built it."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Troyes", image: "assets/images/excursions/est_vitrail.jpeg" }
    ],
    highlights: [
      { text: "The Medieval Center", desc: "A street plan shaped like a champagne cork, lined with leaning timber houses.", image: "assets/images/excursions/wiki/troyes_centre.jpg" },
      { text: "The Cité du Vitrail", desc: "France's stained-glass capital, from the 12th century to today.", image: "assets/images/excursions/est_vitrail.jpeg" },
      { text: "Saint-Pierre-et-Saint-Paul Cathedral", desc: "Walls of flamboyant Gothic glass, meant to be read like books.", image: "assets/images/excursions/wiki/troyes_cathedral.jpg" },
      { text: "Sainte-Madeleine Church", desc: "One of the finest carved stone rood screens in France." },
      { text: "Aube Champagne Tasting", desc: "The other Champagne — the Aube's own vineyards, tasted at the source.", image: "assets/images/excursions/wiki/champagne_glass.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Debunk the Middle Ages",
        text: "A walking exploration built to dismantle the clichés — dark, dirty, ignorant — one street at a time. Confronted with what the medieval city actually built, traded and believed, students rebuild a far more surprising picture of the era." },
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: timber frames, corbels, tracery, masonry. By the end, students can date a building at a single glance — and sort the Middle Ages from the Renaissance anywhere they travel next." },
      { tag: "pulse", title: "Walk the Cork",
        text: "A walking activity tracing the historic center's famous cork-shaped street plan on foot — a lesson in how a medieval fair town grows, told by its own streets, courtyards and leaning façades." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus at the Cité du Vitrail: instead of covering the museum, students commit to a single window and give it everything — time, questions, close reading. Learning to let the rest go is the skill." },
      { tag: "clutch", title: "Middle Ages Experts in Twenty Minutes",
        text: "A fast, precise onboard briefing that hands students the essential keys — feudal society, the Church, the city — so they step off the train already equipped to read what they see." },
      { tag: "clutch", title: "Art Theory Explained: Stained Glass",
        text: "A compact onboard masterclass on the art of stained glass — how a window is made, how it is read panel by panel, and why medieval Europe treated colored light as the closest thing to heaven." },
      { tag: "clutch", title: "The Wall Street of the Middle Ages",
        text: "Troyes was one of the great fair towns of medieval Europe — a place where merchants from Italy to Flanders met, traded and invented modern finance. An onboard tour of the Champagne fairs, and why a troy ounce is still called a troy ounce." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives."
  },

  "great-war": {
    eyebrow: "Educational journey · Eastern France",
    title: "Memory of the Great War",
    sub: "Belleau Wood, Château-Thierry, Meaux — the Western Front nearest Paris, and how remembrance was built.",
    heroImage: "assets/images/excursions/est_ww1.png",
    heroAlt: "Soldiers of the Great War sharing rations",
    facts: [
      { label: "Duration", value: "1 day" },
      { label: "Departure", value: "Paris" },
      { label: "Return", value: "Paris" }
    ],
    intro: [
      "In 1918, the front line came within sixty kilometers of Paris — and American, French and German soldiers fought over the valleys this journey crosses. One day along that stretch of the Western Front, to understand 1914–18 where it nearly reached the capital.",
      "From a cemetery to a battlefield monument to Europe's largest Great War museum, students study not just what happened, but how a century of remembrance was built on top of it."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A moment of remembrance — letters, ceremonies and silences that let a place speak for itself." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Belleau Wood", image: "assets/images/excursions/est_ww1.png" },
      { name: "Château-Thierry", image: "assets/images/excursions/wiki/cote204.jpg" },
      { name: "Meaux", image: "assets/images/excursions/wiki/meaux_museum.jpg" }
    ],
    highlights: [
      { text: "Belleau Wood American Cemetery", desc: "Where the U.S. Marine Corps legend was born, in 1918.", image: "assets/images/excursions/wiki/belleau.jpg" },
      { text: "The American Monument at Cote 204", desc: "A colossal memorial watching over Château-Thierry and the Marne valley.", image: "assets/images/excursions/wiki/cote204.jpg" },
      { text: "The Museum of the Great War, Meaux", desc: "Europe's largest WWI collection, minutes from the front line it explains.", image: "assets/images/excursions/wiki/meaux_museum.jpg" },
      { text: "Brie de Meaux Tasting", desc: "The king of cheeses, tasted in its home town.", image: "assets/images/excursions/wiki/brie.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Read a Cemetery",
        text: "An observation activity on how military cemeteries are deliberately designed — symmetry, materials, inscriptions — to shape how visitors feel and remember. Once seen, no memorial ever looks neutral again." },
      { tag: "pulse", title: "Terrain as Strategy",
        text: "A viewpoint activity using the Marne valley's own landscape to explain why armies fought where they fought — geography as a military decision, not a backdrop." },
      { tag: "echo", title: "Ceremony",
        text: "An American remembrance ceremony organized with the American Cemetery: colors, silence, and the weight of a ritual performed where it means the most." },
      { tag: "echo", title: "Letters to a Soldier",
        text: "Readings from real wartime correspondence — soldiers writing to their families, their friends, each other — read aloud on the ground they wrote about." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus at the Museum of the Great War: instead of covering the collection, students commit to a single object and reconstruct the individual story it carries. Learning to let the rest go is the skill." },
      { tag: "unbound", title: "Speed Control",
        text: "Students change their relationship to time in the museum: the pace of the visit is deliberately accelerated and varied, forcing a different eye — less lingering, more pattern-spotting — until Europe's largest WWI collection can be grasped as a whole." },
      { tag: "clutch", title: "The Great War Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on 1914–18 — alliances, trenches, home fronts, armistice — so students step off the bus already equipped to read the landscape of the front." },
      { tag: "clutch", title: "War, Then and Now",
        text: "An onboard comparison of war in 1918 and war today — technology, strategy, intelligence, logistics — tracing what has transformed beyond recognition and what, strikingly, has not." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives."
  },

  /* ================= PROVENCE ================= */

  "aix-calanques": {
    eyebrow: "Educational journey · Provence",
    title: "Aix-en-Provence and the Calanques",
    sub: "Cézanne's city and the white cliffs of Cassis — the Provençal art de vivre, and the landscape that made modern art.",
    heroImage: "assets/images/excursions/provence_aix.jpg",
    heroAlt: "Aix-en-Provence",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris (TGV)" },
      { label: "Return", value: "Paris (TGV)" },
      { label: "Overnight", value: "Cassis" }
    ],
    intro: [
      "Provence in two registers: the elegant, fountain-cooled streets of Aix that shaped Paul Cézanne's eye, and the raw limestone coast of the calanques — a national park that starts where the city ends.",
      "Students see how one region can hold both an art of living and a geology of drama — and why the light between the two changed painting forever."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Aix-en-Provence", image: "assets/images/excursions/provence_aix.jpg" },
      { name: "Cassis", image: "assets/images/excursions/wiki/cassis.jpg" }
    ],
    highlights: [
      { text: "The Cours Mirabeau and Old Aix", desc: "Fountains, plane trees and the Provençal art de vivre.", image: "assets/images/excursions/provence_aix.jpg" },
      { text: "Cézanne's Studio", desc: "The Atelier des Lauves, left the way the painter left it.", image: "assets/images/excursions/wiki/cezanne_studio.jpg" },
      { text: "Saint-Sauveur Cathedral", desc: "Sixteen centuries of styles stacked in a single building.", image: "assets/images/excursions/wiki/st_sauveur.jpg" },
      { text: "Boat Ride in the Calanques", desc: "White cliffs and turquoise water — a national park visited by sea.", image: "assets/images/excursions/wiki/calanques.jpg" },
      { text: "Provence Wine Tasting", desc: "The crus of Provence, tasted a few kilometers from the vines.", image: "assets/images/excursions/wiki/wine_tasting.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "You Are the Artist",
        text: "A photography workshop on the go: armed with Cézanne's own questions — where is the structure, what does the light do to the volumes, what do I leave out? — students shoot the landscape the way he painted it, and discover their eye has already changed." },
      { tag: "pulse", title: "Water That Carved Stone",
        text: "A short field geology activity using the calanques themselves: how limestone, vanished rivers and millions of years combine into a coastline found almost nowhere else in Europe." },
      { tag: "pulse", title: "The Wine Jury",
        text: "A tasting session run the way professionals run one: students sit as a jury — eye, nose, vocabulary, verdict — and discover that tasting is a method, not a mystery. The crus of Provence become the case to judge." },
      { tag: "echo", title: "A Boat in the Calanques",
        text: "A slow boat ride along the cliffs: no commentary race, just the engine's hum, the seabirds and the white walls rising out of turquoise water." },
      { tag: "echo", title: "An Evening on the Port of Cassis",
        text: "The day closes on the little harbour Churchill called one of the prettiest in the world: boats coming in, lights coming on, and the cliffs turning pink. Nothing to do — that's the point." },
      { tag: "clutch", title: "Cézanne: The Father of Us All",
        text: "Picasso said it, not us. An onboard portrait of the stubborn Aixois who painted one mountain over eighty times and quietly invented modern art — so students arrive in his city knowing why it mattered." },
      { tag: "clutch", title: "What Is a Calanque, Exactly?",
        text: "An onboard geology briefing on the coast ahead: how these narrow limestone fjords were carved, why the water is that color, and why the whole coastline is now a protected national park." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Cassis."
  },

  "marseille-calanques": {
    eyebrow: "Educational journey · Provence",
    title: "Marseille and the Calanques",
    sub: "France's oldest city and the wildest coast in the Mediterranean — 2,600 years of arrivals, and the sea that brought them.",
    heroImage: "assets/images/excursions/provence_marseille.jpeg",
    heroAlt: "Notre-Dame de la Garde overlooking Marseille",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris (TGV)" },
      { label: "Return", value: "Paris (TGV)" },
      { label: "Overnight", value: "Cassis" }
    ],
    intro: [
      "Founded by Greek sailors twenty-six centuries ago, Marseille has never stopped being what it was on day one: a port where the Mediterranean arrives. This journey reads the city as that long story of exchange — then steps out of it, into the calanques at its edge.",
      "The contrast is the lesson: France's second-largest city and some of its wildest coastline share the same horizon, minutes apart."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Marseille", image: "assets/images/excursions/provence_marseille.jpeg" },
      { name: "Cassis", image: "assets/images/excursions/wiki/cassis.jpg" }
    ],
    highlights: [
      { text: "The Vieux-Port", desc: "2,600 years of arrivals, still the beating heart of the city.", image: "assets/images/excursions/wiki/vieux_port.jpg" },
      { text: "Notre-Dame de la Garde", desc: "The 'Bonne Mère', watching over the city and the sea.", image: "assets/images/excursions/provence_marseille.jpeg" },
      { text: "The Mucem", desc: "Mediterranean civilisations, in a lace of concrete on the water.", image: "assets/images/excursions/wiki/mucem.jpg" },
      { text: "The Route des Crêtes", desc: "Europe's highest sea cliffs, by road — vertigo included.", image: "assets/images/excursions/wiki/cap_canaille.jpg" },
      { text: "Boat Ride in the Calanques", desc: "White cliffs and turquoise water — a national park visited by sea.", image: "assets/images/excursions/wiki/calanques.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "A Port That Never Stopped Changing",
        text: "A walking activity along the Vieux-Port tracing waves of arrival — Greek, Roman, colonial, postwar — still visible in the city's neighborhoods, accents and street food. Immigration as the city's oldest tradition." },
      { tag: "pulse", title: "Water That Carved Stone",
        text: "A short field geology activity using the calanques themselves: how limestone, vanished rivers and millions of years combine into a coastline found almost nowhere else in Europe." },
      { tag: "echo", title: "A Boat in the Calanques",
        text: "A slow boat ride along the cliffs: no commentary race, just the engine's hum, the seabirds and the white walls rising out of turquoise water." },
      { tag: "echo", title: "The Route des Crêtes",
        text: "The transfer becomes the moment: a slow drive along the highest sea cliffs in Europe, between Cassis and La Ciotat, with stops where the view makes talking pointless." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus at the Mucem: instead of covering the collections, students commit to a single object and trace the Mediterranean story it carries. Learning to let the rest go is the skill." },
      { tag: "clutch", title: "Marseille Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on France's oldest city — Greek colony, plague port, gateway of empire, capital of the Mediterranean — so students read the harbour as the 2,600-year-old crossroads it is." },
      { tag: "clutch", title: "What Is a Calanque, Exactly?",
        text: "An onboard geology briefing on the coast ahead: how these narrow limestone fjords were carved, why the water is that color, and why the whole coastline is now a protected national park." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Cassis."
  },

  "provence-stones": {
    eyebrow: "Educational journey · Provence",
    title: "Stones of Provence",
    sub: "Avignon, Arles, the Pont du Gard — Rome, the popes and Van Gogh, read straight off the stone.",
    heroImage: "assets/images/excursions/provence_pontdugard.jpeg",
    heroAlt: "The Pont du Gard",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris (TGV)" },
      { label: "Return", value: "Paris (TGV)" },
      { label: "Overnight", value: "Arles" }
    ],
    intro: [
      "Provence keeps its history in stone, and keeps using it: a Roman arena that never closed, the largest Gothic palace in Europe, an aqueduct that still takes your breath away twenty centuries on.",
      "From Avignon to Arles and the Pont du Gard, students read three empires of builders — Rome, the papacy, and the engineers — and meet the painter who set it all ablaze: Van Gogh."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Avignon", image: "assets/images/excursions/wiki/palais_papes.jpg" },
      { name: "Arles", image: "assets/images/excursions/wiki/arles_amphi.jpg" },
      { name: "Pont du Gard", image: "assets/images/excursions/provence_pontdugard.jpeg" }
    ],
    highlights: [
      { text: "The Palais des Papes", desc: "The largest Gothic palace in Europe — the Vatican in exile.", image: "assets/images/excursions/wiki/palais_papes.jpg" },
      { text: "The Arles Amphitheater", desc: "A Roman arena still hosting crowds after two thousand years.", image: "assets/images/excursions/wiki/arles_amphi.jpg" },
      { text: "The Pont du Gard", desc: "Rome's engineering masterpiece — fifty kilometers of aqueduct for one city.", image: "assets/images/excursions/provence_pontdugard.jpeg" },
      { text: "Van Gogh's Arles", desc: "The streets and cafés he painted in one incandescent year.", image: "assets/images/excursions/wiki/van_gogh_cafe.jpg" },
      { text: "The Pont d'Avignon", desc: "Half a bridge — and a song the whole world knows.", image: "assets/images/excursions/wiki/pont_avignon.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: Roman arches, Romanesque portals, Gothic vaults. By the end, students can date a building at a single glance — and read Provence as the two-thousand-year palimpsest it is." },
      { tag: "pulse", title: "Engineer an Aqueduct",
        text: "A hands-on problem-solving activity beneath the Pont du Gard itself: how do you move water fifty kilometers using nothing but gravity and a fall of 34 centimeters per kilometer? Roman engineering, solved by hand." },
      { tag: "pulse", title: "Kayak the Aqueduct",
        text: "Paddling the Gardon river straight under the Pont du Gard — the monument at its full height, seen from the water it was built to cross. Architecture as an experience no viewpoint can match." },
      { tag: "echo", title: "Sunset at the Pont du Gard",
        text: "The day ends beneath the arches in golden light, when the crowds thin and the stone glows — the aqueduct the way shepherds and painters have seen it for centuries. Nothing to do; everything to feel." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus at the Musée de l'Arles antique: instead of covering the collections, students commit to a single object — a barge, a bust, a mosaic — and reconstruct the Roman world around it." },
      { tag: "clutch", title: "Ancient Rome Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on how Rome built an empire — roads, water, arenas, concrete — so students walk into Arles reading Roman infrastructure as the power move it was." },
      { tag: "clutch", title: "When the Pope Lived in France",
        text: "For sixty-seven years the center of Christendom was not Rome but Avignon — an onboard tour of the political crisis that moved a papacy, and the fortress-palace it built to prove the point." },
      { tag: "clutch", title: "Van Gogh: One Year, Three Hundred Paintings",
        text: "An onboard portrait of Van Gogh's Arles year — the light that drew him, the frenzy that consumed him, and the three hundred works it produced — so students walk his streets knowing what happened there." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Arles."
  },

  /* ================= BORDEAUX ================= */

  "bordeaux-estuary": {
    eyebrow: "Educational journey · Bordeaux",
    title: "Bordeaux, City of Stone and Estuary",
    sub: "The UNESCO-listed Port of the Moon, the oyster basin and Europe's tallest dune — where a merchant city meets the ocean.",
    heroImage: "assets/images/excursions/bordeaux_arcachon.jpg",
    heroAlt: "The seafront of Arcachon",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris (TGV)" },
      { label: "Return", value: "Paris (TGV)" },
      { label: "Overnight", value: "Bordeaux" }
    ],
    intro: [
      "Bordeaux is a city built by water: an eighteenth-century stone riverfront financed by Atlantic trade, and behind it the wild landscapes that made the wealth possible — the oyster basin of Arcachon and the tallest sand dune in Europe.",
      "Two days to read that interaction: UNESCO urbanism on one side, fragile coastal ecosystems on the other, and the local savoir-faire — oysters, wine — that ties them together."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Bordeaux", image: "assets/images/excursions/wiki/bourse_bordeaux.jpg" },
      { name: "Arcachon", image: "assets/images/excursions/bordeaux_arcachon.jpg" },
      { name: "Dune du Pilat", image: "assets/images/excursions/wiki/dune_pilat.jpg" }
    ],
    highlights: [
      { text: "The UNESCO Quays of Bordeaux", desc: "The 'Port of the Moon' — the largest 18th-century urban ensemble in France.", image: "assets/images/excursions/wiki/bordeaux_quays.jpg" },
      { text: "The Place de la Bourse and Water Mirror", desc: "The world's largest reflecting pool, facing the century's finest façade.", image: "assets/images/excursions/wiki/bourse_bordeaux.jpg" },
      { text: "The Dune du Pilat", desc: "Europe's tallest sand dune — over 100 meters high, and still moving.", image: "assets/images/excursions/wiki/dune_pilat.jpg" },
      { text: "The Arcachon Basin", desc: "Oyster ports, tides, and the famous cabanes tchanquées on stilts.", image: "assets/images/excursions/wiki/arcachon_bay.jpg" },
      { text: "La Cité du Vin", desc: "Wine as a world civilisation, in a building shaped like a swirl.", image: "assets/images/excursions/wiki/cite_du_vin.jpg" },
      { text: "Oyster Tasting", desc: "Straight from the water, in a working oysterman's cabane.", image: "assets/images/excursions/wiki/oysters.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "A Riverfront Built on Trade",
        text: "A walking activity along the quays connecting the 18th-century façades to the Atlantic trade routes that financed them — sugar, wine, and the darker cargoes the city has learned to talk about. Architecture as an account book." },
      { tag: "pulse", title: "Climb a Moving Landscape",
        text: "A guided climb to the summit of the Dune du Pilat, examining how wind, sand and vegetation keep the dune advancing — burying the forest behind it year by year. Geology at walking pace, with the Atlantic as reward." },
      { tag: "pulse", title: "Oysters at the Source",
        text: "A tasting in a working cabane with the people who farm the basin: how an oyster is raised, why the tide decides everything, and what a terroir means when it's underwater half the day." },
      { tag: "echo", title: "A Boat on the Basin",
        text: "A slow boat ride across the Arcachon Basin, past the oyster beds and the cabanes tchanquées: no commentary race, just tides, birds and the light that made the basin famous." },
      { tag: "echo", title: "Sunset on the Dune",
        text: "The day ends on top of the Pilat: the Atlantic on one side, the endless Landes forest on the other, and the sun going down over the Banc d'Arguin. No activity, no worksheet — just one of France's great views, earned on foot." },
      { tag: "unbound", title: "The Battle of the Museums",
        text: "A participative finale: groups each take on a different museum — the classic Musée des Beaux-Arts or the immersive Cité du Vin — then meet to defend their museum's experience in a structured debate. Old school against new school." },
      { tag: "unbound", title: "The One and Only",
        text: "A deliberate change of focus in the museum: instead of trying to see everything, students commit to a single work and give it everything — time, questions, close reading. Learning to let the rest go is the skill." },
      { tag: "clutch", title: "Bordeaux Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on how a river port became one of Europe's richest cities — the Port of the Moon, the wine trade, the Atlantic economy — so students read the façades as the fortunes they are." },
      { tag: "clutch", title: "Where the Ocean Meets the Land",
        text: "An onboard geography masterclass on the coast ahead: how tides build an oyster basin, how wind builds a hundred-meter dune, and why this shoreline never stops redrawing itself." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Bordeaux."
  },

  "bordeaux-vineyards": {
    eyebrow: "Educational journey · Bordeaux",
    title: "Bordeaux, Vineyards and Landscapes",
    sub: "The UNESCO city and the classified slopes of Saint-Émilion — architecture, terroir and the know-how behind the world's most famous wine.",
    heroImage: "assets/images/excursions/bordeaux_vins.jpeg",
    heroAlt: "The vineyards of Saint-Émilion",
    facts: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Departure", value: "Paris (TGV)" },
      { label: "Return", value: "Paris (TGV)" },
      { label: "Overnight", value: "Bordeaux" }
    ],
    intro: [
      "Bordeaux and its vineyards are one system: a UNESCO-listed city built on the wine trade, and around it the cultivated landscapes — Saint-Émilion first among them — that have produced continuously since Roman times.",
      "Two days to connect the two: the architecture the wine paid for, the terroir the wine comes from, and the vocabulary — appellation, cru, millésime — that turns a bottle into a readable document."
    ],
    formats: [
      { cls: "pulse", name: "Pulse", text: "A short on-site activity that turns an ordinary place into a subject of study." },
      { cls: "echo", name: "Echo", text: "A slower, sensory moment — nights, rides and encounters that let the place itself do the teaching." },
      { cls: "unbound", name: "Unbound", text: "A museum activity that breaks the standard visit — changing the focus, the tempo, or the format entirely." },
      { cls: "clutch", name: "Clutch", text: "An onboard sequence that uses transfer time to unlock the key ideas needed to understand what comes next." }
    ],
    destinations: [
      { name: "Bordeaux", image: "assets/images/excursions/wiki/bourse_bordeaux.jpg" },
      { name: "Saint-Émilion", image: "assets/images/excursions/bordeaux_vins.jpeg" }
    ],
    highlights: [
      { text: "The UNESCO Quays of Bordeaux", desc: "The 'Port of the Moon' — the largest 18th-century urban ensemble in France.", image: "assets/images/excursions/wiki/bourse_bordeaux.jpg" },
      { text: "La Cité du Vin", desc: "Wine as a world civilisation, in a building shaped like a swirl.", image: "assets/images/excursions/wiki/cite_du_vin.jpg" },
      { text: "Saint-Émilion", desc: "A medieval village grown out of its own vineyard — UNESCO-listed as a living landscape.", image: "assets/images/excursions/bordeaux_vins.jpeg" },
      { text: "The Monolithic Church", desc: "A church carved downward into a single rock.", image: "assets/images/excursions/wiki/st_emilion_church.jpg" },
      { text: "Wine Tasting", desc: "The world's most famous vineyard, glass in hand.", image: "assets/images/excursions/wiki/wine_tasting.jpg" }
    ],
    activities: [
      { tag: "pulse", title: "Terroir, Explained With Your Senses",
        text: "A sensory workshop using the Cité du Vin's own tools to demonstrate how soil, climate and grape variety combine into what tasters call terroir — before students walk the real thing in Saint-Émilion." },
      { tag: "pulse", title: "The Wine Jury",
        text: "A tasting session run the way professionals run one: students sit as a jury — eye, nose, vocabulary, verdict — and discover that tasting is a method, not a mystery. Saint-Émilion becomes the case to judge." },
      { tag: "pulse", title: "Spot the Details",
        text: "A precision visit built on details: Romanesque arches, medieval lanes, monastic cellars. By the end, students can date a building at a single glance — and read Saint-Émilion as the thousand-year palimpsest it is." },
      { tag: "echo", title: "A Boat on the Garonne",
        text: "A slow boat ride on the river that made the city: the Port of the Moon unrolling from the water, the way every cargo of wine first saw it." },
      { tag: "echo", title: "An Evening in the Vines",
        text: "The day closes on the classified slopes themselves: a quiet walk through the rows at golden hour, when the landscape explains — better than any lecture — why people have tended these hills for two thousand years." },
      { tag: "unbound", title: "Speed Control",
        text: "Students change their relationship to time in the museum: the pace of the visit is deliberately accelerated and varied, forcing a different eye — less lingering, more pattern-spotting — until the Cité du Vin's world tour can be grasped as a whole." },
      { tag: "clutch", title: "Bordeaux Explained in Twenty Minutes",
        text: "A fast, precise onboard briefing on how a river port became one of Europe's richest cities — the Port of the Moon, the wine trade, the Atlantic economy — so students read the façades as the fortunes they are." },
      { tag: "clutch", title: "What's in a Label?",
        text: "Appellation d'origine — the French idea that a product belongs to its land. An onboard decoding of AOC, AOP and cru: everything a French label promises, guarantees or merely suggests. The one concept that unlocks every local product in France, from wine and champagne to cheese and cider." }
    ],
    closingSub: CLOSING_DEFAULT,
    fineprint: "Educational journey designed by UpTempo — itinerary, timings, activities and French level adjusted to each group's age, size and objectives. Accommodation in Bordeaux."
  }

};
