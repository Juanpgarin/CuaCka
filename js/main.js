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

// ====== VISOR DE LIBROS ======
const modal = document.getElementById("visorLibro");
const imgPagina = document.getElementById("paginaLibro");
const btnCerrar = document.querySelector(".cerrar");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let paginas = ["./img/Cuentos/toto-aprendiendo-a-abrazar"];   // acá cargamos las páginas del libro clickeado
let indice = 0;     // página actual

// Abrir libro al clickear portada
document.querySelectorAll(".libro-card").forEach((card, i) => {
  card.addEventListener("click", () => {
    // 👇 ejemplo de páginas, podés personalizar por libro
    if (i === 0) {
      paginas = [
        "../img\Cuentos\toto-aprendiendo-a-abrazar/portada",
        "../../img/Cuentos/libro1-pag2.png",
        "../../img/Cuentos/libro1-pag3.png"
      ];
    } else if (i === 1) {
      paginas = [
        "../../img/Cuentos/libro2-pag1.png",
        "../../img/Cuentos/libro2-pag2.png"
      ];
    } else {
      paginas = [
        "../../img/Cuentos/libro3-pag1.png"
      ];
    }

    indice = 0;
    mostrarPagina();
    modal.style.display = "flex";
  });
});

// Función para mostrar la página actual
function mostrarPagina() {
  imgPagina.src = paginas[indice];
}

// Botones de navegación
btnPrev.addEventListener("click", () => {
  indice = (indice - 1 + paginas.length) % paginas.length;
  mostrarPagina();
});

btnNext.addEventListener("click", () => {
  indice = (indice + 1) % paginas.length;
  mostrarPagina();
});

// Cerrar visor
btnCerrar.addEventListener("click", () => {
  modal.style.display = "none";
});