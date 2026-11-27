/* Clínica Sorriso — simulated WhatsApp chatbot demo (pure JS, no real messages sent) */
(function () {
  "use strict";

  var chatBody = document.getElementById("chatBody");
  var quickReplies = document.getElementById("quickReplies");
  var nameInput = document.getElementById("nameInput");
  var sendNameBtn = document.getElementById("sendNameBtn");
  var inputHint = document.getElementById("inputHint");
  var restartBtn = document.getElementById("restartBtn");
  var chatStatus = document.getElementById("chatStatus");

  var CLINIC_ADDRESS = "Av. Ipiranga, 1234 — Partenon, Porto Alegre / RS";

  var SERVICES = ["Limpeza", "Clareamento", "Aparelho", "Avaliação"];
  var DAYS = ["Hoje", "Amanhã", "Sexta-feira", "Sábado"];
  var TIMES = ["9h", "11h", "14h", "16h30"];

  var state = { service: null, day: null, time: null, name: null };
  var busy = false; // true while the bot is "typing"

  function scrollDown() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addMessage(text, who) {
    var div = document.createElement("div");
    div.className = "msg " + who;
    div.textContent = text;
    chatBody.appendChild(div);
    scrollDown();
    return div;
  }

  function showTyping() {
    var div = document.createElement("div");
    div.className = "msg bot typing";
    div.id = "typingIndicator";
    for (var i = 0; i < 3; i += 1) {
      div.appendChild(document.createElement("span"));
    }
    chatBody.appendChild(div);
    scrollDown();
    if (chatStatus) chatStatus.textContent = "Simulação em andamento";
  }

  function hideTyping() {
    var t = document.getElementById("typingIndicator");
    if (t) t.remove();
    if (chatStatus) chatStatus.textContent = "Demonstração interativa";
  }

  // Bot sends a message after a short "typing" delay, then runs next()
  function botSay(text, next, delay) {
    busy = true;
    setQuickReplies([]);
    showTyping();
    setTimeout(function () {
      hideTyping();
      addMessage(text, "bot");
      busy = false;
      if (typeof next === "function") next();
    }, delay || 900);
  }

  function setQuickReplies(options) {
    quickReplies.replaceChildren();
    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "qr-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", function () {
        if (busy) return;
        opt.onPick();
      });
      quickReplies.appendChild(btn);
    });
  }

  function showNameField() {
    inputHint.hidden = true;
    nameInput.hidden = false;
    sendNameBtn.hidden = false;
    nameInput.value = "";
    nameInput.focus();
  }

  function hideNameField() {
    nameInput.hidden = true;
    sendNameBtn.hidden = true;
    inputHint.hidden = false;
  }

  /* ---------- Flow steps ---------- */

  function stepService() {
    botSay(
      "Olá! Esta é uma simulação da Clínica Sorriso. Qual serviço de exemplo você quer escolher?",
      function () {
        setQuickReplies(
          SERVICES.map(function (s) {
            return {
              label: s,
              onPick: function () {
                state.service = s;
                addMessage(s, "user");
                stepDay();
              },
            };
          })
        );
      }
    );
  }

  function stepDay() {
    botSay(
      "Ótima escolha! Para qual dia você prefere a simulação de " +
        state.service +
        "?",
      function () {
        setQuickReplies(
          DAYS.map(function (d) {
            return {
              label: d,
              onPick: function () {
                state.day = d;
                addMessage(d, "user");
                stepTime();
              },
            };
          })
        );
      }
    );
  }

  function stepTime() {
    botSay(
      "Escolha um horário de exemplo " +
        (state.day === "Hoje" ? "para hoje" : "para " + state.day.toLowerCase()) +
        ". Qual funciona melhor para você?",
      function () {
        setQuickReplies(
          TIMES.map(function (t) {
            return {
              label: t,
              onPick: function () {
                state.time = t;
                addMessage(t, "user");
                stepName();
              },
            };
          })
        );
      }
    );
  }

  function stepName() {
    botSay("Perfeito! Digite um nome fictício para concluir a simulação.", function () {
      showNameField();
    });
  }

  function stepConfirm() {
    var summary =
      "Resumo da simulação: serviço " + state.service +
      "; dia " + state.day +
      "; horário " + state.time +
      "; nome fictício " + state.name +
      "; local de exemplo " + CLINIC_ADDRESS + ".";

    botSay(summary, function () {
      botSay(
        "Simulação concluída: nenhum horário foi reservado, nenhuma mensagem ou lembrete será enviado.",
        function () {
          setQuickReplies([
            {
              label: "Agendar outra consulta",
              onPick: function () {
                startDemo();
              },
            },
          ]);
        },
        1200
      );
    });
  }

  function submitName() {
    var name = nameInput.value.trim();
    if (!name || busy) return;
    state.name = name;
    hideNameField();
    addMessage(name, "user");
    stepConfirm();
  }

  /* ---------- Start / restart ---------- */

  function startDemo() {
    state = { service: null, day: null, time: null, name: null };
    busy = false;
    chatBody.replaceChildren();
    hideNameField();
    setQuickReplies([]);
    stepService();
  }

  sendNameBtn.addEventListener("click", submitName);
  nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitName();
  });
  restartBtn.addEventListener("click", startDemo);

  // Boot the demo when the page loads
  startDemo();

  /* ---------- Contact form (simulated) ---------- */
  var contactForm = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      formSuccess.textContent =
        "Simulação concluída: nenhuma mensagem foi enviada e nenhum dado foi compartilhado.";
      formSuccess.hidden = false;
      contactForm.reset();
      formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
