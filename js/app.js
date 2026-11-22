/* app.js — JS propio (vanilla), sustituye jQuery+Bootstrap+Headroom+Owl. Mantiene el mismo comportamiento visual. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {

    // ---- MODO COLOR (claro/oscuro) ----
    var body = document.body;
    var icon = document.querySelector(".color-mode-icon");
    if (localStorage.getItem("colorMode") === "dark") {
      body.classList.add("dark-mode");
      if (icon) icon.classList.add("active");
    }
    var cm = document.querySelector(".color-mode");
    if (cm) {
      cm.addEventListener("click", function () {
        if (icon) icon.classList.toggle("active");
        body.classList.toggle("dark-mode");
        document.querySelectorAll("p").forEach(function (p) {
          p.style.color = body.classList.contains("dark-mode") ? "white" : "";
        });
        localStorage.setItem("colorMode", body.classList.contains("dark-mode") ? "dark" : "light");
      });
    }

    // ---- MENÚ HAMBURGUESA (sustituye data-toggle=collapse de Bootstrap) ----
    var toggler = document.querySelector(".navbar-toggler");
    var collapse = document.querySelector(".navbar-collapse");
    if (toggler && collapse) {
      toggler.addEventListener("click", function () {
        var open = collapse.classList.toggle("show");
        toggler.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // ---- NAVBAR que se oculta al bajar y aparece al subir (sustituye Headroom) ----
    var navbar = document.querySelector(".navbar");
    if (navbar) {
      var last = 0;
      window.addEventListener("scroll", function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle("headroom--not-top", y > 5);
        if (y > last && y > 80) {
          navbar.classList.add("headroom--unpinned");
          navbar.classList.remove("headroom--pinned");
        } else {
          navbar.classList.add("headroom--pinned");
          navbar.classList.remove("headroom--unpinned");
        }
        last = y;
      }, { passive: true });
    }

    // ---- SMOOTHSCROLL de enlaces internos ----
    document.querySelectorAll('.nav-link, .custom-btn-link').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href") || "";
        if (href.charAt(0) !== "#") return;
        var t = document.querySelector(href);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 49, behavior: "smooth" });
        if (collapse) { collapse.classList.remove("show"); }
      });
    });

    // ---- TOOLTIPS (title nativo basta; mantenemos accesibilidad con aria-label ya puesto) ----

    // ---- CARRUSEL simple (sustituye Owl) ----
    document.querySelectorAll(".owl-carousel").forEach(function (car) {
      var items = Array.prototype.slice.call(car.children);
      if (!items.length) return;
      car.classList.add("c-carousel");
      var i = 0;
      function show(n) {
        i = (n + items.length) % items.length;
        items.forEach(function (it, k) { it.style.display = k === i ? "block" : "none"; });
        dots.forEach(function (d, k) { d.classList.toggle("active", k === i); });
      }
      // flechas
      var prev = document.createElement("button");
      prev.className = "c-nav c-prev"; prev.setAttribute("aria-label", "Proyecto anterior"); prev.innerHTML = "\u2039";
      var next = document.createElement("button");
      next.className = "c-nav c-next"; next.setAttribute("aria-label", "Proyecto siguiente"); next.innerHTML = "\u203a";
      prev.addEventListener("click", function () { show(i - 1); });
      next.addEventListener("click", function () { show(i + 1); });
      car.appendChild(prev); car.appendChild(next);
      // puntos
      var dotsWrap = document.createElement("div"); dotsWrap.className = "c-dots";
      var dots = items.map(function (_, k) {
        var b = document.createElement("button"); b.className = "c-dot"; b.setAttribute("aria-label", "Ir al proyecto " + (k + 1));
        b.addEventListener("click", function () { show(k); });
        dotsWrap.appendChild(b); return b;
      });
      car.appendChild(dotsWrap);
      show(0);
      setInterval(function () { show(i + 1); }, 6000);
    });

  });
})();
