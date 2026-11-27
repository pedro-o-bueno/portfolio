(function () {
  'use strict';

  var FREE_SHIPPING_THRESHOLD = 199;
  var FLAT_SHIPPING = 19.9;

  var cart = {}; // id -> { id, name, detail, price, qty }

  var cartBtn = document.getElementById('cartBtn');
  var cartDrawer = document.getElementById('cartDrawer');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartClose = document.getElementById('cartClose');
  var cartCount = document.getElementById('cartCount');
  var cartHeadCount = document.getElementById('cartHeadCount');
  var cartItemsEl = document.getElementById('cartItems');
  var cartFooter = document.getElementById('cartFooter');
  var cartSubtotal = document.getElementById('cartSubtotal');
  var cartShipping = document.getElementById('cartShipping');
  var cartTotal = document.getElementById('cartTotal');
  var shippingText = document.getElementById('shippingText');
  var shippingFill = document.getElementById('shippingFill');
  var checkoutBtn = document.getElementById('checkoutBtn');
  var clearCartBtn = document.getElementById('clearCartBtn');
  var cartSuccess = document.getElementById('cartSuccess');
  var successText = document.getElementById('successText');
  var successCloseBtn = document.getElementById('successCloseBtn');
  var toast = document.getElementById('toast');
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var previousFocus = null;
  var previousBodyOverflow = '';
  var backgroundInertState = [];

  function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function cartQtyTotal() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id].qty; }, 0);
  }

  function cartSubtotalValue() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id].price * cart[id].qty; }, 0);
  }

  function initialOf(name) {
    return name.trim().charAt(0).toUpperCase();
  }

  var toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  function renderCart() {
    var ids = Object.keys(cart);
    var qty = cartQtyTotal();
    var subtotal = cartSubtotalValue();

    cartCount.textContent = qty;
    cartHeadCount.textContent = '(' + qty + (qty === 1 ? ' item)' : ' itens)');

    // Free shipping progress
    var remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    var pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    shippingFill.style.width = pct + '%';
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingText.innerHTML = 'Simulação: <strong>frete grátis demonstrativo</strong>';
      shippingText.classList.add('free');
      shippingFill.classList.add('free');
    } else {
      shippingText.innerHTML = 'Na simulação, faltam <strong>' + formatBRL(remaining) + '</strong> para o frete grátis';
      shippingText.classList.remove('free');
      shippingFill.classList.remove('free');
    }

    // Items
    if (ids.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.<br>Adicione um produto para começar.</p>';
      cartFooter.hidden = true;
    } else {
      cartItemsEl.innerHTML = '';
      ids.forEach(function (id) {
        var item = cart[id];
        var row = document.createElement('div');
        row.className = 'cart-item';

        var thumb = document.createElement('div');
        thumb.className = 'cart-item-thumb';
        thumb.textContent = initialOf(item.name);
        thumb.setAttribute('aria-hidden', 'true');

        var middle = document.createElement('div');
        var nameEl = document.createElement('p');
        nameEl.className = 'cart-item-name';
        nameEl.textContent = item.name;
        var detailEl = document.createElement('p');
        detailEl.className = 'cart-item-detail';
        detailEl.textContent = item.detail;
        var priceEl = document.createElement('p');
        priceEl.className = 'cart-item-price';
        priceEl.textContent = formatBRL(item.price) + ' cada';
        var qtyWrap = document.createElement('div');
        qtyWrap.className = 'qty-controls';
        var minusBtn = document.createElement('button');
        minusBtn.type = 'button';
        minusBtn.textContent = '−';
        minusBtn.setAttribute('aria-label', 'Diminuir quantidade de ' + item.name);
        minusBtn.addEventListener('click', function () { changeQty(id, -1); });
        var qtyEl = document.createElement('span');
        qtyEl.textContent = item.qty;
        var plusBtn = document.createElement('button');
        plusBtn.type = 'button';
        plusBtn.textContent = '+';
        plusBtn.setAttribute('aria-label', 'Aumentar quantidade de ' + item.name);
        plusBtn.addEventListener('click', function () { changeQty(id, 1); });
        qtyWrap.appendChild(minusBtn);
        qtyWrap.appendChild(qtyEl);
        qtyWrap.appendChild(plusBtn);
        middle.appendChild(nameEl);
        middle.appendChild(detailEl);
        middle.appendChild(priceEl);
        middle.appendChild(qtyWrap);

        var right = document.createElement('div');
        var totalEl = document.createElement('p');
        totalEl.className = 'cart-item-total';
        totalEl.textContent = formatBRL(item.price * item.qty);
        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'cart-item-remove';
        removeBtn.textContent = 'Remover';
        removeBtn.setAttribute('aria-label', 'Remover ' + item.name + ' do carrinho');
        removeBtn.addEventListener('click', function () { removeItem(id); });
        right.appendChild(totalEl);
        right.appendChild(removeBtn);

        row.appendChild(thumb);
        row.appendChild(middle);
        row.appendChild(right);
        cartItemsEl.appendChild(row);
      });
      cartFooter.hidden = false;
    }

    // Totals
    var shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING);
    cartSubtotal.textContent = formatBRL(subtotal);
    cartShipping.textContent = subtotal === 0 ? 'Simulado' : (shipping === 0 ? 'Grátis (simulado)' : formatBRL(shipping) + ' (simulado)');
    cartTotal.textContent = formatBRL(subtotal + shipping);
  }

  function addToCart(card) {
    var id = card.getAttribute('data-id');
    var name = card.getAttribute('data-name');
    var detail = card.getAttribute('data-detail') || '';
    var price = parseFloat(card.getAttribute('data-price'));
    if (!id || !name || isNaN(price)) return;
    if (cart[id]) {
      cart[id].qty += 1;
    } else {
      cart[id] = { id: id, name: name, detail: detail, price: price, qty: 1 };
    }
    renderCart();
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth; // restart animation
    cartCount.classList.add('bump');
    showToast(name + ' adicionado ao carrinho demonstrativo');
  }

  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    renderCart();
  }

  function removeItem(id) {
    if (!cart[id]) return;
    var name = cart[id].name;
    delete cart[id];
    renderCart();
    showToast(name + ' removido do carrinho');
  }

  function openCart() {
    if (cartDrawer.classList.contains('open')) return;
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    backgroundInertState = [];
    Array.prototype.forEach.call(document.body.children, function (element) {
      if (element === cartDrawer || element === cartOverlay) return;
      backgroundInertState.push({ element: element, wasInert: element.hasAttribute('inert') });
      element.setAttribute('inert', '');
    });
    cartDrawer.removeAttribute('inert');
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    cartClose.focus();
  }

  function closeCart() {
    if (!cartDrawer.classList.contains('open')) return;
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawer.setAttribute('inert', '');
    cartOverlay.setAttribute('aria-hidden', 'true');
    cartBtn.setAttribute('aria-expanded', 'false');
    backgroundInertState.forEach(function (state) {
      if (!state.wasInert) state.element.removeAttribute('inert');
    });
    backgroundInertState = [];
    document.body.style.overflow = previousBodyOverflow;
    var focusTarget = previousFocus && document.contains(previousFocus) ? previousFocus : cartBtn;
    previousFocus = null;
    focusTarget.focus();
  }

  function getCartFocusableElements() {
    var elements = cartDrawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    return Array.prototype.filter.call(elements, function (element) {
      return element.getClientRects().length > 0;
    });
  }

  function checkout() {
    if (cartQtyTotal() === 0) return;
    successText.textContent = 'Nenhum pedido foi registrado, nenhum dado foi enviado e nenhuma cobrança foi realizada.';
    cart = {};
    renderCart();
    cartItemsEl.style.display = 'none';
    cartFooter.hidden = true;
    document.getElementById('shippingProgress').style.display = 'none';
    cartSuccess.hidden = false;
    successCloseBtn.focus();
  }

  function resetCartView() {
    cartItemsEl.style.display = '';
    document.getElementById('shippingProgress').style.display = '';
    cartSuccess.hidden = true;
    renderCart();
  }

  // Add buttons
  document.querySelectorAll('.btn-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.product-card');
      addToCart(card);
      btn.textContent = 'Adicionado!';
      btn.classList.add('added');
      setTimeout(function () {
        btn.textContent = 'Adicionar ao carrinho';
        btn.classList.remove('added');
      }, 1200);
    });
  });

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (!cartDrawer.classList.contains('open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCart();
      return;
    }
    if (e.key !== 'Tab') return;
    var focusableElements = getCartFocusableElements();
    if (focusableElements.length === 0) {
      e.preventDefault();
      cartDrawer.focus();
      return;
    }
    var first = focusableElements[0];
    var last = focusableElements[focusableElements.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === cartDrawer)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === cartDrawer)) {
      e.preventDefault();
      first.focus();
    } else if (!cartDrawer.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  });

  checkoutBtn.addEventListener('click', checkout);
  clearCartBtn.addEventListener('click', function () {
    cart = {};
    renderCart();
    showToast('Carrinho demonstrativo limpo');
  });
  successCloseBtn.addEventListener('click', function () {
    resetCartView();
    closeCart();
  });

  // Mobile menu
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  renderCart();
})();
