# Publier un site statique sur un mutualisé OVH depuis GitHub Actions

Solution en service depuis le 3 septembre 2026 pour `uptempo.media/guide/`.
**Un `git push` sur `master` publie le site sur OVH**, efface ce qui ne doit
pas y être, vérifie le résultat par HTTP et archive ce qu'il a remplacé.

Ce document est prescriptif : suivre les sections 1 à 5 dans l'ordre suffit à
tout reproduire. L'annexe ne sert qu'à comprendre pourquoi certains choix sont
ce qu'ils sont — elle n'est pas nécessaire pour exécuter.

---

## 1. Ce qu'il faut savoir sur la cible

**L'hôte.** OVH publie deux noms par cluster ; prendre `ssh.clusterNNN`,
pas `ftp.clusterNNN`. Vérifier d'abord :

```bash
ping -c 3 ssh.clusterNNN.hosting.ovh.net
```

**La racine web.** Deux dispositions possibles selon le compte : ou bien il
s'ouvre sur le dossier personnel et la racine web est `www/`, ou bien il est
enfermé dans la racine web, qui contient déjà les sites. Le script détecte
laquelle au moment de se connecter — ne rien coder en dur.

**Le mot de passe FTP** n'est pas récupérable, OVH ne le stocke que haché. Il
se réinitialise : espace client → Hébergements → FTP-SSH → l'utilisateur →
Modifier le mot de passe.

**Ne pas publier depuis le poste de travail.** OVH bannit l'IP source dès la
première authentification refusée, sur tous les ports et durablement. Les
runners GitHub ont des IP propres et changeantes ; c'est la seule raison
d'être de tout ce montage.

---

## 2. Les trois secrets du dépôt

```bash
printf '%s' "ssh.clusterNNN.hosting.ovh.net" | gh secret set OVH_FTP_HOTE        -R OWNER/REPO
printf '%s' "UTILISATEUR"                    | gh secret set OVH_FTP_UTILISATEUR -R OWNER/REPO
printf '%s' "MOT_DE_PASSE"                   | gh secret set OVH_FTP_MOT_DE_PASSE -R OWNER/REPO
```

Aucun fichier du dépôt ne contient de secret : le workflow les lit depuis
`secrets.*`. Le dépôt peut donc être public.

---

## 3. Les trois fichiers

```
.github/workflows/publier.yml   lanceur figé — ne contient aucune logique
deploy/publier-ci.sh            toute la logique
deploy/exclusions.txt           ce qui ne part jamais — source unique
```

**Cette séparation est structurelle, pas cosmétique.** Un jeton OAuth `gh`
sans la portée `workflow` ne peut pas écrire dans `.github/workflows/`. Si la
logique vit dans le YAML, chaque correctif oblige à repasser par l'interface
web de GitHub. En la sortant dans un script, le YAML est écrit une fois et
tout le reste se pousse normalement. **Ne jamais remettre de logique dans le
YAML.**

### 3.1 `.github/workflows/publier.yml`

```yaml
# Publie le site sur OVH à chaque push sur master.
#
# Ce fichier n'est qu'un lanceur : toute la logique est dans
# deploy/publier-ci.sh. C'est volontaire — un jeton OAuth sans la portée
# « workflow » ne peut pas écrire ici, alors qu'il pousse le script sans
# problème. Corriger la publication ne doit jamais obliger à repasser par
# l'interface web de GitHub.

name: Publier sur OVH

on:
  push:
    branches: [master]
  workflow_dispatch:
    inputs:
      essai:
        description: "Essai à blanc : montre ce qui partirait, n'écrit rien"
        type: boolean
        default: false

concurrency:
  group: publication-ovh
  cancel-in-progress: false

jobs:
  publier:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - run: sudo apt-get update -qq && sudo apt-get install -y -qq lftp

      - run: bash deploy/publier-ci.sh
        env:
          OVH_HOTE: ${{ secrets.OVH_FTP_HOTE }}
          OVH_UTILISATEUR: ${{ secrets.OVH_FTP_UTILISATEUR }}
          OVH_MOT_DE_PASSE: ${{ secrets.OVH_FTP_MOT_DE_PASSE }}
          ESSAI: ${{ inputs.essai }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: ancien-site-avant-ecrasement
          path: /tmp/ancien
          retention-days: 30
          if-no-files-found: warn
```

### 3.2 `deploy/publier-ci.sh`

```bash
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
# Les expressions partent dans la ligne de commande de lftp, qui traite « | »
# comme son opérateur de tuyau : sans apostrophes, « (^|/)\.git/ » lui arrive
# coupé en deux et il refuse « (^ » comme expression invalide.
regex() { printf '%s' "${1//./\\.}"; }
EXCL=""
while IFS= read -r motif; do
  [[ -z "$motif" || "$motif" == \#* ]] && continue
  if [[ "$motif" == */ ]]; then          # un dossier, et tout ce qu'il contient
    corps=$(regex "${motif%/}")
    if [[ "$corps" == */* ]]; then       # chemin : ancré sur la racine du site
      EXCL+=" --exclude '^${corps}/'"
    else                                 # simple nom : à n'importe quelle profondeur
      EXCL+=" --exclude '(^|/)${corps}/'"
    fi
  elif [[ "$motif" == \** ]]; then       # *.pdf, *.bak, *~ …
    EXCL+=" --exclude '$(regex "${motif#\*}")\$'"
  else                                   # un nom exact
    EXCL+=" --exclude '(^|/)$(regex "$motif")\$'"
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

# ------------------------------------------------------------------ purge
#
# Une exclusion lftp vaut pour les deux côtés du miroir : un fichier exclu est
# ignoré à distance aussi, donc --delete ne le supprimera jamais. Tout ce qui a
# été publié par erreur avant d'être exclu resterait donc en ligne à vie. On
# efface donc activement ce qui ne doit pas exister, au lieu de se contenter de
# ne pas l'envoyer. Idempotent : rien à faire si rien ne traîne.

say "Purge de ce qui ne doit pas être publié"
PURGE=""
while IFS= read -r motif; do
  [[ -z "$motif" || "$motif" == \#* ]] && continue
  chemin="${motif%/}"
  [[ "$chemin" == *[\*\?]* ]] && continue      # les globs ne désignent pas un chemin
  [[ -z "$chemin" || "$chemin" == .* && ${#chemin} -le 2 ]] && continue
  PURGE+="rm -rf '$CIBLE/$chemin'; "
done < "$EXCLUSIONS"
if [[ -n "$PURGE" ]]; then
  echo "  $PURGE"
  lftp_faire "${PURGE}" >/dev/null 2>&1 || true
fi

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
```

### 3.3 `deploy/exclusions.txt`

```
# Ce qui ne part JAMAIS sur l'hébergement public.
#
# Le dossier du projet pèse 433 Mo, le site en pèse 28. Tout le reste est du
# matériel de travail : dépendances, dépôt Git, archives, brouillons.

.git/
.github/
.gitignore
.claude/
deploy/
node_modules/
docs/
swap/

# Ancienne version React de la Normandie, plus liée depuis aucune page
# (cf. le commentaire en tête de assets/data/excursions-data.js).
catalogue/normandy-in-3-journeys/

# 24 Mo de PDF que plus aucune page ne référence.
*.pdf
*.zip
*.md

.DS_Store
*~
*.bak

# La copie de l'ancien site, faite avant le premier écrasement. deploy/ est déjà
# exclu plus haut ; on le redit ici parce que renvoyer l'ancien site par-dessus
# le nouveau serait la pire erreur possible de ce script.
sauvegarde-ancien-guide/
```

---

## 4. Créer le workflow la première fois

Le tout premier `.github/workflows/publier.yml` ne peut pas être poussé en
ligne de commande, faute de la portée `workflow`. Deux voies.

**Voie terminal** — une fois, puis tout devient poussable :

```bash
gh auth refresh -h github.com -s workflow
```

**Voie navigateur**, si l'on préfère éviter l'authentification en terminal :

1. pousser le contenu du YAML sous `deploy/publier-github.yml` — autorisé
2. l'ouvrir sur github.com, bouton « copier le contenu brut »
3. aller sur `github.com/OWNER/REPO/new/master`, nommer le fichier
   `.github/workflows/publier.yml`, coller, commit

Créer le fichier **depuis la racine du dépôt** : un renommage depuis un fichier
situé dans un sous-dossier garde ce dossier en préfixe, et `../` est refusé.

---

## 5. Mise en service

Le push suivant déclenche tout. Lire le journal du run.

Le premier passage sert de test d'identifiants : s'ils sont faux, il échoue au
listage de la racine, **avant la moindre écriture**.

```bash
gh run list -R OWNER/REPO -L 1
gh run view <ID> -R OWNER/REPO --log-failed
```

Publier sans écrire, pour voir ce qui partirait : onglet Actions → Run workflow
→ cocher **essai**.

---

## 6. Les quatre invariants qui protègent l'hébergement

`mirror -R --delete` efface à distance ce qui n'existe pas localement. Sur un
chemin faux, il viderait l'hébergement entier, qui porte aussi les autres
sites. Le script tient donc quatre garanties — les conserver en cas de
réécriture.

1. **La cible est validée** avant toute écriture : elle doit se terminer par le
   nom du sous-dossier du site et n'être jamais la racine.
2. **L'ancien contenu est sauvegardé** avant d'être écrasé, et remonté en
   artefact conservé 30 jours.
3. **Ce qui ne doit pas être publié est activement effacé**, à chaque passage.
   Une exclusion lftp vaut des deux côtés du miroir : un fichier exclu est
   ignoré à distance aussi, donc `--delete` ne le supprimerait jamais. Sans
   cette purge, tout ce qui a été publié par erreur resterait en ligne à vie.
4. **La vérification finale teste dans les deux sens** : ce qui doit répondre
   200, et ce qui doit répondre 404. C'est le second groupe qui rattrape les
   fuites.

---

## Annexe — pourquoi le script est écrit ainsi

Quatre comportements de lftp, chacun ayant produit un échec réel. Les
connaître évite de « simplifier » le script en le cassant.

**`cls` décore ses sorties.** `cls -1 /` renvoie `/cv/`, pas `cv` : un `/` en
préfixe, un autre en suffixe pour les dossiers. D'où la normalisation par `sed`
avant toute comparaison.

**`--exclude-glob` compare au chemin complet**, pas au nom de fichier. `.git`
ne correspond jamais à `.git/objects/pack/xxx`. D'où la traduction de chaque
motif en expression régulière ancrée.

**`|` est l'opérateur de tuyau de lftp**, y compris dans ses arguments.
`(^|/)\.git/` lui arrive coupé en deux et il rejette `(^` :
`regular expression '(^': Unmatched (`. D'où les apostrophes autour de chaque
expression.

**Sans `net:timeout`, lftp attend indéfiniment** sur un hôte qui accepte la
connexion TCP puis n'envoie rien — exactement ce que fait un bannissement OVH.

Deux détails de plateforme, sans rapport avec lftp :

- Sur un disque monté en `noexec` (NTFS, `fuseblk`), le bit `+x` est décoratif
  et `./script.sh` renvoie `Permission denied`. Lancer `bash script.sh`.
- La sauvegarde de l'ancien site teste le **contenu** du dossier, pas son
  existence : un envoi interrompu laisse un dossier vide, et s'y fier ferait
  sauter la sauvegarde au passage suivant — celui qui écrase.

**Ce qui serait à faire autrement.** L'ancien site a été archivé en artefact
GitHub, donc hors de portée d'un simple lien. Le recopier dans un dossier
voisin — `/old_guide/` — coûte une ligne de plus et le garde consultable.
