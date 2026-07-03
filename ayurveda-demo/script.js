/* Ojas Ayurveda landing — vanilla JS interactions (no checkout). */
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Toast helper -------------------------------------------------
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }

  // ---- Selected pack (drives the "order" message) -------------------
  var selectedPack = "120";
  var packs = document.querySelectorAll(".pack");
  packs.forEach(function (p) {
    p.addEventListener("click", function () {
      packs.forEach(function (x) { x.classList.remove("active"); });
      p.classList.add("active");
      selectedPack = p.getAttribute("data-pack");
    });
  });

  // ---- "Order / Add to cart" buttons — demo only, no checkout -------
  document.querySelectorAll("[data-buy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showToast("🌿 Demo store — checkout is disabled. (You selected the " + selectedPack + "-tablet pack.)");
    });
  });

  // ---- Generic toast buttons (e.g. video) ---------------------------
  document.querySelectorAll("[data-toast]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showToast(btn.getAttribute("data-toast"));
    });
  });

  // ---- Smooth scroll buttons ----------------------------------------
  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-scroll"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- FAQ accordion ------------------------------------------------
  document.querySelectorAll(".q button").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.parentElement;
      var ans = item.querySelector(".ans");
      var isOpen = item.classList.contains("open");
      // close others
      document.querySelectorAll(".q.open").forEach(function (openItem) {
        openItem.classList.remove("open");
        openItem.querySelector(".ans").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  // ---- Reveal on scroll ---------------------------------------------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Live "viewers" counter (light social proof) ------------------
  var visitors = document.getElementById("visitors");
  if (visitors) {
    setInterval(function () {
      var base = 2300;
      var n = base + Math.floor(Math.random() * 90);
      visitors.textContent = n.toLocaleString("en-IN");
    }, 3000);
  }
})();
