# Version Occitanie du site

Pages générées : `index.html`, `services.html`, `services-full-days.html`,
`services-visits.html`, `services-workshops.html`. **Ne pas les modifier à la main.**
Elles sont produites depuis les pages du site principal par :

```bash
cd /media/NAS-Partage/CLAUDE/guide && node occitanie/generer.mjs
```

Le script adapte les chemins et applique les corrections du plan de prospection
(Pro1, onglet Brochure) : destinations hors de Toulouse (Carcassonne, Albi,
Cordes-sur-Ciel, Moissac), journées en français ou en anglais, Classic et Intrepid
au départ de Toulouse, disponibilité « toute l'année, réservez tôt pour avril-juin et
septembre-octobre ». Chaque remplacement doit trouver exactement le passage attendu :
si le site principal change à cet endroit, le script s'arrête et le dit.

Relancer le script après toute modification du site principal.

Local : http://100.96.55.59/guide/occitanie/ — publié (après un push sur master) :
https://uptempo.media/guide/occitanie/

Le catalogue des excursions de plusieurs jours (`../catalogue/`) reste commun aux deux
versions.
