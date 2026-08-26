/* John Recendez — site behavior. No dependencies, no build step. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---- Mobile nav ---- */
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    var setOpen = function (open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    navToggle.addEventListener("click", function () {
      setOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    // A resize past the breakpoint leaves the panel stranded open.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 736) setOpen(false);
    });
  }

  /* ---- Header goes solid once scrolled off the top ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Reveal on scroll ----
     The animation is a nicety; the content is not. If IntersectionObserver is
     missing or has not fired by the time the page settles, drop the effect
     rather than risk leaving the page blank. */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    root.classList.add("reveal-off");
  } else {
    var fired = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        fired = true;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(reveals, function (el, i) {
      el.style.transitionDelay = Math.min(i % 5, 4) * 70 + "ms";
      observer.observe(el);
    });

    window.setTimeout(function () {
      if (!fired) root.classList.add("reveal-off");
    }, 1200);
  }

  /* ---- Footer year ---- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
