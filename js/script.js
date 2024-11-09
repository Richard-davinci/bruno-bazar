function changeMainImageModal(newSrc) {
  const mainImage = document.getElementById("mainImageModal");
  const zoomedImage = document.getElementById("zoomedImage");

  // Actualiza la imagen principal y la del zoom
  mainImage.src = newSrc;
  zoomedImage.src = newSrc;
}
// Función para verificar si el dispositivo es móvil o tablet
function isMobile() {
  return window.innerWidth <= 768; // Define el límite para dispositivos móviles
}

// Obtén los elementos necesarios
const zoomImage = document.getElementById("mainImageModal");
const zoomResult = document.getElementById("zoomResult");
const zoomedImage = document.getElementById("zoomedImage");
const zoomLens = document.getElementById("zoomLens");

// Si no es un dispositivo móvil, activa el zoom
if (!isMobile()) {
  // Mostrar el visor y el área de zoom al entrar en la imagen
  zoomImage.addEventListener("mouseenter", () => {
    zoomLens.style.display = "block"; // Mostrar el visor
    zoomResult.style.display = "block"; // Mostrar el área de zoom
  });

  // Ocultar el visor y el área de zoom cuando el mouse salga de la imagen
  zoomImage.addEventListener("mouseleave", () => {
    zoomLens.style.display = "none"; // Ocultar el visor
    zoomResult.style.display = "none"; // Ocultar el área de zoom
  });

  // Mover el visor y actualizar el zoom al mover el mouse
  zoomImage.addEventListener("mousemove", (e) => {
    const rect = zoomImage.getBoundingClientRect(); // Coordenadas de la imagen visible
    const lensWidth = zoomLens.offsetWidth / 2;
    const lensHeight = zoomLens.offsetHeight / 2;

    // Calcular posición del visor
    let x = e.clientX - rect.left - lensWidth;
    let y = e.clientY - rect.top - lensHeight;

    // Limitar el movimiento del visor dentro de la imagen visible
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - zoomLens.offsetWidth) x = rect.width - zoomLens.offsetWidth;
    if (y > rect.height - zoomLens.offsetHeight) y = rect.height - zoomLens.offsetHeight;

    // Posicionar el visor
    zoomLens.style.left = `${x}px`;
    zoomLens.style.top = `${y}px`;

    // Ajustar el origen del zoom
    const zoomX = (x / rect.width) * zoomedImage.naturalWidth;
    const zoomY = (y / rect.height) * zoomedImage.naturalHeight;

    zoomedImage.style.transformOrigin = `${zoomX}px ${zoomY}px`;
    zoomedImage.style.transform = "scale(1.5)"; // Ajusta el nivel de zoom
  });
} else {
  // Si es un dispositivo móvil, desactiva el cursor de zoom
  zoomImage.style.cursor = "auto"; // Cambia el cursor a estándar
}


