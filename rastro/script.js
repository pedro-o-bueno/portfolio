const menuButton = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  document.documentElement.classList.add("menu-ready");

  const closeMenu = (returnFocus = false) => {
    mainNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    mainNav.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Fechar menu");
  });

  mainNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    closeMenu();

    const target = link.hash ? document.querySelector(link.hash) : null;
    if (!target) return;

    const focusTarget = target.matches("h1, h2, h3, figure")
      ? target
      : target.querySelector("h1, h2, h3");
    if (!focusTarget) return;

    event.preventDefault();
    window.history.pushState(null, "", link.hash);
    target.scrollIntoView({ block: "start", behavior: "auto" });
    focusTarget.tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });
}
