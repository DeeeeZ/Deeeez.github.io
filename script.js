(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav border on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var revealed = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealed.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealed.forEach(function (el) { io.observe(el); });
  }

  /* ---------- hero recon panel (decorative sample run) ---------- */
  /* One row per scene carries a real problem: the engine's job is
     catching what's wrong, not just ticking what's right. The panel
     rotates through two sample runs so it reads as an instrument,
     not a looping GIF. Row: [id, expected, actual, kind, flagText] */
  var reconRows = document.getElementById("recon-rows");
  if (reconRows) {
    var SCENES = [
      {
        title: "Settlement recon · sample",
        unit: "matched",
        matchText: "matched ✓",
        flagNote: "1 exception flagged",
        cause: "ORD-83121 · gateway fee held at source",
        rows: [
          ["ORD-83112", "1,240.50", "1,240.50", "match"],
          ["ORD-83113", "312.00", "312.00", "match"],
          ["ORD-83117", "5,880.25", "5,880.25", "match"],
          ["ORD-83121", "94.75", "94.25", "flag", "Δ 0.50"],
          ["ORD-83126", "2,406.10", "2,406.10", "match"],
          ["ORD-83130", "770.00", "770.00", "match"]
        ]
      },
      {
        title: "Statement completeness · sample",
        unit: "complete",
        matchText: "complete ✓",
        flagNote: "1 gap flagged",
        cause: "AC-2216 · portal export truncated",
        rows: [
          ["AC-2201", "112 ln", "112 ln", "match"],
          ["AC-2207", "96 ln", "96 ln", "match"],
          ["AC-2213", "58 ln", "58 ln", "match"],
          ["AC-2216", "141 ln", "137 ln", "flag", "4 missing"],
          ["AC-2222", "73 ln", "73 ln", "match"],
          ["AC-2230", "210 ln", "210 ln", "match"]
        ]
      },
      {
        title: "Intercompany recon · sample",
        unit: "matched",
        matchText: "matched ✓",
        flagNote: "1 exception flagged",
        cause: "JO03·KW01 · FX rounding on posting",
        rows: [
          ["AE01·SA02", "18,420.00", "18,420.00", "match"],
          ["AE01·QA04", "2,155.75", "2,155.75", "match"],
          ["JO03·KW01", "9,114.20", "9,113.90", "flag", "Δ 0.30"],
          ["SA02·BH02", "640.00", "640.00", "match"],
          ["QA04·JO03", "31,002.60", "31,002.60", "match"],
          ["KW01·AE01", "4,780.15", "4,780.15", "match"]
        ]
      }
    ];
    var countEl = document.getElementById("recon-count");
    var statusEl = document.getElementById("recon-status");
    var titleEl = document.getElementById("recon-title");
    var noteEl = document.getElementById("recon-note");
    var sceneIdx = 0;
    var scene = SCENES[0];
    var els = scene.rows.map(function () {
      var div = document.createElement("div");
      div.className = "recon-row";
      div.innerHTML = '<span class="rid"></span>' +
        '<span class="amt"></span>' +
        '<span class="amt"></span>' +
        '<span class="st">pending</span>';
      reconRows.appendChild(div);
      return div;
    });

    function loadScene(s) {
      if (titleEl) titleEl.textContent = s.title;
      els.forEach(function (el, idx) {
        var r = s.rows[idx];
        el.classList.remove("matched", "flagged", "scan");
        el.querySelector(".rid").textContent = r[0];
        var amts = el.querySelectorAll(".amt");
        amts[0].textContent = r[1];
        amts[1].textContent = r[2];
        el.querySelector(".st").textContent = "pending";
      });
      if (noteEl) {
        noteEl.classList.remove("show");
        noteEl.textContent = "";
      }
    }
    function resolveRow(idx) {
      var el = els[idx];
      var r = scene.rows[idx];
      var flagged = r[3] === "flag";
      el.classList.remove("scan");
      el.classList.add(flagged ? "flagged" : "matched");
      el.querySelector(".st").textContent = flagged ? r[4] : scene.matchText;
      if (flagged && noteEl) {
        noteEl.textContent = "└ " + scene.cause;
        noteEl.classList.add("show");
      }
    }
    function finish() {
      countEl.textContent = "5 / 6 " + scene.unit;
      statusEl.textContent = scene.flagNote;
      statusEl.className = "flag";
    }

    loadScene(scene);
    if (reducedMotion) {
      els.forEach(function (el, idx) { resolveRow(idx); });
      finish();
    } else {
      var reconVisible = true;
      if ("IntersectionObserver" in window) {
        reconVisible = false;
        new IntersectionObserver(function (entries) {
          reconVisible = entries[0].isIntersecting;
        }).observe(reconRows);
      }
      var i = 0;
      var matched = 0;
      els[0].classList.add("scan");
      setInterval(function () {
        if (!reconVisible || document.hidden) return;
        if (i < els.length) {
          resolveRow(i);
          if (i + 1 < els.length) els[i + 1].classList.add("scan");
          if (scene.rows[i][3] === "match") matched++;
          i++;
          countEl.textContent = matched + " / 6 " + scene.unit;
          if (i === els.length) finish();
        } else if (i < els.length + 4) {
          i++; /* hold the finished state a few beats */
        } else {
          sceneIdx = (sceneIdx + 1) % SCENES.length;
          scene = SCENES[sceneIdx];
          loadScene(scene);
          els[0].classList.add("scan");
          i = 0;
          matched = 0;
          countEl.textContent = "0 / 6 " + scene.unit;
          statusEl.textContent = "running";
          statusEl.className = "ok";
        }
      }, 850);
    }
  }

  /* ---------- ledger spine: posting marks fill as sections are read ---------- */
  var kickers = document.querySelectorAll("main .kicker");
  if (!reducedMotion && "IntersectionObserver" in window) {
    var kio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("posted");
          kio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    kickers.forEach(function (el) { kio.observe(el); });
  } else {
    kickers.forEach(function (el) { el.classList.add("posted"); });
  }

  /* ---------- nav scrollspy ---------- */
  var spySections = document.querySelectorAll("main section[id]");
  var spyLinks = document.querySelectorAll(".nav-links a[href^='#']:not(.btn)");
  var rails = document.querySelectorAll(".rail");
  var spyTicking = false;
  function fillRails() {
    /* the spine rules itself in behind the reader, band by band */
    var probe = window.innerHeight * 0.8;
    rails.forEach(function (r) {
      var rect = r.getBoundingClientRect();
      var p = Math.min(Math.max((probe - rect.top) / rect.height, 0), 1);
      r.style.setProperty("--fill", p.toFixed(3));
    });
  }
  function spy() {
    spyTicking = false;
    if (!reducedMotion) fillRails();
    var current = "";
    var probe = window.scrollY + window.innerHeight * 0.35;
    spySections.forEach(function (sec) {
      if (sec.offsetTop <= probe) current = sec.id;
    });
    spyLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", function () {
    if (!spyTicking) {
      spyTicking = true;
      requestAnimationFrame(spy);
    }
  }, { passive: true });
  spy();

  /* ---------- proof numerals count-up ---------- */
  function fmt(n, decimals) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  var counters = document.querySelectorAll("[data-count]");
  if (!reducedMotion && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cio.unobserve(entry.target);
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        var start = null;
        var dur = 1100;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * eased, decimals);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- cost calculator ---------- */
  var fields = [
    { slider: "calc-people", num: "calc-people-num", min: 1, max: 20 },
    { slider: "calc-hours", num: "calc-hours-num", min: 1, max: 20 },
    { slider: "calc-rate", num: "calc-rate-num", min: 10, max: 100 }
  ];
  var outHours = document.getElementById("calc-out-hours");
  var outCost = document.getElementById("calc-out-cost");

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function recalc() {
    var people = parseFloat(document.getElementById("calc-people").value);
    var hours = parseFloat(document.getElementById("calc-hours").value);
    var rate = parseFloat(document.getElementById("calc-rate").value);
    var annualHours = people * hours * 52;
    var annualCost = annualHours * rate;
    outHours.innerHTML = fmt(annualHours, 0) + ' <span class="unit">hrs</span>';
    outCost.textContent = "$" + fmt(annualCost, 0);
  }

  fields.forEach(function (f) {
    var slider = document.getElementById(f.slider);
    var num = document.getElementById(f.num);
    slider.addEventListener("input", function () {
      num.value = slider.value;
      recalc();
    });
    num.addEventListener("input", function () {
      var v = num.valueAsNumber;
      if (isNaN(v)) return;
      slider.value = clamp(v, f.min, f.max);
      recalc();
    });
    num.addEventListener("change", function () {
      var v = num.valueAsNumber;
      if (isNaN(v)) v = parseFloat(slider.value);
      num.value = clamp(v, f.min, f.max);
      slider.value = num.value;
      recalc();
    });
  });
  if (outHours && outCost) recalc();

  /* ---------- form pending state ---------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("[data-submit]");
      if (btn) {
        btn.textContent = "Sending…";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";
      }
    });
  }
})();
