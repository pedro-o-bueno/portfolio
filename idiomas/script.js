// Falaí — interações da landing page
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

      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* 4. Barra fixa inferior — aparece só depois de rolar (escondida sem JS) */
  var stickyBar = document.getElementById('stickyBar');
  if (stickyBar) {
    stickyBar.hidden = false;
    var toggleStickyBar = function () {
      stickyBar.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', toggleStickyBar, { passive: true });
    toggleStickyBar();
  }

  /* 5. Captura de e-mail — envio simulado com mensagem de sucesso */
  var form = document.getElementById('emailForm');
  if (form) {
    var input = document.getElementById('emailInput');
    var msg = document.getElementById('formMsg');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = input.value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Informe um e-mail válido para continuar.';
        msg.classList.add('error');
        input.focus();
        return;
      }

      msg.classList.remove('error');
      msg.textContent = 'Inscrição registrada! Enviamos o link de acesso para ' + email + '.';
      form.reset();
    });

    input.addEventListener('input', function () {
      msg.textContent = '';
      msg.classList.remove('error');
    });
  }

  /* 6. Quiz de nível — 7 perguntas, resultado CEFR */
  var QUESTIONS = [
    {
      q: 'How do you say “bom dia” in English?',
      options: ['Good morning', 'Good night', 'Good bye', 'Good luck'],
      correct: 0,
      explain: '“Good morning” é “bom dia”. “Good night” é “boa noite”.'
    },
    {
      q: 'Choose the correct sentence.',
      options: ['She go to work every day.', 'She goes to work every day.', 'She going to work every day.', 'She gone to work every day.'],
      correct: 1,
      explain: 'Com “she”, o verbo ganha -s: “she goes”.'
    },
    {
      q: 'What does “I’m starving” mean?',
      options: ['Estou com muito sono.', 'Estou com muita fome.', 'Estou com muita sede.', 'Estou com muito frio.'],
      correct: 1,
      explain: '“Starving” é uma forma exagerada de dizer que está com muita fome.'
    },
    {
      q: 'Complete: “If I ___ more time, I would travel more.”',
      options: ['have', 'had', 'has', 'having'],
      correct: 1,
      explain: 'É o segundo condicional: “if + passado simples, would + verbo”.'
    },
    {
      q: 'What does “embarrassed” mean?',
      options: ['envergonhado', 'animado', 'entediado', 'orgulhoso'],
      correct: 0,
      explain: '“Embarrassed” é envergonhado. Não é “embaraçado” no sentido de confuso.'
    },
    {
      q: 'Choose the correct sentence.',
      options: ['I wish I can speak French.', 'I wish I could speak French.', 'I wish I will speak French.', 'I wish I speaking French.'],
      correct: 1,
      explain: '“I wish + could” fala de um desejo no presente: “eu queria saber falar francês”.'
    },
    {
      q: 'What does “to hit the nail on the head” mean?',
      options: ['Acertar em cheio.', 'Bater na cabeça de alguém.', 'Ficar com dor de cabeça.', 'Pregar um prego na parede.'],
      correct: 0,
      explain: 'É uma expressão idiomática: acertar exatamente no ponto.'
    }
  ];

  var LEVELS = [
    { min: 0, max: 1, code: 'A1', name: 'Iniciante', text: 'Você está começando. A primeira lição é “Hi, I’m Ana.” Em duas semanas, você pede um café sem ensaiar.' },
    { min: 2, max: 3, code: 'A2', name: 'Básico', text: 'Você já se vira no básico. Vamos destravar as frases do dia a dia: pedir informações, marcar uma consulta.' },
    { min: 4, max: 5, code: 'B1', name: 'Intermediário', text: 'Você já conversa. Agora é ganhar fluência: contar histórias, dar opinião, entender série sem legenda.' },
    { min: 6, max: 6, code: 'B2', name: 'Intermediário avançado', text: 'Você já usa o inglês. Vamos afiar: reunião, apresentação, argumento.' },
    { min: 7, max: 7, code: 'C1', name: 'Avançado', text: 'Você já é avançado. O C1 é nuance: ironia, negociação, piada.' }
  ];

  var quizIntro = document.getElementById('quizIntro');
  var quizStage = document.getElementById('quizStage');
  var quizResult = document.getElementById('quizResult');
  var quizStart = document.getElementById('quizStart');
  var quizNext = document.getElementById('quizNext');
  var quizRetry = document.getElementById('quizRetry');
  var quizProgress = document.getElementById('quizProgress');
  var quizBarFill = document.getElementById('quizBarFill');
  var quizQuestion = document.getElementById('quizQuestion');
  var quizOptions = document.getElementById('quizOptions');
  var quizFeedback = document.getElementById('quizFeedback');

  if (quizStart && quizStage) {
    var current = 0;
    var score = 0;
    var answered = false;

    var showQuestion = function (index) {
      var item = QUESTIONS[index];
      answered = false;
      quizProgress.textContent = 'Pergunta ' + (index + 1) + ' de ' + QUESTIONS.length;
      quizBarFill.style.transform = 'scaleX(' + (index / QUESTIONS.length) + ')';
      quizQuestion.textContent = item.q;
      quizFeedback.textContent = '';
      quizFeedback.classList.remove('good', 'bad');
      quizNext.hidden = true;
      quizNext.textContent = index === QUESTIONS.length - 1 ? 'Ver meu nível' : 'Próxima';
      quizOptions.innerHTML = '';
      item.options.forEach(function (text, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = text;
        btn.addEventListener('click', function () {
          if (answered) { return; }
          answered = true;
          var isRight = i === item.correct;
          if (isRight) { score += 1; }
          quizOptions.querySelectorAll('.quiz-option').forEach(function (opt, j) {
            opt.disabled = true;
            if (j === item.correct) { opt.classList.add('correct'); }
            if (j === i && !isRight) { opt.classList.add('wrong'); }
          });
          quizFeedback.textContent = (isRight ? 'Certo. ' : 'Não é essa. ') + item.explain;
          quizFeedback.classList.add(isRight ? 'good' : 'bad');
          quizBarFill.style.transform = 'scaleX(' + ((index + 1) / QUESTIONS.length) + ')';
          quizNext.hidden = false;
          quizNext.focus();
        });
        quizOptions.appendChild(btn);
      });
    };

    var showResult = function () {
      var level = LEVELS[LEVELS.length - 1];
      LEVELS.forEach(function (candidate) {
        if (score >= candidate.min && score <= candidate.max) { level = candidate; }
      });
      quizStage.hidden = true;
      quizResult.hidden = false;
      document.getElementById('quizResultLevel').textContent = level.code;
      document.getElementById('quizResultTitle').textContent = 'Seu nível é ' + level.code + ', ' + level.name + '.';
      document.getElementById('quizResultText').textContent = level.text;
      document.getElementById('quizResultScore').textContent = 'Você acertou ' + score + ' de ' + QUESTIONS.length + '.';
      document.getElementById('quizResultCta').textContent = 'Começar grátis no nível ' + level.code;
    };

    quizStart.addEventListener('click', function () {
      current = 0;
      score = 0;
      quizIntro.hidden = true;
      quizResult.hidden = true;
      quizStage.hidden = false;
      showQuestion(0);
    });

    quizNext.addEventListener('click', function () {
      if (current < QUESTIONS.length - 1) {
        current += 1;
        showQuestion(current);
      } else {
        showResult();
      }
    });

    quizRetry.addEventListener('click', function () {
      current = 0;
      score = 0;
      quizResult.hidden = true;
      quizStage.hidden = true;
      quizIntro.hidden = false;
    });
  }
});
