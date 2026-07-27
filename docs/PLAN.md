# Plan — Fiche Excursion UpTempo : switcher multi-design

## Contexte

Le dossier contient trois éléments :
- `prompt premier.txt` : le brief d'un site portfolio complet UpTempo (hors périmètre de ce plan, à traiter plus tard le cas échéant).
- `normandy-in-3-journeys.html` (= `uptempo-excursion-template (1).html`, fichier identique) : un générateur de **fiche excursion imprimable** (A4 paysage, print-to-PDF), piloté par un objet JS `EXCURSION`, actuellement stylé uniquement avec les tokens "Notion" (recopiés en dur dans `:root`). Un système `REGIONS` permet déjà de reteinter l'accent couleur par région géographique.
- `Design styles.zip` : 14 fiches de design system très détaillées (couleurs, typographie, radius, spacing, composants) extraites de vraies marques — Notion, Apple, Airbnb, Discord, Slack, Nike, Mastercard, HashiCorp, ElevenLabs, Pinterest, Clay, Claude, Airtable, Nintendo 2001.

**Décision de portée (validée avec l'utilisateur)** : on ne construit pas le site portfolio complet. On continue/finalise l'outil fiche excursion, en lui ajoutant un **switcher multi-design system**, en remplaçant le style unique "Notion" par plusieurs vrais design systems tirés de la zip (au lieu des 3 styles génériques "Notion/Editorial/Dark" imaginés dans le brief).

## Design systems retenus pour le MVP

Les 14 fiches partagent la même structure (`colors`, `typography`, `rounded`, `spacing`, `components`), ce qui les rend directement exploitables comme sources de tokens. Implémenter les 14 d'un coup est disproportionné ; on démarre avec 3 systèmes offrant un contraste fort (repris du même triptyque clair / chaleureux-éditorial / sombre que visait le brief, mais avec de vraies marques) :

1. **Notion** — déjà implémenté, sert de base/référence (canvas clair, bleu #0075de, Inter).
2. **Claude (Anthropic)** — canvas crème chaud, display serif (Copernicus/Tiempos), CTA corail — couvre le registre "éditorial/chaleureux".
3. **Discord** — canvas indigo sombre, Blurple + vert/magenta néon, display condensé en capitales — couvre le registre "sombre/énergique".

Les 11 fiches restantes (Apple, Airbnb, Slack, Nike, Mastercard, HashiCorp, ElevenLabs, Pinterest, Clay, Airtable, Nintendo 2001) restent en backlog : l'architecture ci-dessous permet d'en ajouter un nouveau en ne touchant qu'un seul objet JS, sans toucher au HTML de contenu.

## Architecture cible

Le fichier reste un **single-file HTML** (pas de build), conformément à la structure déjà en place.

1. **Extraire les tokens en JS** : remplacer les valeurs `:root{...}` codées en dur par un objet `DESIGN_SYSTEMS = { notion: {...}, claude: {...}, discord: {...} }`, chaque entrée mappant vers les custom properties déjà utilisées dans le CSS (`--primary`, `--canvas`, `--canvas-soft`, `--ink`, `--ink-muted`, `--hairline`, `--pulse`, `--buscast`, `--r-*`, `--shadow-1`, `--font-display`/`--font-body` si nécessaire). Valeurs dérivées directement des sections `colors`/`typography`/`rounded`/`spacing` des `.md` correspondants.
2. **Fonction `applyDesign(key)`** : pose les custom properties sur `document.documentElement.style`, gère la classe active sur les boutons, persiste le choix en `localStorage`, et une transition CSS douce (déjà un pattern présent ailleurs, à ajouter ici).
3. **Barre de switcher** : ajoutée dans la `.toolbar` existante (à côté du bouton "Imprimer / PDF"), boutons `[Notion] [Claude] [Discord]`, pill/underline sur le style actif.
4. **Audit des couleurs codées en dur** : plusieurs valeurs ne sont pas encore tokenisées (`--pulse:#ff2fae`, `--buscast:#213183`, `box-shadow` de `--shadow-1`, gradient de `.frame.img-fallback`). Il faut les faire dépendre des tokens par design system pour que le switch soit cohérent visuellement (ex. Discord doit pouvoir proposer un glow néon différent d'un simple box-shadow doux Notion).
5. **Typographie par système** : charger les polices Google Fonts nécessaires en plus d'Inter (ex. une serif pour Claude) via `<link>` dans le `<head>`, avec fallback système propre si une police tarde à charger.
6. **Compatibilité avec `REGIONS`** : le système de couleur régionale (`--region-accent`, `--region-deep`, `--region-soft`) doit continuer à fonctionner par-dessus n'importe quel design system choisi — à vérifier visuellement pour éviter les collisions (ex. accent région vs primary du design).
7. **Print** : le mode impression (`@media print`) doit conserver le design actif au moment du clic sur "Imprimer/PDF" (pas de reset forcé vers Notion).
8. **Nettoyage fichiers** : `uptempo-excursion-template (1).html` est un doublon exact de `normandy-in-3-journeys.html` — à supprimer ou à aligner explicitement comme "template vierge" séparé (à trancher avec l'utilisateur, non fait dans ce plan).

## Fichiers concernés

- `normandy-in-3-journeys.html` — seul fichier à modifier (contient CSS + JS inline).

## Vérification

- Ouvrir le fichier directement dans un navigateur (pas de serveur nécessaire).
- Cliquer sur chacun des 3 boutons du switcher : vérifier que couleurs, typo, radius et pills (BusCast/Pulse) changent bien partout (cover, sheets de transit/destination, closing sheet).
- Recharger la page : vérifier que le choix persiste via `localStorage`.
- Réduire la fenêtre à une largeur mobile (~375px) : vérifier que le switcher et les sheets restent utilisables.
- Utiliser l'aperçu d'impression (`window.print()` / Ctrl+P) sur chaque design : vérifier que le style actif est conservé et que la mise en page A4 paysage n'est pas cassée.
