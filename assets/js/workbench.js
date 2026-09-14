/* =============================================================
   WORKBENCH — ce qui n'existe que sur le poste de travail.

   Le Raspberry est l'atelier, le push est la publication. Cette
   règle est appliquée ici, à un seul endroit : ce script teste
   l'adresse servie, et ne charge l'outil d'annotation que sur une
   machine locale. Sur uptempo.media il ne fait rien, en silence.

   Il charge annotate.js, la passe de relecture. Le fichier est
   versionné : la garde tient à l'hôte, pas à l'absence du fichier.
   Rien à retirer avant de pousser, donc rien à oublier de retirer
   — c'est tout l'intérêt.

   Cinq directions de design ont été essayées ici via une seconde
   barre (design-lab.js) et retirées à la demande de l'utilisateur,
   qui préfère garder Magazine comme style unique. Le mécanisme
   reste valable si l'idée revient : c'était ce même fichier qui
   portait la garde d'hôte pour les deux outils.

   Il n'y a plus de paramètre ?annotate=1. C'était une bascule
   qu'il fallait propager à la main dans chaque lien et chaque
   iframe, et qui se perdait en route — notamment vers la modale
   des fiches, qui fixe son src après coup. Chaque page décide
   maintenant pour elle-même, y compris à l'intérieur d'une
   iframe : plus rien à propager, donc plus rien à perdre.

   Les chemins sont résolus depuis l'URL de ce script, pour que le
   même fichier marche depuis / comme depuis /catalogue/.
   ============================================================= */
(function () {
  var self = document.currentScript ||
    (function () { var s = document.getElementsByTagName("script"); return s[s.length - 1]; })();
  var BASE = self.src.replace(/assets\/js\/workbench\.js.*$/, "");

  /* Vrai sur l'atelier, faux partout ailleurs. Couvre le fichier ouvert
     directement, la boucle locale, les quatre plages privées (le Pi vu
     depuis un autre appareil du réseau ou via un VPN maillé type
     Tailscale/NordVPN Meshnet, qui vivent en 100.64.0.0/10 — le CGNAT
     partagé, pas une IP publique), les noms mDNS en .local et les noms
     d'hôte nus type « raspberrypi ». Un domaine public a toujours un
     point et n'entre dans aucun de ces cas. */
  function isWorkbench() {
    if (location.protocol === "file:") return true;
    var h = location.hostname;
    if (!h) return true;
    if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]") return true;
    if (/\.local$/i.test(h)) return true;
    if (h.indexOf(".") === -1) return true;
    /* Les plages privées ne valent que pour une vraie IPv4 : sans cette
       vérification, un domaine comme « 10.example.com » passerait pour
       une adresse du réseau local. */
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h)) return false;
    if (/^10\./.test(h)) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(h)) return true;
    if (/^100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\./.test(h)) return true;
    return false;
  }

  if (!isWorkbench()) return;

  /* annotate.js vérifie ce drapeau avant de s'installer : la garde d'hôte
     reste écrite une seule fois, ici, et un chargement accidentel du script
     par un autre chemin ne réveillerait pas l'outil sur le site public. */
  window.UPTEMPO_WORKBENCH = true;

  var s = document.createElement("script");
  s.src = BASE + "assets/js/annotate.js";
  s.defer = true;
  document.head.appendChild(s);
})();
