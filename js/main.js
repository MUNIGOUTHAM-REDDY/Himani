/* Himani Sharma, Portfolio interactions */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var progress = document.querySelector(".scroll-progress");
  var wrap = document.getElementById("smooth");

  /* =====================================================
     Momentum smooth scroll (desktop pointer devices only).
     Touch devices keep their native, already-smooth scroll.
     ===================================================== */
  var smooth = fine && !reduced && !!wrap;
  var pos = window.scrollY || 0; // eased scroll position used for transforms

  if (smooth) {
    document.documentElement.classList.add("smooth");

    var setHeight = function () {
      document.body.style.height = wrap.getBoundingClientRect().height + "px";
    };
    setHeight();
    if ("ResizeObserver" in window) new ResizeObserver(setHeight).observe(wrap);
    window.addEventListener("load", setHeight);
    window.addEventListener("resize", setHeight);

    var raf = function () {
      var target = window.scrollY;
      pos += (target - pos) * 0.09;
      if (Math.abs(target - pos) < 0.08) pos = target;
      wrap.style.transform = "translate3d(0," + -pos + "px,0)";
      applyParallax();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /* ---- Anchor links: smooth-scroll to target in both modes ---- */
  function scrollPos() { return smooth ? pos : (window.scrollY || 0); }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      var offset = el.getBoundingClientRect().top + scrollPos() - 58;
      if (offset < 0) offset = 0;
      if (smooth) {
        window.scrollTo(0, offset); // instant native jump; raf eases the visual
      } else {
        window.scrollTo({ top: offset, behavior: reduced ? "auto" : "smooth" });
      }
    });
  });

  /* ---- Parallax on the hero photo ---- */
  var parallaxEl = document.querySelector("[data-parallax]");
  function applyParallax() {
    if (!parallaxEl || reduced) return;
    var p = scrollPos();
    if (p < window.innerHeight) {
      parallaxEl.style.transform = "translateY(" + (p * 0.06) + "px)";
    }
  }

  /* ---- Sticky nav + progress bar ---- */
  function onScroll() {
    var y = window.scrollY || 0;
    nav.classList.toggle("scrolled", y > 20);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? (y / h) * 100 + "%" : "0%";
    if (!smooth) applyParallax();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  function closeMenu() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Count-up stats ---- */
  var stats = document.querySelectorAll(".stat__num");
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduced) { el.textContent = target; return; }
    var start = null, dur = 950;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(p * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var sIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); sIo.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    stats.forEach(function (s) { sIo.observe(s); });
  } else {
    stats.forEach(countUp);
  }

  /* ---- Year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
