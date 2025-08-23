function actualizarHome(){
  const root = getComputedStyle(document.documentElement);
  const sep   = parseFloat(root.getPropertyValue("--navbar-separacion")) || 0;
  const base  = parseFloat(root.getPropertyValue("--home-base")) || -42;
  const factor= parseFloat(root.getPropertyValue("--home-factor")) || 0.45;

  const home = document.querySelector(".home-button");
  if(!home) return;

  // baja el HOME proporcional a la separación, con límite de seguridad
  const drop = Math.min(sep * factor, 36);   // no lo dejes caer demasiado
  home.style.top = `${base + drop}px`;

  // pequeño rebote al actualizar
  home.classList.remove("wobble");
  void home.offsetWidth; // reflow para reiniciar animación
  home.classList.add("wobble");
}

document.addEventListener("DOMContentLoaded", actualizarHome);
window.addEventListener("resize", actualizarHome);


document.querySelectorAll('.reseña-card').forEach(card => {
  const btn = card.querySelector('.toggle-btn');
  const detalle = card.querySelector('.detalle');

  btn.addEventListener('click', () => {
    if (detalle.style.display === 'block') {
      detalle.style.display = 'none';
      btn.textContent = 'Ver más';
    } else {
      detalle.style.display = 'block';
      btn.textContent = 'Ver menos';
    }
  });
});