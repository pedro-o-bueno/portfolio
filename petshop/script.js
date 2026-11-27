// Pata Amiga — Pet Shop & Clínica Veterinária

document.addEventListener("DOMContentLoaded", function () {
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

    // Fecha o menu ao clicar em um link (mobile)
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
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector(".site-header");
  function updateHeaderShadow() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  // ---------- Booking form (fake submit) ----------
  var form = document.getElementById("bookingForm");
  var successBox = document.getElementById("formSuccess");

  if (form && successBox) {
    // Data mínima: hoje
    var dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validação simples: marca campos vazios
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });
      if (!valid) {
        successBox.hidden = true;
        return;
      }

      successBox.textContent =
        "Simulação concluída: nenhum horário foi reservado e ninguém será contatado.";
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      form.reset();
    });

    // Remove o destaque de erro ao digitar
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("error");
      });
    });
  }
});
