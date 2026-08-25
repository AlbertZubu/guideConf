# Redéfinition des excursions — description en blocs

> Document de travail. Source : `docs/fiches Excursions.zip` (14 fiches Word + formulaire).
> Règle : **toutes les excursions font 2 jours / 1 nuit.**
> Le flagship « Normandy in 3 Journeys » ne bouge pas.
>
> **Langue des blocs** (validée) :
> - `transport` — bloc sombre, on est dans le bus/train ; porte 0-n [clutch]
> - `secteur` — bloc clair = un lieu (Rouen, Bayeux…) ; contient les activités,
>   les listes, et les sous-blocs qui ressortent : `repas/temps libre` et `nuitée`
> - `activité (pulse)` — dans un secteur ; « Activité Booster » des fiches Word = pulse
> - `retour` — bloc transport final vers le point de départ, sur le rail
>
> **Structure de fiche** (formulaire Word) : Titre · Durée · Départ ·
> Présentation pédagogique · Lieux incontournables · Objectifs pédagogiques ·
> Itinéraire · Public cible · Équipement.
> → La fiche actuelle n'a pas « Lieux incontournables », « Public cible » ni
> « Équipement » : à ajouter au template lors de l'implémentation.
>
> Marquage : **[PROPOSITION]** = invention pour tenir les 2 jours, à valider.
> Les [clutch] ne sont pas définis dans les fiches Word — à définir ou recycler.

---

## 1. Dans les pas de Claude Monet — slug `monet`
Durée 2j/1n ✓ · Départ Paris Porte Maillot (bus)

**JOUR 1**
- transport — Paris → Honfleur
- secteur **Honfleur** : marché local — activité (pulse) « immersion » · Musée Eugène Boudin · dégustation au Point de Vue du Mont Joli · repas/temps libre
- transport — Honfleur → Le Havre
- secteur **Le Havre** : tour panoramique de la cité reconstruite · Quai Southampton — activité (pulse) « Monet, where was He? »
- transport — Le Havre → Étretat
- secteur **Étretat** : nuitée (installation hôtel + dîner)

**JOUR 2**
- secteur **Étretat** : promenade guidée + points de vue — activité (pulse) atelier photo
- transport — Étretat → Rouen
- secteur **Rouen** : Cathédrale (la série de Monet) · repas/temps libre
- transport — Rouen → Giverny
- secteur **Giverny** : maison et jardins de Monet
- retour — Giverny → Paris

---

## 2. Normandie Découverte — **nouvelle excursion** (probable remplaçante de `medieval-normandy` — À ARBITRER)
Durée 2j/1n ✓ · Départ Paris Porte Maillot

**JOUR 1**
- transport — Paris → Honfleur
- secteur **Honfleur** : visite à pied cité médiévale + quartiers maritimes · Musée Eugène Boudin · repas/temps libre au Vieux Bassin
- transport — Honfleur → secteur Omaha
- secteur **Omaha** : Cimetière Américain de Colleville · Omaha Beach
- transport — Omaha → Bayeux
- secteur **Bayeux** : Cathédrale · Tapisserie (sous réserve de réouverture ; sinon complété par Rouen ou Honfleur)
- transport — Bayeux → Granville
- secteur **Granville** : nuitée (hôtel + dîner)

**JOUR 2**
- transport — Granville → Mont-Saint-Michel
- secteur **Mont-Saint-Michel** : visite approfondie de l'Abbaye et des salles gothiques · repas/temps libre (remparts, venelles)
- secteur **Terroir normand** : dégustation de saveurs locales
- retour — → Paris

---

## 3. Mémoires du Débarquement — slug `d-day`
Word : 3j/2n → **compressé en 2j/1n**. Départ Paris Porte Maillot.
⚠ Le J3 du Word (Juno : studio radio BBC, marché aux poissons · Sword : Pegasus Bridge, cimetière du Commonwealth) **saute** → proposer en « extension 3ᵉ jour possible » dans la fiche. La promesse « les 5 plages » devient « Utah, Omaha, Gold ».

**JOUR 1**
- transport — Paris → Caen
- secteur **Caen** : visite du Mémorial (poser les jalons du conflit) · repas
- transport — Caen → secteur Utah
- secteur **Utah** : Sainte-Mère-Église · Cimetière allemand de La Cambe (réconciliation) · Pointe du Hoc — activité (pulse) « War Photography »
- transport — → Bayeux
- secteur **Bayeux** : nuitée (installation hôtel + dîner)

**JOUR 2**
- secteur **Bayeux** : Tapisserie de Bayeux · Cathédrale et cité épargnée
- transport — Bayeux → secteur Omaha
- secteur **Omaha** : Cimetière Américain de Colleville — activité (pulse) cérémonie au cimetière · parcours panoramique en autocar de la plage · options : dégustations, Jeeps d'époque, Cinéma 360° · repas
- transport — Omaha → Gold
- secteur **Gold** : Arromanches, vestiges du port artificiel Mulberry
- retour — Arromanches → Paris

---

## 4. Le Gothique à son apogée — slug `gothic-cathedrals`
Word : 1 jour → **étendu en 2j/1n [PROPOSITION]**. Départ Paris.

**JOUR 1**
- transport — Paris → Saint-Denis
- secteur **Saint-Denis** : Basilique + Nécropole royale (naissance du gothique)
- transport — Saint-Denis → Beauvais
- secteur **Beauvais** : Église Saint-Étienne · Cathédrale (chœur le plus haut du monde + horloge astronomique) · repas/temps libre
- transport — Beauvais → Amiens
- secteur **Amiens** : nuitée (hôtel + dîner) — [PROPOSITION] soirée « Chroma », son et lumière sur la façade de la cathédrale (saisonnier), justifie la nuit sur place

**JOUR 2**
- secteur **Amiens** : Quartier Saint-Leu (« Petite Venise du Nord ») · Cathédrale Notre-Dame (la plus vaste de France) · centre médiéval · repas/temps libre
- retour — Amiens → Paris

---

## 5. Marchés de Noël — slug `christmas-markets`
Durée 2j/1n ✓ (saisonnier) · Départ Paris
⚠ Nouveau parcours : Arras → Lille → **Gand** (nuit) → Bruges (le site actuel fait Arras → Bruges).

**JOUR 1**
- transport — Paris → Arras
- secteur **Arras** : Marché de Noël sur la Grand'Place (baroque flamand)
- transport — Arras → Lille
- secteur **Lille** : tour panoramique en bus · repas/temps libre au Marché de Noël
- transport — Lille → Gand (Belgique)
- secteur **Gand** : nuitée (hôtel + dîner) · promenade nocturne — illuminations du Marché de Noël et du centre historique

**JOUR 2**
- transport — Gand → Bruges
- secteur **Bruges** : visite à pied du centre · balade en bateau sur les canaux · dégustation bière/produits locaux · repas/temps libre
- retour — Bruges → Paris

---

## 6. Lumières de Flandres — slug `flanders`
Durée 2j/1n ✓ · Départ Paris
⚠ Nouveau parcours : Lille → **Roubaix** → **Ostende** (nuit) → Bruges.

**JOUR 1**
- transport — Paris → Lille
- secteur **Lille** : visite à pied du centre historique · repas
- transport — Lille → Roubaix
- secteur **Roubaix** : Musée La Piscine (Art déco, reconversion patrimoniale)
- transport — Roubaix → Ostende
- secteur **Ostende** : « Reine des plages » · nuitée (hôtel + dîner)

**JOUR 2**
- transport — Ostende → Bruges
- secteur **Bruges** : visite à pied · balade en bateau sur les canaux · dégustation bière/produits locaux
- retour — Bruges → Paris

---

## 7. Reims, capitale de la Champagne — slug `reims`
Word : 1 jour → **étendu en 2j/1n [PROPOSITION]**. Départ Paris Gare de l'Est (train).
Extension construite avec le Palais du Tau (listé « incontournable » dans le Word mais absent de son itinéraire 1 jour).

**JOUR 1**
- transport — train Paris → Reims
- secteur **Reims — centre historique** : découverte du centre · visite guidée de la Cathédrale Notre-Dame (sacres royaux) · repas · Bibliothèque Carnegie (Art déco)
- secteur **Reims** : nuitée (hôtel + dîner) — [PROPOSITION] balade nocturne façade illuminée de la cathédrale

**JOUR 2**
- secteur **Reims — Palais du Tau** : trésor de la cathédrale [PROPOSITION en J2]
- secteur **Reims — Maison de Champagne** : crayères et caves UNESCO · méthode champenoise · repas/temps libre rues commerçantes
- retour — train Reims → Paris

---

## 8. Troyes, cité des couleurs médiévales — slug `troyes`
Word : 1 jour → **étendu en 2j/1n [PROPOSITION]**. Départ Paris Gare de l'Est (train).
Extension construite avec la Cathédrale et Sainte-Madeleine (« incontournables » du Word absents de son itinéraire 1 jour).

**JOUR 1**
- transport — train Paris → Troyes
- secteur **Troyes — centre médiéval** : parcours pans de bois (le « bouchon de champagne ») · repas · Cité du Vitrail (Hôtel-Dieu-le-Comte)
- secteur **Troyes** : nuitée (hôtel + dîner)

**JOUR 2**
- secteur **Troyes — art sacré** : Cathédrale Saint-Pierre-et-Saint-Paul (verrières) · Église Sainte-Madeleine (jubé de pierre) [PROPOSITION en J2]
- secteur **Troyes** : dégustation de champagne de l'Aube · repas/temps libre ruelles et boutiques
- retour — train Troyes → Paris

---

## 9. Mémoire de la Grande Guerre — slug `great-war`
Word : 1 jour → **étendu en 2j/1n [PROPOSITION]**. Départ Paris.
Le Word suggère lui-même l'extension : « Verdun ou la Champagne, à proximité immédiate ».

**JOUR 1**
- transport — Paris → Bois Belleau
- secteur **Bois Belleau** : Cimetière américain (offensive 1918)
- transport — → Château-Thierry
- secteur **Château-Thierry** : Monument américain de la Cote 204 · repas
- transport — → Meaux
- secteur **Meaux** : Musée de la Grande Guerre (plus grand musée d'Europe sur 14-18) · dégustation de Brie de Meaux (Maison du Brie)
- transport — Meaux → [lieu de nuit : Reims ou Verdun — À ARBITRER]
- secteur **nuitée** (hôtel + dîner)

**JOUR 2 [PROPOSITION — variante Verdun]**
- secteur **Verdun** : Ossuaire et nécropole de Douaumont · Fort de Douaumont · Citadelle souterraine · repas
- retour — Verdun → Paris
- *Variante Champagne : front de Champagne + Reims (Musée de la Reddition).*

---

## 10. Aix-en-Provence et Calanques — slug `aix-calanques`
Durée 2j/1n ✓ · Départ Paris Gare de Lyon (TGV)

**JOUR 1**
- transport — TGV Paris → Aix
- secteur **Aix-en-Provence** : temps libre marché local · repas · Cathédrale Saint-Sauveur · Atelier Cézanne
- transport — Aix → Cassis
- secteur **Cassis** : nuitée (hôtel + dîner)

**JOUR 2**
- secteur **Cassis** : balade en bateau dans les Calanques · repas · dégustation de vin (crus de Provence)
- retour — TGV → Paris

---

## 11. Marseille et Calanques — slug `marseille-calanques`
Durée 2j/1n ✓ · Départ Paris Gare de Lyon (TGV)

**JOUR 1**
- transport — TGV Paris → Marseille
- secteur **Marseille** : tour panoramique en bus · repas · Mucem
- transport — Marseille → Cassis **par la Route des Crêtes** (trajet pittoresque = un transport « qui se visite »)
- secteur **Cassis** : nuitée (hôtel + dîner)

**JOUR 2**
- secteur **Cassis** : balade en bateau dans les Calanques · repas · dégustation de vin
- retour — TGV → Paris

---

## 12. Pierres de Provence — slug `provence-stones`
Durée 2j/1n ✓ · Départ Paris Gare de Lyon (TGV)

**JOUR 1**
- transport — TGV Paris → Avignon
- secteur **Avignon** : visite à pied remparts + centre · temps libre marché · repas · Palais des Papes
- transport — Avignon → Arles
- secteur **Arles** : nuitée (hôtel + dîner dans un restaurant local)

**JOUR 2**
- secteur **Arles** : sites romains, médiévaux et lieux de Van Gogh · Amphithéâtre · repas
- transport — Arles → Pont du Gard
- secteur **Pont du Gard** : aqueduc + espace muséographique
- retour — TGV → Paris

---

## 13. Bordeaux, ville de pierre et d'estuaire — slug `bordeaux-estuary`
Durée 2j/1n ✓ · Départ Paris Gare Montparnasse (TGV)
⚠ Ordre inversé vs site actuel : **Arcachon d'abord, Bordeaux en J2** (nuit à Bordeaux).

**JOUR 1**
- transport — TGV Paris → Bordeaux → Arcachon
- secteur **Arcachon** : dégustation d'huîtres dans une cabane typique · temps libre marché · repas en bord de mer
- transport — Arcachon → Dune du Pilat
- secteur **Dune du Pilat** : ascension + panorama Banc d'Arguin
- transport — → Bordeaux
- secteur **Bordeaux** : nuitée (hôtel + dîner gastronomie du Sud-Ouest)

**JOUR 2**
- secteur **Bordeaux** : tour panoramique architecture UNESCO · Musée des Beaux-Arts · repas centre historique · Cité du Vin (parcours immersif + belvédère)
- retour — TGV → Paris

---

## 14. Bordeaux, vignobles et paysages — slug `bordeaux-vineyards`
Durée 2j/1n ✓ · Départ Paris Gare Montparnasse (TGV)

**JOUR 1**
- transport — TGV Paris → Bordeaux
- secteur **Bordeaux** : tour panoramique architecture UNESCO · repas · Cité du Vin · nuitée (hôtel + dîner Sud-Ouest)

**JOUR 2**
- transport — Bordeaux → Saint-Émilion
- secteur **Saint-Émilion** : visite de la ville · Église monolithique · repas · dégustation de vin
- retour — TGV → Paris

---

## Points à arbitrer avant implémentation

1. **Loire** — aucune fiche Word pour `loire-chateaux`, `loire-renaissance`, `loire-gardens`. Garder les versions actuelles ? Les écrire sur le même modèle ? Les retirer ?
2. **Normandie Découverte** — nouvelle excursion : remplace `medieval-normandy` ou s'ajoute ?
3. **Débarquement** — valider la compression 3j→2j (le J3 Juno/Sword devient une extension mentionnée dans la fiche).
4. **Grande Guerre J2** — Verdun ou Champagne ?
5. **Extensions [PROPOSITION]** de Reims, Troyes, Gothique — valider les découpages J1/J2.
6. **Langue** — fiches Word en français, site en anglais : je traduis tout en anglais à l'implémentation ?
7. **Nouvelles sections de fiche** (Lieux incontournables, Public cible, Équipement) — à ajouter au template pour toutes.
8. **[clutch]** — aucun défini dans les Word : on recycle les clutchs actuels quand le trajet correspond, et on définit les manquants à l'implémentation.
