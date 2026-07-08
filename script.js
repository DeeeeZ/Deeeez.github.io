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
  var reconRows = document.getElementById("recon-rows");
  if (reconRows) {
    var ROWS = [
      ["ORD-83112", "1,240.50", "1,240.50"],
      ["ORD-83113", "312.00", "312.00"],
      ["ORD-83117", "5,880.25", "5,880.25"],
      ["ORD-83121", "94.75", "94.75"],
      ["ORD-83126", "2,406.10", "2,406.10"],
      ["ORD-83130", "770.00", "770.00"]
    ];
    var countEl = document.getElementById("recon-count");
    var statusEl = document.getElementById("recon-status");
    var els = ROWS.map(function (r) {
      var div = document.createElement("div");
      div.className = "recon-row";
      div.innerHTML = '<span class="rid">' + r[0] + '</span>' +
        '<span class="amt">' + r[1] + '</span>' +
        '<span class="amt">' + r[2] + '</span>' +
        '<span class="st">pending</span>';
      reconRows.appendChild(div);
      return div;
    });

    function setMatched(el, on) {
      el.classList.toggle("matched", on);
      el.querySelector(".st").textContent = on ? "matched ✓" : "pending";
    }

    if (reducedMotion) {
      els.forEach(function (el) { setMatched(el, true); });
      countEl.textContent = "6 / 6 matched";
      statusEl.textContent = "tied to the cent";
    } else {
      var i = 0;
      setInterval(function () {
        if (i < els.length) {
          setMatched(els[i], true);
          i++;
          countEl.textContent = i + " / 6 matched";
          if (i === els.length) statusEl.textContent = "tied to the cent";
        } else if (i < els.length + 3) {
          i++; /* hold the finished state a few beats */
        } else {
          els.forEach(function (el) { setMatched(el, false); });
          i = 0;
          countEl.textContent = "0 / 6 matched";
          statusEl.textContent = "running";
        }
      }, 850);
    }
  }

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
})();
