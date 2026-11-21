// AgendaPro: Kanban de leads (dados fictícios, demonstração de portfólio)
(function () {
  'use strict';

  var COLUMNS = ['novo', 'atendimento', 'concluido'];
  var COLUMN_LABELS = { novo: 'Novo', atendimento: 'Em atendimento', concluido: 'Concluído' };

  var leads = [
    { id: 1, name: 'Beatriz Lima',    service: 'Progressiva + corte',        value: 320, source: 'WhatsApp',  column: 'novo' },
    { id: 2, name: 'Aline Santos',    service: 'Pacote noiva, maquiagem',  value: 850, source: 'Instagram', column: 'novo' },
    { id: 3, name: 'Sofia Ribeiro',   service: 'Micropigmentação',          value: 600, source: 'Indicação', column: 'novo' },
    { id: 4, name: 'Gabriela Nunes',  service: 'Coloração + hidratação',    value: 280, source: 'WhatsApp',  column: 'atendimento' },
    { id: 5, name: 'Helena Duarte',   service: 'Limpeza de pele mensal',    value: 180, source: 'Instagram', column: 'atendimento' },
    { id: 6, name: 'Camila Torres',   service: 'Depilação a laser, pacote', value: 1200, source: 'Google',   column: 'atendimento' },
    { id: 7, name: 'Isabela Prado',   service: 'Escova + penteado festa',   value: 240, source: 'Indicação', column: 'concluido' },
    { id: 8, name: 'Luana Vieira',    service: 'Manicure e pedicure',       value: 90,  source: 'WhatsApp',  column: 'concluido' }
  ];
  var nextId = 9;
  var draggedId = null;

  var board = document.getElementById('kanbanBoard');
  var form = document.getElementById('addLeadForm');
  var formMsg = document.getElementById('formMsg');

  function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function moveLead(id, targetColumn) {
    var lead = leads.find(function (l) { return l.id === id; });
    if (!lead || COLUMNS.indexOf(targetColumn) === -1 || lead.column === targetColumn) return false;
    lead.column = targetColumn;
    render();
    return true;
  }

  function createCard(lead) {
    var colIndex = COLUMNS.indexOf(lead.column);
    var card = document.createElement('article');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.id = lead.id;

    var title = document.createElement('strong');
    title.textContent = lead.name;
    var service = document.createElement('span');
    service.className = 'card-service';
    service.textContent = lead.service;

    var metaRow = document.createElement('div');
    metaRow.className = 'card-meta-row';
    var value = document.createElement('span');
    value.className = 'card-value';
    value.textContent = formatBRL(lead.value);
    var source = document.createElement('span');
    source.className = 'card-source';
    source.textContent = lead.source;
    metaRow.appendChild(value);
    metaRow.appendChild(source);

    var actions = document.createElement('div');
    actions.className = 'card-actions';
    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'move-btn';
    prevBtn.textContent = 'Voltar';
    prevBtn.disabled = colIndex === 0;
    prevBtn.setAttribute('aria-label', 'Mover ' + lead.name + ' para ' + (COLUMN_LABELS[COLUMNS[colIndex - 1]] || ''));
    prevBtn.addEventListener('click', function () { moveLead(lead.id, COLUMNS[colIndex - 1]); });
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'move-btn';
    nextBtn.textContent = 'Avançar';
    nextBtn.disabled = colIndex === COLUMNS.length - 1;
    nextBtn.setAttribute('aria-label', 'Mover ' + lead.name + ' para ' + (COLUMN_LABELS[COLUMNS[colIndex + 1]] || ''));
    nextBtn.addEventListener('click', function () { moveLead(lead.id, COLUMNS[colIndex + 1]); });
    actions.appendChild(prevBtn);
    actions.appendChild(nextBtn);

    card.appendChild(title);
    card.appendChild(service);
    card.appendChild(metaRow);
    card.appendChild(actions);

    // Drag-and-drop (HTML5)
    card.addEventListener('dragstart', function (e) {
      draggedId = lead.id;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(lead.id));
    });
    card.addEventListener('dragend', function () {
      draggedId = null;
      card.classList.remove('dragging');
    });

    return card;
  }

  function updateCounts() {
    COLUMNS.forEach(function (col) {
      var count = leads.filter(function (l) { return l.column === col; }).length;
      var el = board.querySelector('[data-count="' + col + '"]');
      if (el) el.textContent = count;
    });
  }

  function render() {
    COLUMNS.forEach(function (col) {
      var list = board.querySelector('[data-list="' + col + '"]');
      list.innerHTML = '';
      var items = leads.filter(function (l) { return l.column === col; });
      if (items.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-note';
        empty.textContent = 'Nenhum lead nesta etapa.';
        list.appendChild(empty);
      }
      items.forEach(function (lead) { list.appendChild(createCard(lead)); });
    });
    updateCounts();
  }

  // Drop targets: each column list
  board.querySelectorAll('.kanban-list').forEach(function (list) {
    list.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      list.classList.add('drag-over');
    });
    list.addEventListener('dragleave', function () { list.classList.remove('drag-over'); });
    list.addEventListener('drop', function (e) {
      e.preventDefault();
      list.classList.remove('drag-over');
      var id = parseInt(e.dataTransfer.getData('text/plain'), 10) || draggedId;
      if (id) moveLead(id, list.dataset.list);
    });
  });

  // Add a new lead
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('leadName').value.trim();
    var service = document.getElementById('leadService').value.trim();
    var value = parseFloat(document.getElementById('leadValue').value);
    var source = document.getElementById('leadSource').value;
    if (!name || !service || isNaN(value) || value < 0) {
      formMsg.textContent = 'Preencha nome, serviço e um valor válido.';
      return;
    }
    leads.push({ id: nextId++, name: name, service: service, value: value, source: source, column: 'novo' });
    render();
    form.reset();
    formMsg.textContent = 'Lead "' + name + '" adicionado na coluna Novo.';
  });

  // Mobile sidebar toggle
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  menuBtn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('a') && window.innerWidth <= 860) sidebar.classList.remove('open');
  });

  render();
})();
