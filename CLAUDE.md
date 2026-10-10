# guide — CV en ligne de guide-conférencier (uptempo.media/guide)

Site public d'Albert, guide-conférencier : démarcher les agences (Paris d'abord, Toulouse ensuite).
La branche `occitanie` sert la recherche d'emploi de guide en Occitanie.

## Atelier et vitrine
- Le Pi est l'atelier : on travaille ici, sur une branche de travail.
- **Un push sur `master` publie sur OVH** (GitHub Actions, `deploy/publier-ci.sh`) : jamais sans
  l'accord explicite d'Albert. « Commit » veut dire publier et vérifier la mise en ligne.
- Le Pi ne peut pas publier lui-même (IP bannie par OVH) : seule la CI publie.
- `deploy/exclusions.txt` liste ce qui ne part jamais (dépôt, outils, brouillons, PDF orphelins).

## Règles
- Un style de référence ; des variantes seulement sur demande.
- Fond clair, mobile d'abord. Ne rien inventer (dates, tarifs, références clients).
- Site public : mentions légales obligatoires (page à ajouter, voir le Webmaster).

## À faire relevé par l'audit (9 oct. 2026)
- Ajouter la page de mentions légales.
- 44 Mo de PDF et d'archives sont suivis par git alors qu'aucune page ne les utilise : les retirer
  du suivi (pas du disque) après accord.
