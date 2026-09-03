#!/usr/bin/env bash
#
# Publie le site sur l'hébergement mutualisé OVH depuis un runner GitHub.
#
# Toute la logique vit ici et non dans .github/workflows/publier.yml, qui n'est
# qu'un lanceur : un jeton OAuth sans la portée « workflow » ne peut pas écrire
# dans .github/workflows/, alors que ce fichier-ci se pousse comme n'importe
# quel autre. Corriger la publication ne doit jamais demander de passer par
# l'interface web.
#
# Attendus dans l'environnement : OVH_HOTE, OVH_UTILISATEUR, OVH_MOT_DE_PASSE.
# ESSAI=true montre ce qui partirait sans rien écrire.

set -euo pipefail

DOSSIER="guide"
URL="https://uptempo.media/$DOSSIER/"
ANCIEN="/tmp/ancien"
EXCLUSIONS="deploy/exclusions.txt"
LFTP_BASE="set ssl:verify-certificate yes; set net:timeout 20; set net:max-retries 3"

say() { printf '\n\033[1;36m› %s\033[0m\n' "$1"; }
mort() { echo "::error::$1"; exit 1; }

umask 077
printf 'machine %s login %s password %s\n' \
  "$OVH_HOTE" "$OVH_UTILISATEUR" "$OVH_MOT_DE_PASSE" > ~/.netrc

lftp_faire() { lftp -e "$LFTP_BASE; $1; bye" "$OVH_HOTE"; }

# ------------------------------------------------------------- racine web
#
# Deux dispositions possibles chez OVH : le compte s'ouvre sur le dossier
# personnel (la racine web est alors www/), ou il est enfermé dans la racine
# web, qui contient déjà les sites. On regarde plutôt que de deviner.
#
# lftp préfixe chaque entrée d'un « / » et suffixe les dossiers d'un autre :
# la racine sort en « /cv/ », pas en « cv ». On normalise avant de comparer,
# sans quoi la comparaison échoue sur cette seule ponctuation.

say "Racine web"
LISTE=$(lftp_faire "cls -1 /" | sed 's#^/##; s#/$##' | grep -v '^$' || true)
[[ -n "$LISTE" ]] || mort "Racine illisible — identifiants ou hôte incorrects."
printf '    %s\n' $LISTE

vu() { grep -qx "$1" <<<"$LISTE"; }
if vu www; then
  CIBLE="/www/$DOSSIER"
  echo "  → /www (le compte s'ouvre sur le dossier personnel)"
elif vu cv && vu jewels; then
  CIBLE="/$DOSSIER"
  echo "  → la racine elle-même (compte enfermé dans www)"
else
  mort "Racine web introuvable : ni www/, ni les sites voisins attendus (cv, jewels)."
fi

# mirror -R --delete efface à distance ce qui n'existe pas ici. Sur un chemin
# faux il viderait l'hébergement entier, qui porte aussi /cv, /jewels et le
# reste : le chemin doit désigner le sous-dossier du site, jamais son parent.
[[ "$CIBLE" == */"$DOSSIER" && "$CIBLE" != "/" ]] \
  || mort "Chemin distant suspect : $CIBLE"
echo "  cible : $CIBLE"

# ------------------------------------------------------------- sauvegarde
#
# --delete va effacer l'ancien site. On en garde une copie, remontée en
# artefact par le workflow et conservée 30 jours.

say "Sauvegarde de l'ancien site"
mkdir -p "$ANCIEN"
lftp_faire "mirror --parallel=4 '$CIBLE/' '$ANCIEN/'" || true
NB=$(find "$ANCIEN" -type f | wc -l)
echo "  $NB fichier(s) sauvegardés"
(( NB )) || echo "::warning::Sauvegarde vide — $CIBLE était-il déjà vide ?"

# ------------------------------------------------------------- publication

say "Envoi"
# --exclude-glob compare le motif au chemin COMPLET, pas au nom de fichier :
# « .git » ne correspond donc jamais à « .git/objects/pack/xxx », et couper le
# « / » final des motifs revenait à n'exclure rien du tout. On traduit chaque
# motif en expression régulière ancrée, ce que lftp compare bien au chemin
# relatif de chaque entrée.
regex() { printf '%s' "${1//./\\.}"; }
EXCL=""
while IFS= read -r motif; do
  [[ -z "$motif" || "$motif" == \#* ]] && continue
  if [[ "$motif" == */ ]]; then          # un dossier, et tout ce qu'il contient
    corps=$(regex "${motif%/}")
    if [[ "$corps" == */* ]]; then       # chemin : ancré sur la racine du site
      EXCL+=" --exclude ^${corps}/"
    else                                 # simple nom : à n'importe quelle profondeur
      EXCL+=" --exclude (^|/)${corps}/"
    fi
  elif [[ "$motif" == \** ]]; then       # *.pdf, *.bak, *~ …
    EXCL+=" --exclude $(regex "${motif#\*}")\$"
  else                                   # un nom exact
    EXCL+=" --exclude (^|/)$(regex "$motif")\$"
  fi
done < "$EXCLUSIONS"
echo "  exclusions :$EXCL"

SEC=""
if [[ "${ESSAI:-false}" == "true" ]]; then
  SEC="--dry-run"
  echo "  ESSAI — rien ne sera écrit"
fi

lftp_faire "mirror -R --delete --parallel=4 --verbose $SEC $EXCL ./ '$CIBLE/'"

[[ -z "$SEC" ]] || { echo "  essai terminé"; exit 0; }

# ------------------------------------------------------------ vérification

say "Tests"
sleep 5
ECHECS=0

# Ce qui doit répondre.
for u in "" catalogue/ assets/css/tokens.css assets/js/design-switcher.js \
         assets/data/excursions-data.js catalogue/services.html; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL$u")
  if [[ "$code" == 200 ]]; then echo "  200  /$u"
  else echo "::warning::$code sur /$u — attendu 200"; ECHECS=$((ECHECS+1)); fi
done

# Ce qui ne doit surtout pas être là.
for u in node_modules/ .git/config .github/workflows/publier.yml docs/ swap/ \
         CLAUDE.md normandy-3-journeys-1-page-paysage.pdf \
         catalogue/normandy-in-3-journeys/; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL$u")
  if [[ "$code" == 404 || "$code" == 403 ]]; then echo "  $code  /$u (absent, attendu)"
  else echo "::error::$code sur /$u — ce fichier ne devrait pas être publié"; ECHECS=$((ECHECS+1)); fi
done

(( ECHECS == 0 )) || mort "$ECHECS anomalie(s)"
echo
echo "  Publié : $URL"
