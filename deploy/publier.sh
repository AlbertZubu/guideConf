#!/usr/bin/env bash
#
# Publication du site UpTempo sur l'hébergement mutualisé OVH.
#
# Cible : le dossier guide/ de la racine web de ftp.cluster030.hosting.ovh.net,
#         soit https://uptempo.media/guide/. L'emplacement exact de cette racine
#         (~/www ou le dossier d'accueil lui-même) est détecté à la connexion.
#
# ATTENTION — cette cible n'est pas vierge : elle contient l'ancienne version du
# site, que ce script REMPLACE (rsync --delete / lftp --delete effacent à
# distance ce qui n'existe pas ici). C'est voulu. Une sauvegarde de l'ancien
# contenu est faite dans deploy/sauvegarde-ancien-guide/ au premier envoi.
#
# Le site n'a aucun chemin absolu (vérifié : pas un seul href="/…" ni src="/…")
# et aucune étape de compilation : il fonctionne tel quel sous n'importe quel
# sous-dossier. Rien à réécrire avant l'envoi.
#
#   ./publier.sh            publie
#   ./publier.sh --essai    montre ce qui partirait, n'envoie rien
#   ./publier.sh --retirer  vide le dossier distant
#
# Deux voies, dans cet ordre :
#   1. rsync sur SSH  — la bonne, si une clé est autorisée sur l'hébergement.
#   2. lftp sur FTPS  — le repli. Le mot de passe est lu dans ~/.netrc
#      (jamais dans ce fichier, jamais dans le dépôt), qui doit être en 0600
#      et vivre sur un disque où chmod a un sens — donc pas sur le NTFS.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXCLUSIONS="$PROJECT_DIR/deploy/exclusions.txt"

# ssh.cluster030, pas ftp.cluster030 : OVH publie deux noms pour ce cluster et
# ils ne pointent pas au même endroit. ftp.cluster030 (5.135.43.84) ne répond ni
# au ping ni sur aucun port depuis ici ; ssh.cluster030 (5.135.43.85) ouvre 21 et
# 22. Les deux servent le même compte et le même espace disque.
HOTE_SSH="${UPTEMPO_SSH:-albertf@ssh.cluster030.hosting.ovh.net}"
HOTE_FTP="ssh.cluster030.hosting.ovh.net"
UTILISATEUR="albertf"
DOSSIER="guide"                   # le sous-dossier du site sous la racine web
DISTANT=""                        # chemin complet — DÉTECTÉ après connexion, voir plus bas.
                                  # Selon le compte, la racine web d'un mutualisé OVH est
                                  # ~/www (vue SSH classique) ou bien la racine elle-même
                                  # (compte FTP enfermé dans www). Supposer l'une des deux
                                  # publiait à côté de la cible une fois sur deux.
URL="https://uptempo.media/guide/"
SAUVEGARDE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/sauvegarde-ancien-guide"

say()  { printf '\033[1;36m›\033[0m %s\n' "$1"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$1"; }
warn() { printf '\033[1;33m!\033[0m %s\n' "$1"; }
mort() { printf '\033[1;31m✗\033[0m %s\n' "$1" >&2; exit 1; }

# ------------------------------------------------------------------ garde-fous
#
# Ce script comporte un --delete. Sur un chemin distant faux, il viderait
# l'hébergement entier — qui porte aussi /guide, /cv, /jewels et le reste.
# Trois vérifications avant toute écriture, dans cet ordre.

[[ -f "$PROJECT_DIR/index.html" ]] \
  || mort "index.html introuvable dans $PROJECT_DIR — mauvais dossier ?"
[[ -f "$EXCLUSIONS" ]] \
  || mort "deploy/exclusions.txt introuvable — refus de publier sans liste d'exclusions."

# ------------------------------------------------------------ choix de la voie

VOIE=""
if timeout 15 ssh -o BatchMode=yes -o ConnectTimeout=10 "$HOTE_SSH" true 2>/dev/null; then
  VOIE="ssh"
  say "Voie : rsync sur SSH ($HOTE_SSH)"
elif command -v lftp >/dev/null 2>&1 && grep -q "$HOTE_FTP" "$HOME/.netrc" 2>/dev/null; then
  VOIE="ftp"
  say "Voie : lftp sur FTPS ($HOTE_FTP), identifiants lus dans ~/.netrc"
else
  echo
  mort "Aucune voie d'accès à l'hébergement OVH.

  Option A — clé SSH (recommandée, permet rsync et donc des envois incrémentaux) :
      ssh-copy-id $HOTE_SSH
    SSH doit être activé pour l'hébergement dans l'espace client OVH
    (Hébergements → FTP-SSH → l'utilisateur → SSH : actif).

  Option B — mot de passe FTP, via ~/.netrc :
      sudo apt install lftp
      printf 'machine %s login %s password VOTRE_MOT_DE_PASSE\\n' \\
        '$HOTE_FTP' '$UTILISATEUR' >> ~/.netrc
      chmod 600 ~/.netrc
    ~/.netrc doit être sur un disque où chmod fonctionne (pas sur le NTFS)."
fi

# ------------------------------------------------- où est la racine web ?
#
# Deux dispositions possibles, et on ne peut pas deviner laquelle sans regarder :
#   A. le compte s'ouvre sur le dossier personnel, la racine web est www/
#   B. le compte est enfermé dans la racine web, qui contient déjà les sites
#
# Repère de la disposition B : les sites voisins (cv/, jewels/) sont visibles
# immédiatement. On exige les deux — un seul dossier pourrait être un homonyme.

if [[ "$VOIE" == "ssh" ]]; then
  if ssh "$HOTE_SSH" 'test -d www' 2>/dev/null; then
    DISTANT="www/$DOSSIER"
    say "Racine web : ~/www (le compte s'ouvre sur le dossier personnel)"
  elif ssh "$HOTE_SSH" 'test -d cv && test -d jewels' 2>/dev/null; then
    DISTANT="$DOSSIER"
    say "Racine web : le dossier d'accueil lui-même (compte enfermé dans www)"
  else
    mort "Racine web introuvable sur $HOTE_SSH : ni www/, ni les sites voisins
  attendus (cv/, jewels/). Refus de publier à l'aveugle. Connectez-vous à la
  main pour voir la disposition :  ssh $HOTE_SSH 'pwd; ls'"
  fi
else
  LISTE="$(lftp -u "$UTILISATEUR," "$HOTE_FTP" \
             -e "set ssl:verify-certificate yes; set net:timeout 20; set net:max-retries 2; set net:reconnect-interval-base 5; cls -1 /; bye" 2>/dev/null || true)"
  [[ -n "$LISTE" ]] || mort "Connexion FTP établie mais la racine est illisible.
  Vérifiez le mot de passe dans ~/.netrc."
  vu() { grep -qx -e "$1" -e "$1/" <<<"$LISTE"; }
  if vu www; then
    DISTANT="/www/$DOSSIER"
    say "Racine web : /www (le compte s'ouvre sur le dossier personnel)"
  elif vu cv && vu jewels; then
    DISTANT="/$DOSSIER"
    say "Racine web : la racine FTP elle-même (compte enfermé dans www)"
  else
    mort "Racine web introuvable en FTP : ni www/, ni les sites voisins attendus
  (cv/, jewels/). Refus de publier à l'aveugle. Contenu vu à la racine :
$(sed 's/^/    /' <<<"$LISTE")"
  fi
fi

# Le garde-fou, maintenant que le chemin existe. Ce script comporte un --delete :
# sur un chemin faux il viderait l'hébergement entier, qui porte aussi /cv,
# /jewels et le reste. Le chemin doit désigner le sous-dossier du site, pas son
# parent.
[[ -n "$DISTANT" && "$DISTANT" != "/" && "${DISTANT##*/}" == "$DOSSIER" ]] \
  || mort "chemin distant suspect : '$DISTANT' — il doit se terminer par /$DOSSIER."

# --------------------------------------------------------------------- retrait

if [[ "${1:-}" == "--retirer" ]]; then
  say "Suppression de $DISTANT"
  if [[ "$VOIE" == "ssh" ]]; then
    ssh "$HOTE_SSH" "rm -rf ~/$DISTANT"
  else
    lftp -e "set ssl:verify-certificate yes; set net:timeout 20; set net:max-retries 2; set net:reconnect-interval-base 5; rm -rf $DISTANT; bye" "$HOTE_FTP"
  fi
  ok "retiré — $URL répondra 404."
  exit 0
fi

ESSAI=0
[[ "${1:-}" == "--essai" ]] && { ESSAI=1; say "ESSAI — rien ne sera écrit à distance"; }

# --------------------------------------------------- sauvegarde de l'ancien site
#
# ~/www/guide contenait un site antérieur. --delete va l'effacer. On en garde
# une copie locale la première fois, une seule : une fois le nouveau site en
# place, relancer ce script sauvegarderait le nouveau par-dessus l'ancien et
# détruirait la seule copie qui restait.

# Le test porte sur le CONTENU, pas sur l'existence du dossier : un envoi
# interrompu peut laisser un dossier vide derrière lui, et se fier à sa seule
# présence ferait sauter la sauvegarde au passage suivant — celui qui écrase.
if [[ -z "$(find "$SAUVEGARDE" -type f 2>/dev/null | head -1)" ]]; then
  say "Première publication : sauvegarde de l'ancien site dans deploy/sauvegarde-ancien-guide/"
  mkdir -p "$SAUVEGARDE"
  if [[ "$VOIE" == "ssh" ]]; then
    rsync -rlpt "$HOTE_SSH:$DISTANT/" "$SAUVEGARDE/" 2>/dev/null || warn "rien à sauvegarder (dossier distant vide ou absent)"
  else
    lftp -u "$UTILISATEUR," "$HOTE_FTP" -e \
      "set ssl:verify-certificate yes; set net:timeout 20; set net:max-retries 2; set net:reconnect-interval-base 5; mirror --parallel=4 '$DISTANT/' '$SAUVEGARDE/'; bye" \
      2>/dev/null || warn "rien à sauvegarder (dossier distant vide ou absent)"
  fi
  NB=$(find "$SAUVEGARDE" -type f 2>/dev/null | wc -l)
  (( NB )) || mort "La sauvegarde de l'ancien site est vide. Refus de publier :
  le --delete qui suit effacerait un site dont il ne reste aucune copie.
  Si ~/$DISTANT est réellement vide à distance, créez un fichier témoin dans
  $SAUVEGARDE pour le confirmer, et relancez."
  ok "ancien site conservé : $NB fichier(s)"
else
  say "Sauvegarde de l'ancien site déjà présente, on n'y touche pas"
fi

# ----------------------------------------------------------------- publication

say "Envoi vers $DISTANT (≈21 Mo utiles ; ~400 Mo exclus)"

if [[ "$VOIE" == "ssh" ]]; then
  ssh "$HOTE_SSH" "mkdir -p ~/$DISTANT"
  # -rlptz sans -a : ni -o/-g (les propriétaires n'ont pas de sens sur du
  # mutualisé) ni -D (aucun fichier spécial dans un site statique).
  OPTS=(-rlptz --delete --human-readable --info=stats1 --exclude-from="$EXCLUSIONS")
  (( ESSAI )) && OPTS+=(--dry-run --itemize-changes)
  rsync "${OPTS[@]}" "$PROJECT_DIR/" "$HOTE_SSH:$DISTANT/"
else
  EXCL=""
  while IFS= read -r motif; do
    [[ -z "$motif" || "$motif" == \#* ]] && continue
    EXCL+=" --exclude-glob ${motif%/}"
  done < "$EXCLUSIONS"
  SEC=""; (( ESSAI )) && SEC="--dry-run"
  lftp -u "$UTILISATEUR," "$HOTE_FTP" -e \
    "set ssl:verify-certificate yes; set net:timeout 20; set net:max-retries 2; set net:reconnect-interval-base 5; set net:max-retries 3; \
     mirror -R --delete --parallel=4 --verbose $SEC $EXCL \
       '$PROJECT_DIR/' '$DISTANT/'; bye"
fi

(( ESSAI )) && { ok "essai terminé, rien n'a été écrit."; exit 0; }

# ---------------------------------------------------------------- vérification

say "Test de bout en bout"
sleep 3
ECHECS=0

# Ce qui doit répondre.
for u in "" "catalogue/" "assets/css/tokens.css" "assets/js/design-switcher.js" \
         "assets/data/excursions-data.js" "catalogue/services.html"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL$u")
  if [[ "$code" == "200" ]]; then ok "200  /$u"
  else warn "$code  /$u — attendu 200"; ECHECS=$((ECHECS+1)); fi
done

# Ce qui ne doit surtout PAS être là.
for u in "node_modules/" ".git/config" "docs/" "swap/" \
         "normandy-3-journeys-1-page-paysage.pdf" "CLAUDE.md" \
         "catalogue/normandy-in-3-journeys/"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL$u")
  if [[ "$code" == "404" || "$code" == "403" ]]; then ok "$code  /$u (absent, attendu)"
  else warn "!! $code sur /$u — ce fichier ne devrait pas être publié"; ECHECS=$((ECHECS+1)); fi
done

echo
if (( ECHECS )); then
  warn "$ECHECS anomalie(s) — voir ci-dessus."
  exit 1
fi
ok "publié : $URL"
