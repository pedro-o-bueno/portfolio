// Aprimoramento progressivo: a trilha do percurso acompanha a leitura.
// Sem JavaScript, ou com movimento reduzido, a trilha fica completa e estática.
(function () {
  const list = document.querySelector(".route-list");
  if (!list || !window.matchMedia) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const steps = Array.from(list.querySelectorAll(".route-step"));
  const root = document.documentElement;
  let queued = false;

  const update = () => {
    queued = false;
    const rect = list.getBoundingClientRect();
    const mid = window.innerHeight * 0.55;
    const progress = Math.min(Math.max((mid - rect.top) / rect.height, 0), 1);
    list.style.setProperty("--progress", (progress * 100).toFixed(1) + "%");

    steps.forEach((step) => {
      const marker = step.querySelector(".step-index").getBoundingClientRect();
      step.classList.toggle("is-reached", marker.top + marker.height / 2 <= mid);
    });
  };

  const queue = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };

  root.classList.add("trail-live");
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();
})();
