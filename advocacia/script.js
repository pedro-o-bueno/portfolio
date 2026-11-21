// Ferreira & Almeida Advocacia — script.js
// Mobile menu, smooth scroll, header shadow, fake form submit.

(function () {
  "use strict";

  // ---------- Mobile menu toggle ----------
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Close the menu when a nav link is tapped (mobile).
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  // CSS scroll-behavior handles most cases; this keeps the fixed
  // header from covering the target section and works in older browsers.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      var headerHeight = document.querySelector(".site-header")
        ? document.querySelector(".site-header").offsetHeight
        : 76;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.pageYOffset > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Contact form: fake submit with success message ----------
  var form = document.getElementById("contactForm");
  var successMsg = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Simple validation: highlight empty/invalid required fields.
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var fieldValid = field.value.trim() !== "";
        if (field.tagName === "INPUT" && field.type === "email") {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        field.classList.toggle("form-error", !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (!valid) {
        var firstError = form.querySelector(".form-error");
        if (firstError) firstError.focus();
        return;
      }

      // Fake submit: no backend. Show success, clear the form.
      if (successMsg) successMsg.hidden = false;
      form.reset();
      form.querySelectorAll(".form-error").forEach(function (field) {
        field.classList.remove("form-error");
      });
      if (successMsg) successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Clear the error highlight as the user types.
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("form-error");
      });
    });
  }
})();
