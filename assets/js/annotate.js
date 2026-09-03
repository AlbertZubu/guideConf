/* =============================================================
   ANNOTATE — a review pass you run on the page itself.

   Add ?annotate=1 to any URL and a toolbar appears. Tap elements
   to pin numbered notes to them, keep going across the whole
   page, then press Export once: every note comes out as one
   block of text carrying the CSS selector, the element's own
   words and your remark.

   The selector is the point. A screenshot shows a symptom; a
   selector says which element, so the fix needs no guesswork.

   Nothing loads unless the parameter is present, so a visitor
   never sees any of this. Notes survive a reload (sessionStorage)
   and the export names the viewport width and the active design,
   because a complaint at 344px is not the same as at 1440px.
   ============================================================= */
(function () {
  if (new URLSearchParams(location.search).get("annotate") !== "1") return;

  var NOTES = [];
  var STORE = "uptempo-annotate:" + location.pathname;
  var picking = false;

  try { NOTES = JSON.parse(sessionStorage.getItem(STORE)) || []; } catch (e) { NOTES = []; }
  function save() { try { sessionStorage.setItem(STORE, JSON.stringify(NOTES)); } catch (e) {} }

  /* ---- a readable, specific selector for one element --------- */
  var NOISE = /^(reveal|in|is-|has-|active|open|current|js-|an-)/;
  function classesOf(el) {
    if (typeof el.className !== "string") return [];
    return el.className.trim().split(/\s+/).filter(function (c) { return c && !NOISE.test(c); });
  }
  function step(el) {
    var s = el.tagName.toLowerCase();
    var cls = classesOf(el).slice(0, 2);
    if (cls.length) return s + "." + cls.join(".");
    var sameTag = [].filter.call(el.parentNode ? el.parentNode.children : [], function (n) {
      return n.tagName === el.tagName;
    });
    if (sameTag.length > 1) s += ":nth-of-type(" + (sameTag.indexOf(el) + 1) + ")";
    return s;
  }
  function selectorFor(el) {
    if (el.id) return "#" + el.id;
    var parts = [], node = el, depth = 0;
    while (node && node !== document.body && depth < 4) {
      parts.unshift(step(node));
      if (node.id) { parts[0] = "#" + node.id; break; }
      node = node.parentElement; depth++;
    }
    return parts.join(" > ");
  }
  function textOf(el) {
    var t = (el.textContent || "").replace(/\s+/g, " ").trim();
    return t.length > 60 ? t.slice(0, 60) + "…" : t;
  }

  /* ---- chrome ------------------------------------------------ */
  var css = document.createElement("style");
  css.textContent = [
    ".an-bar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483000;",
    "display:flex;gap:6px;align-items:center;padding:7px;border-radius:9999px;",
    "background:#11131a;box-shadow:0 10px 34px rgba(0,0,0,.45);",
    "font:600 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif;max-width:calc(100vw - 20px)}",
    ".an-bar button{font:inherit;border:0;cursor:pointer;white-space:nowrap;padding:10px 14px;",
    "border-radius:9999px;background:#252932;color:#e6e8ef}",
    ".an-bar button:hover{background:#333846}",
    ".an-bar button.on{background:#ff3b6b;color:#fff}",
    ".an-bar button.go{background:#fff;color:#11131a}",
    ".an-count{color:#8b93a5;padding:0 4px;font-weight:700}",
    ".an-pin{position:absolute;z-index:2147482000;min-width:24px;height:24px;padding:0 6px;",
    "border-radius:9999px;background:#ff3b6b;color:#fff;border:2px solid #fff;cursor:pointer;",
    "font:800 12px/20px system-ui,sans-serif;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.4)}",
    ".an-hi{outline:3px solid #ff3b6b !important;outline-offset:1px !important}",
    ".an-sheet{position:fixed;inset:0;z-index:2147483600;background:rgba(8,10,16,.55);",
    "display:flex;align-items:flex-end;justify-content:center;padding:14px}",
    ".an-card{width:100%;max-width:560px;background:#fff;color:#11131a;border-radius:16px;padding:16px;",
    "font:400 14px/1.5 system-ui,-apple-system,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.5)}",
    ".an-card h4{margin:0 0 4px;font:800 12px/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6a7183}",
    ".an-card code{display:block;margin:0 0 10px;font:500 12px/1.45 ui-monospace,Menlo,monospace;",
    "color:#11131a;background:#f1f2f6;border-radius:8px;padding:8px 10px;word-break:break-all}",
    ".an-card textarea{width:100%;box-sizing:border-box;min-height:96px;padding:11px;border-radius:10px;",
    "border:1.5px solid #d3d6de;font:inherit;resize:vertical}",
    ".an-card .an-row{display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap}",
    ".an-card button{font:700 13px/1 system-ui,sans-serif;border:0;cursor:pointer;padding:11px 16px;",
    "border-radius:9999px;background:#eceef3;color:#11131a}",
    ".an-card button.go{background:#11131a;color:#fff}",
    ".an-card button.del{background:#ffe3ea;color:#c30f3c;margin-right:auto}",
    "@media print{.an-bar,.an-pin,.an-sheet{display:none !important}}"
  ].join("");
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "an-bar";
  bar.innerHTML =
    '<button id="anPick">Annoter</button>' +
    '<span class="an-count" id="anCount">0</span>' +
    '<button class="go" id="anExport">Exporter</button>' +
    '<button id="anClear">Vider</button>';
  document.body.appendChild(bar);

  /* the design switcher sits in the same corner — step aside */
  var dbar = document.querySelector(".designbar");
  if (dbar) dbar.style.display = "none";

  var $pick = bar.querySelector("#anPick"),
      $count = bar.querySelector("#anCount"),
      $export = bar.querySelector("#anExport"),
      $clear = bar.querySelector("#anClear");

  function inUI(el) { return !!(el.closest && el.closest(".an-bar,.an-pin,.an-sheet")); }

  /* ---- pins -------------------------------------------------- */
  function drawPins() {
    [].forEach.call(document.querySelectorAll(".an-pin"), function (p) { p.remove(); });
    NOTES.forEach(function (n, i) {
      var el = null;
      try { el = document.querySelector(n.sel); } catch (e) {}
      var pin = document.createElement("button");
      pin.className = "an-pin";
      pin.textContent = String(i + 1);
      pin.title = n.text;
      if (el) {
        var r = el.getBoundingClientRect();
        pin.style.left = (r.left + window.scrollX - 8) + "px";
        pin.style.top = (r.top + window.scrollY - 8) + "px";
      } else {
        pin.style.left = "8px";
        pin.style.top = (80 + i * 30) + "px";
        pin.style.opacity = ".55";
      }
      pin.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation(); openNote(i);
      });
      document.body.appendChild(pin);
    });
    $count.textContent = String(NOTES.length);
  }

  /* ---- note sheet -------------------------------------------- */
  function sheet(inner) {
    var wrap = document.createElement("div");
    wrap.className = "an-sheet";
    wrap.innerHTML = '<div class="an-card">' + inner + "</div>";
    wrap.addEventListener("click", function (e) { if (e.target === wrap) wrap.remove(); });
    document.body.appendChild(wrap);
    return wrap;
  }

  function openNote(i) {
    var n = NOTES[i];
    var w = sheet(
      "<h4>Remarque " + (i + 1) + "</h4>" +
      "<code>" + n.sel.replace(/</g, "&lt;") + "</code>" +
      '<textarea id="anTxt" placeholder="Ce qui ne va pas…"></textarea>' +
      '<div class="an-row"><button class="del" id="anDel">Supprimer</button>' +
      '<button id="anCancel">Annuler</button><button class="go" id="anOk">Enregistrer</button></div>'
    );
    var ta = w.querySelector("#anTxt");
    ta.value = n.note || "";
    ta.focus();
    w.querySelector("#anCancel").onclick = function () { w.remove(); };
    w.querySelector("#anDel").onclick = function () {
      NOTES.splice(i, 1); save(); drawPins(); w.remove();
    };
    w.querySelector("#anOk").onclick = function () {
      n.note = ta.value.trim(); save(); drawPins(); w.remove();
    };
  }

  /* ---- picking ----------------------------------------------- */
  var hovered = null;
  function clearHi() { if (hovered) { hovered.classList.remove("an-hi"); hovered = null; } }

  function onOver(e) {
    if (!picking || inUI(e.target)) return;
    clearHi(); hovered = e.target; hovered.classList.add("an-hi");
  }
  function onPick(e) {
    if (!picking || inUI(e.target)) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    var el = e.target;
    NOTES.push({ sel: selectorFor(el), text: textOf(el), note: "" });
    save(); clearHi(); setPicking(false); drawPins(); openNote(NOTES.length - 1);
  }
  /* capture phase: the site's own overlay links must not fire */
  document.addEventListener("click", onPick, true);
  document.addEventListener("mouseover", onOver, true);

  function setPicking(on) {
    picking = on;
    $pick.classList.toggle("on", on);
    $pick.textContent = on ? "Touchez un élément…" : "Annoter";
    document.documentElement.style.cursor = on ? "crosshair" : "";
    if (!on) clearHi();
  }
  $pick.onclick = function () { setPicking(!picking); };

  /* ---- export ------------------------------------------------ */
  function buildText() {
    var head = "Page : " + location.pathname.split("/").pop() +
      "  —  " + window.innerWidth + " px de large";
    var design = document.documentElement.dataset.design;
    if (design) head += "  —  design : " + design;
    var body = NOTES.map(function (n, i) {
      var l = (i + 1) + ". " + n.sel;
      if (n.text) l += '\n   élément : « ' + n.text + ' »';
      l += "\n   → " + (n.note || "(pas de remarque)");
      return l;
    }).join("\n\n");
    return head + "\n\n" + body + "\n";
  }

  $export.onclick = function () {
    if (!NOTES.length) { alert("Aucune annotation pour l'instant."); return; }
    var txt = buildText();
    var w = sheet(
      "<h4>" + NOTES.length + " annotation" + (NOTES.length > 1 ? "s" : "") + "</h4>" +
      '<textarea id="anOut" readonly style="min-height:190px"></textarea>' +
      '<div class="an-row"><button id="anClose">Fermer</button>' +
      '<button class="go" id="anCopy">Copier</button></div>'
    );
    var ta = w.querySelector("#anOut");
    ta.value = txt;
    w.querySelector("#anClose").onclick = function () { w.remove(); };
    w.querySelector("#anCopy").onclick = function () {
      var btn = w.querySelector("#anCopy");
      /* the site is served over plain HTTP, where navigator.clipboard is
         unavailable — execCommand is the path that actually works there,
         and the selected textarea is the fallback to the fallback. */
      ta.focus(); ta.select(); ta.setSelectionRange(0, txt.length);
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      if (!ok && navigator.clipboard) {
        navigator.clipboard.writeText(txt).then(function () {
          btn.textContent = "Copié";
        }, function () { btn.textContent = "Copiez à la main"; });
        return;
      }
      btn.textContent = ok ? "Copié" : "Copiez à la main";
    };
  };

  $clear.onclick = function () {
    if (!NOTES.length || confirm("Effacer les " + NOTES.length + " annotations ?")) {
      NOTES = []; save(); drawPins();
    }
  };

  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(drawPins, 150); });
  drawPins();
})();
