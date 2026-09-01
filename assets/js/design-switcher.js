/* =============================================================
   DESIGN SWITCHER — the floating bar that swaps the whole site
   between design systems.

   A theme is only a set of token overrides (assets/css/themes/*.css)
   layered on top of assets/css/tokens.css, so switching never
   reloads the page: we swap one <link> and the cascade does the rest.

   The choice is remembered in localStorage and mirrored in the URL
   (?style=), so it survives navigation, deep links and the fiche
   modal's iframe. Every internal link is rewritten on the fly to
   carry the current theme.

   Paths are resolved from this script's own src, so the same file
   works from / and from /catalogue/.
   ============================================================= */
(function () {
  var THEMES = [
    { key: "reference", label: "Référence" },
    { key: "editorial", label: "Éditorial",
      font: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" },
    { key: "magazine",  label: "Magazine",
      font: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap" }
  ];
  var KEYS = THEMES.map(function (t) { return t.key; });
  var STORE = "uptempo-design";

  /* Site root, derived from this script's URL. */
  var self = document.currentScript ||
    (function () { var s = document.getElementsByTagName("script"); return s[s.length - 1]; })();
  var BASE = self.src.replace(/assets\/js\/design-switcher\.js.*$/, "");

  function read() {
    var asked = new URLSearchParams(location.search).get("style");
    if (asked && KEYS.indexOf(asked) !== -1) return asked;
    try {
      var kept = localStorage.getItem(STORE);
      if (kept && KEYS.indexOf(kept) !== -1) return kept;
    } catch (e) { /* private mode: fall through to the reference */ }
    return "reference";
  }

  var current = read();

  /* ---- apply ------------------------------------------------ */
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "design-theme";
  document.head.appendChild(link);

  /* Themes that need a face the pages don't already load get it here,
     as a link rather than an @import so it never blocks the stylesheet. */
  var font = document.createElement("link");
  font.rel = "stylesheet";
  font.id = "design-font";
  document.head.appendChild(font);

  function apply(key) {
    current = key;
    if (key === "reference") link.removeAttribute("href");
    else link.href = BASE + "assets/css/themes/" + key + ".css";
    var def = THEMES.filter(function (t) { return t.key === key; })[0];
    if (def && def.font) font.href = def.font; else font.removeAttribute("href");
    document.documentElement.dataset.design = key;
    try { localStorage.setItem(STORE, key); } catch (e) {}
    var url = new URL(location.href);
    if (key === "reference") url.searchParams.delete("style");
    else url.searchParams.set("style", key);
    history.replaceState(null, "", url);
    paint();
    retarget();
  }

  /* ---- carry the theme across navigation -------------------- */
  function retarget() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!h || h.charAt(0) === "#" || /^(https?:|mailto:|tel:|javascript:)/i.test(h)) return;
      try {
        var u = new URL(h, location.href);
        if (u.origin !== location.origin) return;
        if (current === "reference") u.searchParams.delete("style");
        else u.searchParams.set("style", current);
        a.setAttribute("href", u.pathname + u.search + u.hash);
      } catch (e) {}
    });
    /* the fiche modal loads a page in an iframe — keep it in theme */
    document.querySelectorAll("iframe[src]").forEach(function (f) {
      var s = f.getAttribute("src");
      if (!s || s === "about:blank") return;
      try {
        var u = new URL(s, location.href);
        if (current === "reference") u.searchParams.delete("style");
        else u.searchParams.set("style", current);
        var next = u.pathname + u.search + u.hash;
        if (next !== s) f.setAttribute("src", next);
      } catch (e) {}
    });
  }

  /* ---- the bar ---------------------------------------------- */
  var bar, label;
  function paint() {
    if (!bar) return;
    bar.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("is-on", b.dataset.key === current);
      b.setAttribute("aria-pressed", b.dataset.key === current ? "true" : "false");
    });
  }

  function build() {
    var css = document.createElement("style");
    css.textContent =
      ".designbar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9998;" +
      "display:flex;gap:3px;padding:5px;max-width:calc(100vw - 24px);overflow-x:auto;" +
      "background:rgba(18,18,20,.9);border-radius:9999px;backdrop-filter:blur(8px);" +
      "-webkit-backdrop-filter:blur(8px);box-shadow:0 10px 30px rgba(0,0,0,.3);" +
      "scrollbar-width:none;}" +
      ".designbar::-webkit-scrollbar{display:none}" +
      ".designbar button{flex:none;font:600 11.5px/1 'Inter',Helvetica,Arial,sans-serif;" +
      "color:#b9bcc4;background:none;border:0;cursor:pointer;white-space:nowrap;" +
      "padding:8px 13px;border-radius:9999px;transition:color .15s ease,background .15s ease;}" +
      ".designbar button:hover{color:#fff}" +
      ".designbar button.is-on{background:#fff;color:#15161a}" +
      ".designbar__tag{flex:none;align-self:center;padding:0 9px 0 6px;font:700 9.5px/1 'Inter',sans-serif;" +
      "letter-spacing:.12em;text-transform:uppercase;color:#6f7482;}" +
      "@media print{.designbar{display:none}}" +
      "@media (max-width:600px){.designbar{bottom:8px;padding:4px}" +
      ".designbar button{padding:7px 10px;font-size:11px}.designbar__tag{display:none}}";
    document.head.appendChild(css);

    bar = document.createElement("nav");
    bar.className = "designbar";
    bar.setAttribute("aria-label", "Design");
    var tag = document.createElement("span");
    tag.className = "designbar__tag";
    tag.textContent = "Design";
    bar.appendChild(tag);
    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.key = t.key;
      b.textContent = t.label;
      b.addEventListener("click", function () { apply(t.key); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
    paint();
  }

  /* Inside the fiche modal's iframe the bar would be duplicated —
     the parent page already shows one, so only the top frame gets it. */
  function start() {
    if (window.top === window.self) build();
    apply(current);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else { start(); }
})();
