# guide — CV en ligne de guide-conférencier (uptempo.media/guide)

Site public d'Albert, guide-conférencier : démarcher les agences (Paris d'abord, Toulouse ensuite).
La branche `occitanie` sert la recherche d'emploi de guide en Occitanie.

> **Ici, commit = enregistrer sur le Pi ; push sur `master` = publier.** Un push sur `master`
> met le site en ligne sur uptempo.media (OVH) : seulement avec l'accord d'Albert.

## Atelier et vitrine
- Le Pi est l'atelier : on travaille ici, sur une branche de travail.
- **Un push sur `master` publie sur OVH** (GitHub Actions, `deploy/publier-ci.sh`) : jamais sans
  l'accord explicite d'Albert. Un simple commit reste local (enregistré sur le Pi) ; c'est le push
  sur `master` qui publie : alors on vérifie la mise en ligne.
- Le Pi ne peut pas publier lui-même (IP bannie par OVH) : seule la CI publie.
- `deploy/exclusions.txt` liste ce qui ne part jamais (dépôt, outils, brouillons, PDF orphelins).

## Règles
- Un style de référence ; des variantes seulement sur demande.
- Fond clair, mobile d'abord. Ne rien inventer (dates, tarifs, références clients).
- Site public : mentions légales obligatoires (page à ajouter, voir la Production).
- Le widget de remarques et l’outil de relecture ne se chargent que sur les hôtes privés/Meshnet via `assets/js/workbench.js`. Sur `uptempo.media`, le script ne demande pas `/boss/remarques-micro.js` et aucun widget ne s’affiche.

## À faire relevé par l'audit (9 oct. 2026)
- Ajouter la page de mentions légales.
- 44 Mo de PDF et d'archives sont suivis par git alors qu'aucune page ne les utilise : les retirer
  du suivi (pas du disque) après accord.
