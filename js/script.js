
function changeMainImageModal(newSrc) {
  document.getElementById('mainImageModal').src = newSrc;
  document.getElementById('zoomedImage').src = newSrc;

}

const zoomImage = document.getElementById("mainImageModal");
  const zoomResult = document.getElementById("zoomResult");
  const zoomedImage = document.getElementById("zoomedImage");

  zoomImage.addEventListener("mousemove", (e) => {
    const rect = zoomImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Mostrar el zoom
    zoomResult.style.display = "block";

    // Calcular la posición del zoom
    const zoomWidth = zoomedImage.offsetWidth / 2;
    const zoomHeight = zoomedImage.offsetHeight / 2;

    zoomedImage.style.transform = `translate(-${(x / rect.width) * zoomWidth}px, -${(y / rect.height) * zoomHeight}px)`;
  });

  zoomImage.addEventListener("mouseleave", () => {
    zoomResult.style.display = "none"; // Ocultar el zoom
  });