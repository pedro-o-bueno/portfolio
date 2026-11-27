// Cantina do Zé — interações do site
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Mobile menu toggle ----------
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('main-nav');

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link (mobile)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // ---------- Smooth scroll (fallback para navegadores sem scroll-behavior) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetId);
    });
  });

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector('.site-header');
  function updateHeaderShadow() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  // ---------- Reservation form (fake submit) ----------
  var form = document.getElementById('reservation-form');
  var successBox = document.getElementById('form-success');
  var successText = document.getElementById('success-text');
  var errorBox = document.getElementById('form-error');
  var newReservationBtn = document.getElementById('new-reservation');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value.trim();
    var data = document.getElementById('data').value;
    var hora = document.getElementById('hora').value;
    var pessoas = document.getElementById('pessoas').value;

    if (!nome || !data || !hora || !pessoas) {
      errorBox.textContent = 'Por favor, preencha todos os campos para confirmar sua reserva.';
      errorBox.hidden = false;
      return;
    }

    errorBox.hidden = true;

    successText.textContent =
      'Simulação concluída: nenhuma mesa foi reservada e ninguém será contatado.';

    form.hidden = true;
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  newReservationBtn.addEventListener('click', function () {
    form.reset();
    successBox.hidden = true;
    form.hidden = false;
    form.querySelector('input').focus();
  });
});
