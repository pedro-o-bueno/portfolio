// Iron House Academia — script.js
(function () {
  "use strict";

  // ---------- Mobile menu toggle ----------
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Close the menu when a nav link is tapped
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
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = anchor.getAttribute("href");
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      var headerOffset = 68;
      var targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    });
  });

  // ---------- Header shadow on scroll ----------
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Plan selection ----------
  var planCards = document.querySelectorAll(".plan-card");
  var planSelect = document.getElementById("plano");

  function selectPlan(planName, scrollToForm) {
    planCards.forEach(function (card) {
      card.classList.toggle("selected", card.dataset.plan === planName);
    });
    if (planSelect) {
      planSelect.value = planName;
      planSelect.classList.remove("invalid");
    }
    if (scrollToForm) {
      document.getElementById("matricula").scrollIntoView({ behavior: "smooth" });
    }
  }

  planCards.forEach(function (card) {
    card.addEventListener("click", function () {
      selectPlan(card.dataset.plan, false);
    });
    card.querySelectorAll(".plan-select").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        selectPlan(card.dataset.plan, true);
      });
    });
  });

  // ---------- Signup form (fake submit) ----------
  var form = document.getElementById("signupForm");
  var successBox = document.getElementById("formSuccess");
  var successText = document.getElementById("successText");
  var errorBox = document.getElementById("formError");
  var resetBtn = document.getElementById("resetForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nome = document.getElementById("nome");
      var telefone = document.getElementById("telefone");
      var objetivo = document.getElementById("objetivo");
      var fields = [nome, telefone, planSelect, objetivo];
      var valid = true;

      fields.forEach(function (field) {
        if (!field) return;
        var empty = !field.value || !field.value.trim();
        field.classList.toggle("invalid", empty);
        if (empty) valid = false;
      });

      if (!valid) {
        errorBox.hidden = false;
        return;
      }
      errorBox.hidden = true;

      var planLabel = planSelect.options[planSelect.selectedIndex].text;
      successText.textContent =
        "Plano selecionado para esta simulação: " + planLabel +
        ". Nenhuma matrícula foi feita, ninguém será contatado e nenhum dado foi enviado.";

      form.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Clear the invalid state as the user fixes a field
    form.querySelectorAll("input, select").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("invalid");
      });
      field.addEventListener("change", function () {
        field.classList.remove("invalid");
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.hidden = false;
      successBox.hidden = true;
      planCards.forEach(function (card) {
        card.classList.remove("selected");
      });
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      form.querySelector("input").focus();
    });
  }
})();
