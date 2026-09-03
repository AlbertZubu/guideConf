# Publier un site statique sur un mutualisé OVH depuis GitHub Actions

Compte rendu de la mise en place réelle du 3 septembre 2026 pour
`uptempo.media/guide/`. Écrit pour être donné tel quel à une IA qui devrait
refaire la même chose, sur ce site ou sur un autre.

Le résultat : **un `git push` sur `master` publie le site sur OVH**, vérifie
le résultat par HTTP, et conserve une copie de ce qu'il a remplacé.

---

## 1. Le contexte, et pourquoi la solution évidente ne marchait pas

Poste de travail : un Raspberry Pi. Hébergement : mutualisé OVH, Apache,
site statique, aucune étape de compilation. L'approche naturelle — un script
`rsync`/`lftp` lancé depuis le poste — a été écrite, puis abandonnée.

**Elle ne peut pas fonctionner depuis ce poste**, pour une raison qui n'a rien
à voir avec le script :

> OVH bannit l'IP source dès la **première** authentification refusée, et le
> bannissement porte sur l'IP entière, pas sur le service.

Le motif s'est reproduit deux fois à l'identique : première connexion depuis
une IP neuve → `Permission denied (publickey,password)` → puis l'hôte devient
totalement muet depuis cette IP, sur **tous** les ports, y compris au ping.

Le Pi sortant par un VPN à IP partagée, cette IP était brûlée dès le premier
essai. D'où le basculement vers **GitHub Actions** : les runners ont des IP
propres et changeantes, et le problème disparaît sans rien négocier.

**Conséquence à retenir : chaque tentative ratée coûte une IP.** Ne pas
« essayer pour voir ». Vérifier les identifiants avant de s'en servir.

---

## 2. Deux pièges OVH à connaître avant de commencer

### 2.1 Le nom d'hôte

OVH publie deux noms pour un même cluster, et ils ne pointent pas au même
endroit :

| nom | IP | état constaté |
|---|---|---|
| `ftp.clusterNNN.hosting.ovh.net` | 5.135.43.84 | **mort** — aucun port, pas même le ping |
| `ssh.clusterNNN.hosting.ovh.net` | 5.135.43.85 | ouvre 21 **et** 22 |

Même compte, même espace disque. **Utiliser `ssh.clusterNNN`.** Vérifier avant
toute chose :

```bash
ping -c 3 ssh.clusterNNN.hosting.ovh.net
```

### 2.2 La racine web

Deux dispositions possibles, impossibles à deviner :

- **A** — le compte s'ouvre sur le dossier personnel : la racine web est `www/`
- **B** — le compte est enfermé dans la racine web, qui contient déjà les sites

Ne pas supposer : **regarder**. Le repère de la disposition B est la présence
immédiate des sites voisins. Coder l'une des deux en dur publie à côté de la
cible une fois sur deux — en disposition B, un chemin `/www/guide` crée un
dossier `www` parasite et le vrai site n'est jamais remplacé.

---

## 3. Architecture retenue, et pourquoi

```
.github/workflows/publier.yml   ← lanceur figé, ~40 lignes, ne change jamais
deploy/publier-ci.sh            ← toute la logique
deploy/exclusions.txt           ← ce qui ne part jamais (source unique)
```

**Cette séparation n'est pas cosmétique.** Un jeton OAuth `gh` sans la portée
`workflow` ne peut pas écrire dans `.github/workflows/` :

```
refusing to allow an OAuth App to create or update workflow
`.github/workflows/publier.yml` without `workflow` scope
```

L'API REST renvoie un `404` trompeur pour la même raison. Si la logique vit
dans le YAML, **chaque correctif oblige à repasser par l'interface web de
GitHub**. En la sortant dans un script, le YAML est écrit une fois et tout le
reste se pousse normalement.

> Si le YAML doit malgré tout changer : le pousser sous un autre nom
> (`deploy/publier-github.yml`), puis recopier son contenu dans
> `.github/workflows/publier.yml` via l'interface web. Le bouton « copier le
> contenu brut » de la vue fichier évite toute saisie.

### Créer le workflow la première fois

Le tout premier `.github/workflows/publier.yml` ne peut pas être poussé.
Le chemin le plus court, entièrement au navigateur :

1. pousser le contenu sous `deploy/publier-github.yml` (autorisé)
2. l'ouvrir sur github.com, bouton « copier le contenu brut »
3. `github.com/OWNER/REPO/new/master` → nom du fichier :
   `.github/workflows/publier.yml` → coller → commit

Deux écueils rencontrés, à éviter :
- **le renommage depuis l'éditeur** garde le dossier d'origine dans le fil
  d'Ariane : taper `.github/workflows/publier.yml` depuis un fichier situé
  dans `deploy/` produit `deploy.github/workflows/…`
- **`../` est refusé** : `That path contains a malformed path component`

D'où la création depuis la racine du dépôt, où aucun dossier n'est imposé.

---

## 4. Les secrets

Trois secrets de dépôt, créés sans jamais afficher le mot de passe :

```bash
printf '%s' "$MOT_DE_PASSE" | gh secret set OVH_FTP_MOT_DE_PASSE -R OWNER/REPO
```

| secret | contenu |
|---|---|
| `OVH_FTP_HOTE` | `ssh.clusterNNN.hosting.ovh.net` |
| `OVH_FTP_UTILISATEUR` | l'utilisateur FTP |
| `OVH_FTP_MOT_DE_PASSE` | son mot de passe |

Le mot de passe FTP n'est **pas récupérable** — OVH ne le stocke que haché. Il
se réinitialise : espace client → Hébergements → FTP-SSH → l'utilisateur →
Modifier le mot de passe.

Aucun fichier du dépôt ne contient de secret : le workflow les lit depuis
`secrets.*`, ce qui reste vrai même sur un dépôt public.

---

## 5. Les quatre pièges lftp

Ce sont eux qui ont coûté le plus de temps. Chacun a produit un échec réel.

### 5.1 `cls` décore ses sorties

`cls -1 /` renvoie `/cv/`, pas `cv` : un `/` en préfixe, un autre en suffixe
pour les dossiers. Une comparaison naïve échoue sur cette seule ponctuation.

```bash
LISTE=$(lftp_faire "cls -1 /" | sed 's#^/##; s#/$##' | grep -v '^$')
```

### 5.2 `--exclude-glob` compare au chemin complet

Pas au nom de fichier. `.git` ne correspond **jamais** à
`.git/objects/pack/xxx`. Couper le `/` final des motifs neutralise donc la
liste entière — c'est ce qui a publié `.git/`, `.github/` et `docs/`.

Traduire chaque motif en expression régulière ancrée :

| motif | expression |
|---|---|
| `docs/` | `(^\|/)docs/` |
| `a/b/` (chemin) | `^a/b/` |
| `*.pdf` | `\.pdf$` |
| `CLAUDE.md` | `(^\|/)CLAUDE\.md$` |

### 5.3 `|` est l'opérateur de tuyau de lftp

Y compris à l'intérieur d'un argument. `(^|/)\.git/` lui arrive coupé en deux
et il rejette `(^` : `regular expression '(^': Unmatched (`.
**Toujours entourer les expressions d'apostrophes** dans la ligne `lftp -e`.

### 5.4 Une exclusion vaut des deux côtés du miroir

Le plus vicieux. Un fichier exclu est ignoré **à distance aussi**, donc
`--delete` ne le supprimera jamais. Tout ce qui a été publié par erreur avant
que l'exclusion ne fonctionne reste en ligne **à vie**.

Il faut donc **effacer activement**, et pas seulement omettre :

```bash
# dérivé de exclusions.txt, préfixé de la cible déjà validée, idempotent
lftp_faire "rm -rf '$CIBLE/.github'; rm -rf '$CIBLE/docs'; …"
```

### 5.5 Bonus : sans `net:timeout`, lftp attend indéfiniment

Sur un hôte qui accepte la connexion TCP puis n'envoie rien — exactement ce que
fait un bannissement OVH — `lftp` se fige sans message.
`set net:timeout 20; set net:max-retries 3` dès la première commande.

---

## 6. Les garde-fous, non négociables

`mirror -R --delete` efface à distance ce qui n'existe pas localement. **Sur un
chemin faux, il vide l'hébergement entier** — qui porte aussi les autres sites.

1. **Valider la cible** avant toute écriture :
   ```bash
   [[ "$CIBLE" == */"$DOSSIER" && "$CIBLE" != "/" ]] || mort "chemin suspect"
   ```
2. **Sauvegarder l'ancien contenu** avant de l'écraser, et le remonter en
   artefact (`retention-days: 30`). Tester le **contenu**, pas l'existence du
   dossier : un envoi interrompu laisse un dossier vide, et s'y fier fait
   sauter la sauvegarde au passage suivant — celui qui écrase.
3. **Vérifier après coup, dans les deux sens** : ce qui doit répondre 200, et
   ce qui doit répondre 404. C'est le second groupe qui a révélé la fuite de
   `.git/` et `.github/` ; sans lui, elle serait passée inaperçue.
4. **`concurrency`** sur le workflow : deux publications simultanées se
   marcheraient dessus.

---

## 7. Ce que je referais autrement

**Déposer l'ancien site sous `/old_guide/` au lieu de le sortir du web.**
L'archiver en artefact GitHub le met hors de portée d'un simple lien ; le
recopier dans un dossier voisin coûte une ligne de plus et garde tout
consultable. Plus simple, plus utile.

---

## 8. Marche à suivre, condensée

```
1. ping ssh.clusterNNN.hosting.ovh.net          → l'hôte répond-il ?
2. gh secret set OVH_FTP_{HOTE,UTILISATEUR,MOT_DE_PASSE}
3. pousser deploy/publier-ci.sh + deploy/exclusions.txt
4. créer .github/workflows/publier.yml au navigateur (§3)
5. le push déclenche tout ; lire le journal du run
```

Le premier passage sert de test d'identifiants : s'ils sont faux, il échoue au
listage de la racine, **avant la moindre écriture**.

## 9. Détail de plateforme

Sur un disque monté en `noexec` (NTFS, `fuseblk`), le bit `+x` est décoratif et
`./script.sh` renvoie `Permission denied`. Lancer `bash script.sh`.
