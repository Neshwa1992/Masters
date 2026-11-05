document.addEventListener("DOMContentLoaded", () => {
  // Navbar background on scroll
  const nav = document.getElementById("mainNav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Respect reduced-motion: do not auto-play carousels
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".carousel").forEach(c => {
      const inst = bootstrap.Carousel.getOrCreateInstance(c);
      inst.pause();
      c.setAttribute("data-bs-ride", "false");
    });
  }

  // Gallery tabs + lightbox
  const tabs = document.querySelectorAll("[data-tab]");
  const modalEl = document.getElementById("lightbox");
  if (!tabs.length || !modalEl) return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const img = document.getElementById("lightboxImg");
  let items = [], index = 0;

  const current = () => document.querySelector(".gal-panel:not([hidden])");
  const collect = () => { items = [...current().querySelectorAll(".g-item")]; };
  const show = n => {
    index = (n + items.length) % items.length;
    const src = items[index].querySelector("img");
    img.src = src.src;
    img.alt = src.alt;
  };

  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(b => { b.classList.toggle("btn-gold", b === t); b.classList.toggle("btn-outline-gold", b !== t); });
    document.querySelectorAll(".gal-panel").forEach(p => p.hidden = p.id !== "gal-" + t.dataset.tab);
    collect();
  }));

  document.querySelectorAll(".g-item").forEach(b => b.addEventListener("click", () => {
    collect();
    show(items.indexOf(b));
    modal.show();
  }));
  document.getElementById("lbPrev").addEventListener("click", () => show(index - 1));
  document.getElementById("lbNext").addEventListener("click", () => show(index + 1));
  document.addEventListener("keydown", e => {
    if (!modalEl.classList.contains("show")) return;
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
});
