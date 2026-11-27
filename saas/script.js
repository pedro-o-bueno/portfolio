// Fluxo — interações da landing page
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* 1. Menu mobile */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao tocar em um link (navegação mobile)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menu');
    });
  });

  /* 2. Rolagem suave (fallback para navegadores sem scroll-behavior: smooth) */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* 3. FAQ — acordeão (um item aberto por vez) */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Fecha todos os outros
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre (ou fecha) o item clicado
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* 4. Toggle mensal / anual — anual = 20% de desconto */
  var toggle = document.getElementById('billingToggle');
  var labelMensal = document.getElementById('labelMensal');
  var labelAnual = document.getElementById('labelAnual');
  var priceValues = document.querySelectorAll('.price-value');
  var annualNotes = document.querySelectorAll('.annual-note');

  toggle.addEventListener('click', function () {
    var annual = toggle.getAttribute('aria-checked') !== 'true';
    toggle.setAttribute('aria-checked', String(annual));

    labelMensal.classList.toggle('active', !annual);
    labelAnual.classList.toggle('active', annual);

    priceValues.forEach(function (el) {
      el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
    });

    annualNotes.forEach(function (el) {
      el.hidden = !annual;
    });
  });

  /* 5. Captura de e-mail — envio simulado com mensagem de sucesso */
  function setupEmailForm(formId, inputId, msgId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var input = document.getElementById(inputId);
    var msg = document.getElementById(msgId);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = input.value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Informe um e-mail fictício válido para concluir a simulação.';
        msg.classList.add('error');
        input.focus();
        return;
      }

      msg.classList.remove('error');
      msg.textContent = 'Simulação concluída: nenhuma conta foi criada e nenhum e-mail foi enviado.';
      form.reset();
    });

    input.addEventListener('input', function () {
      msg.textContent = '';
      msg.classList.remove('error');
    });
  }

  setupEmailForm('emailForm', 'emailInput', 'formMsg');
  setupEmailForm('emailFormCta', 'emailInputCta', 'formMsgCta');
});
