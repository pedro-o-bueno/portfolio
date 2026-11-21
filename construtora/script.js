// Vetor Construtora — script.js
// Menu mobile, rolagem suave e envio simulado do formulário de contato.

(function () {
  "use strict";

  // ----- Menu mobile -----
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu ao clicar em um link (navegação por âncora)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // ----- Rolagem suave (fallback para navegadores sem scroll-behavior) -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", anchor.getAttribute("href"));
    });
  });

  // ----- Formulário de contato (envio simulado) -----
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  var error = document.getElementById("form-error");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nome = document.getElementById("nome").value.trim();
      var email = document.getElementById("email").value.trim();
      var mensagem = document.getElementById("mensagem").value.trim();
      var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !emailValido || !mensagem) {
        error.hidden = false;
        success.hidden = true;
        return;
      }

      error.hidden = true;
      form.querySelectorAll("input, textarea, button").forEach(function (el) {
        el.disabled = true;
      });
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
