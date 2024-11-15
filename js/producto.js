document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalProducto");
  const params = new URLSearchParams(window.location.search);
  const productIdFromURL = params.get("producto");

  if (productIdFromURL) {
    // Página de detalles
    cargarDatosProducto(productIdFromURL);
  }

  if (modal) {
    // Modal
    modal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const productId = button.getAttribute("data-product-id");
      if (productId) {
        cargarDatosProducto(productId);
      }
    });
  }
});

function cargarDatosProducto(productId) {
  fetch("../productos.json")
    .then((response) => response.json())
    .then((productos) => {
      const producto = productos.find((item) => item.id === productId);

      if (producto) {
        // Rellenar datos comunes
        const elementos = [
          { id: "producto-titulo", valor: producto.titulo },
          { id: "producto-marca", valor: producto.marca },
          { id: "producto-descripcion", valor: producto.descripcion },
          { id: "producto-imagenPrincipal", valor: producto.imagenPrincipal, esImagen: true },
          { id: "producto-precioReal", valor: producto.precioReal },
          { id: "producto-precio", valor: producto.precio },
          { id: "producto-descuento", valor: producto.descuento },
          { id: "producto-descuento", valor: producto.descuento },
          { id: "producto-cuotas", valor: producto.cuotas },      


        ];
        
        const descripcionCompleta = document.getElementById("producto-descripcion-completa");
        if (descripcionCompleta) {
          descripcionCompleta.innerHTML = producto.descripcionCompleta || "No disponible";
        }
        
        elementos.forEach(({ id, valor, esImagen }) => {
          const elemento = document.getElementById(id);
          if (elemento) {
            if (esImagen) {
              elemento.src = valor;
            } else {
              elemento.innerText = valor || "No disponible";
            }
          }
        });

        // Crear listas de características dinámicamente
        const caracteristicasList1 = document.getElementById("producto-caracteristicas");
        const caracteristicasList2 = document.getElementById("producto-caracteristicas-2");

        if (caracteristicasList1) {
          caracteristicasList1.innerHTML = ""; // Limpiar la lista anterior
          producto.caracteristicas.forEach((caracteristica) => {
            const li = document.createElement("li");
            const [campo, valor] = caracteristica.split(":");
            li.innerHTML = `<strong>${campo}:</strong> ${valor}`;
            caracteristicasList1.appendChild(li);
          });
        }

        if (caracteristicasList2) {
          caracteristicasList2.innerHTML = ""; // Limpiar la lista anterior
          producto["caracteristicas-2"].forEach((caracteristica) => {
            const li = document.createElement("li");
            const [campo, valor] = caracteristica.split(":");
            li.innerHTML = `<strong>${campo}:</strong> ${valor}`;
            caracteristicasList2.appendChild(li);
          });
        }

        // Crear miniaturas
        const miniaturasContainer = document.getElementById("producto-miniaturas");
        if (miniaturasContainer) {
          miniaturasContainer.innerHTML = "";
          const miniaturas = [producto.miniatura1, producto.miniatura2, producto.miniatura3, producto.miniatura4].filter(src => src);
          miniaturas.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "img-miniatura border rounded-2";
            img.onclick = () => changeMainImage(src);
            miniaturasContainer.appendChild(img);
          });
        }
        // Actualizar el enlace dinámicamente
        const comprarButton = document.getElementById("producto-comprar");
        if (comprarButton) {
          comprarButton.href = `producto.html?producto=${producto.id}`;
        }
      } else {
        alert("El producto no se encuentra disponible.");
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos del producto:", error);
      alert("Hubo un problema al cargar los datos. Por favor, intenta nuevamente más tarde.");
    });
}

function changeMainImage(newSrc) {
  const mainImage = document.getElementById("producto-imagenPrincipal");
  if (mainImage) {
    mainImage.src = newSrc;
  }
}
